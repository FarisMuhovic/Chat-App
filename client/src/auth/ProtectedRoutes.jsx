import {Outlet} from "react-router-dom";
import Login from "./Login";
import React, {useEffect} from "react";
import axios from "axios";
const ProtectedRoutes = props => {
  useEffect(() => {
    axios
      .get("http://localhost:6001/auth/login", {withCredentials: true})
      .then(res => {
        console.log(res.data.message);
        if (res.data.message === "User logged in") {
          props.setsessionID(true);
        }
      })
      .catch(err => {
        console.log(err);
      });
  }, []);

  return props.sessionID ? (
    <Outlet />
  ) : (
    <Login setsessionID={props.setsessionID} sessionID={props.sessionID} />
  );
};

export default ProtectedRoutes;
