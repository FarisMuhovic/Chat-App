import {useNavigate} from "react-router-dom";
import React, {useEffect} from "react";
const ProtectedRoute = ({sessionID, redirectPath, children}) => {
  const navigate = useNavigate();
  useEffect(() => {
    if (!sessionID) {
      navigate("/login");
    } else {
      navigate(redirectPath);
    }
  }, []);

  return children;
};

export default ProtectedRoute;
