import {Outlet} from "react-router-dom";
import Login from "./Login";
import React, {useEffect, useState} from "react";
import axios from "axios";
const ProtectedRoutes = props => {
  const [privateID, setPrivateID] = useState("");
  useEffect(() => {
    axios
      .get("http://localhost:6001/auth/login", {withCredentials: true})
      .then(res => {
        console.log(res);
        if (res.data.message === "User logged in") {
          props.setsessionID(true);

          setPrivateID(res.data.privateID);
        }
      })
      .catch(err => {
        console.log(err);
      });
  }, []);
  console.log(privateID);
  return props.sessionID ? (
    <Outlet context={privateID} />
  ) : (
    <Login setsessionID={props.setsessionID} sessionID={props.sessionID} />
  );
};

export default ProtectedRoutes;
