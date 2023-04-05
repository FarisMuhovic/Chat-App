import React, {useState} from "react";
import axios from "axios";
import {Link, useNavigate} from "react-router-dom";
const Register = props => {
  const [formData, setformData] = useState({
    username: "",
    password: "",
    confirmPassword: "",
  });
  function setData(e) {
    setformData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  }
  const navigate = useNavigate();
  const [errors, setErrors] = useState({type: "", message: ""});

  function submitData(e) {
    e.preventDefault();
    if (formData.password !== formData.confirmPassword) {
      setErrors({type: "password", message: "passwords do not match"});
      return;
    }
    if (formData.username.length < 4) {
      setErrors({
        type: "username",
        message: "username must be at least 4 characters long",
      });
      return;
    }
    if (formData.password.length < 10) {
      setErrors({
        type: "password",
        message: "password must be at least 10 characters long",
      });
      return;
    }
    if (!/[A-Z]/.test(formData.password)) {
      setErrors({
        type: "password",
        message: "password must contain at least one uppercase letter",
      });
      return;
    }
    if (!/[0-9]/.test(formData.password)) {
      setErrors({
        type: "password",
        message: "password must contain at least one number",
      });
      return;
    }
    if (!/[!@#$%^&*]/.test(formData.password)) {
      setErrors({
        type: "password",
        message: "password must contain at least one symbol",
      });
      return;
    }
    setErrors({type: "", message: ""});
    axios
      .post("http://localhost:6001/auth/register", formData, {
        withCredentials: true,
      })
      .then(res => {
        console.log(res.data.message);
        if (res.data.message === "User created") {
          props.setsessionID(true);
          navigate("/");
          setformData({
            username: "",
            password: "",
            confirmPassword: "",
          });
        }
      })
      .catch(err => {
        console.log(err);
      });
  }
  return (
    <div className="register">
      <div className="left-side">
        <h1 className="auth-logo">
          <i className="fa-solid fa-ghost"></i>
          <span>Boo !</span>
        </h1>
        <p>
          <span>Welcome to our chat app!</span>
          <br />A place where you can chat freely and confidently,knowing that
          your conversations are completely private and secure.
        </p>
        <h4>Register your account below</h4>

        <form onSubmit={submitData}>
          <input
            type="text"
            placeholder="username"
            required
            onChange={setData}
            name="username"
            value={formData.username}
            className={errors.type === "username" ? "errorinput" : ""}
          />
          <input
            type="password"
            placeholder="password"
            required
            onChange={setData}
            name="password"
            value={formData.password}
            className={errors.type === "password" ? "errorinput" : ""}
          />
          <input
            type="password"
            placeholder="confirm password"
            required
            onChange={setData}
            name="confirmPassword"
            value={formData.confirmPassword}
            className={errors.type === "password" ? "errorinput" : ""}
          />
          <p className="error">{errors.message}</p>
          <button>Register</button>
        </form>
      </div>
      <ul className="info-account">
        <h3>Requirements</h3>
        <li>Make sure you have a strong password.</li>
        <li>Your password should be at least 10 characters long.</li>
        <li>
          Your password should contain at least one
          <br />
          uppercase letter,symbol and a number.
        </li>
        <li>Dont use your personal name as a username.</li>
        <div className="to-login">
          <span>Already have an account?</span>
          <Link to="/login">Login</Link>
        </div>
      </ul>
    </div>
  );
};

export default Register;
