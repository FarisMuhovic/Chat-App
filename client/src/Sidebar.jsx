import React, {useState, useEffect} from "react";
import {Link, useNavigate} from "react-router-dom";
import axios from "axios";
const Sidebar = props => {
  const [active, setActive] = useState("profile");

  const navigate = useNavigate();
  function linkFunctionality(e) {
    setActive(e.currentTarget.getAttribute("data-linkname"));
    e.currentTarget.getAttribute("data-linkname") === "logout" && logout();
  }
  const links = [
    {id: 1, name: "profile", icon: "fa-user"},
    {id: 2, name: "friends", icon: "fa-user-group"},
    {id: 3, name: "messages", icon: "fa-envelope"},
    {id: 4, name: "notifications", icon: "fa-bell"},
    {id: 5, name: "settings", icon: "fa-gear"},
    {id: 6, name: "logout", icon: "fa-sign-out"},
  ];

  function logout() {
    navigate("/login");
    axios
      .get("http://localhost:6001/auth/logout", {withCredentials: true})
      .then(res => {
        console.log(res.data.message);
        props.setsessionID(false);
      })
      .catch(err => {
        console.log(err);
      });
  }
  useEffect(() => {
    let path = window.location.href.split("/")[3];
    if (path === "") {
      path = "profile";
    }
    setActive(path);
  }, [window.location.href]);
  const linkElements = links.map(link => {
    return (
      <Link
        to={`/${
          link.name.toLowerCase() !== "logout"
            ? link.name.toLowerCase()
            : "login"
        }`}
        onClick={linkFunctionality}
        className={active === link.name ? "link link-active" : "link"}
        key={link.id}
        data-linkname={link.name}
      >
        <i className={`fa-solid ${link.icon}`}></i>
        <p>{link.name}</p>
      </Link>
    );
  });

  return (
    <div className="side-bar">
      <ul>
        <div className="logo">
          <i className="fa-solid fa-ghost"></i>
          <span>Boo !</span>
        </div>
        {linkElements}
      </ul>
    </div>
  );
};

export default Sidebar;
