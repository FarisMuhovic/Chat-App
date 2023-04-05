import {Routes, Route} from "react-router-dom";
import React, {useState} from "react";
import Sidebar from "./Sidebar";
import Friends from "./components/Friends";
import Profile from "./components/Profile";
import Messages from "./components/Messages";
import Notifications from "./components/Notifications";
import Settings from "./components/Settings";

import Register from "./auth/Register";
import Login from "./auth/Login";
import ProtectedRoutes from "./auth/ProtectedRoutes";
function App() {
  const [sessionID, setsessionID] = useState(false);
  return (
    <div className="App">
      <Routes>
        <Route
          element={
            <ProtectedRoutes
              setsessionID={setsessionID}
              sessionID={sessionID}
            />
          }
        >
          <Route
            path="/"
            element={
              <>
                <Sidebar setsessionID={setsessionID} />
                <Profile />
              </>
            }
          />
          <Route
            path="/profile"
            element={
              <>
                <Sidebar setsessionID={setsessionID} />
                <Profile />
              </>
            }
          />
          <Route
            path="/friends"
            element={
              <>
                <Sidebar setsessionID={setsessionID} />
                <Friends />
              </>
            }
          />

          <Route
            path="/messages"
            element={
              <>
                <Sidebar setsessionID={setsessionID} />
                <Messages />
              </>
            }
          />
          <Route
            path="/notifications"
            element={
              <>
                <Sidebar setsessionID={setsessionID} />
                <Notifications />
              </>
            }
          />
          <Route
            path="/settings"
            element={
              <>
                <Sidebar setsessionID={setsessionID} />
                <Settings />
              </>
            }
          />
        </Route>
        <Route
          path="/register"
          element={
            <Register setsessionID={setsessionID} sessionID={sessionID} />
          }
        />
        <Route
          path="/login"
          element={<Login setsessionID={setsessionID} sessionID={sessionID} />}
        />
        <Route path="*" element={<h1>No access , redirecting...</h1>} />
      </Routes>
    </div>
  );
}

export default App;
