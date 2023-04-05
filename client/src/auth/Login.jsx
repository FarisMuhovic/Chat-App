import React, {useState} from "react";
import axios from "axios";
import {Link, useNavigate} from "react-router-dom";
const Login = props => {
  const [formData, setformData] = useState({
    username: "",
    password: "",
  });
  function setData(e) {
    setformData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  }
  const navigate = useNavigate();
  const [errors, setErrors] = useState("");

  function submitData(e) {
    e.preventDefault();
    axios
      .post("http://localhost:6001/auth/login", formData, {
        withCredentials: true,
      })
      .then(res => {
        console.log(res.data.message);
        if (res.data.message === "User logged in") {
          console.log("Navigate now");
          props.setsessionID(true);
          navigate("/");
          setformData({
            username: "",
            password: "",
          });
        }
      })
      .catch(err => {
        console.log(err);
        setErrors("Wrong credentials");
      });
  }
  return (
    <div className="login">
      <div className="text-top">
        <h1 className="auth-logo">
          <i className="fa-solid fa-ghost"></i>
          <span>Boo !</span>
        </h1>
        <p>
          <span>Welcome to our chat app!</span>
          <br />A place where you can chat freely and confidently,knowing that
          your conversations are completely private and secure.
        </p>
        <h4>Login to your account below</h4>
      </div>
      <form onSubmit={submitData}>
        <input
          type="text"
          placeholder="username"
          required
          onChange={setData}
          name="username"
          value={formData.username}
        />
        <input
          type="password"
          placeholder="password"
          required
          onChange={setData}
          name="password"
          value={formData.password}
        />
        <p className="error">{errors}</p>
        <button>Login</button>
      </form>

      <div className="to-signup">
        <span>Don't have an account?</span>
        <Link to="/register">Register</Link>
      </div>
    </div>
  );
};

export default Login;
