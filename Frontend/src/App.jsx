import React from "react";
import Logout from "./home/Left/Logout";
import Left from "./home/Left/Left";
import Right from "./home/Right/Right";
import Signup from "./components/Signup";
import Login from "./components/Login";
import { useAuth } from "./context/AuthProvider";
import { Navigate, Route, Routes } from "react-router-dom";
import "./App.css";

const App = () => {
  const { authUser, setAuthUser } = useAuth();
  return (
    <Routes>
      <Route
        path="/"
        element={
          authUser ? (
            <div className="flex h-screen">
              <Logout />
              <Left />
              <Right />
            </div>
          ) : (
            <Navigate to={"/login"} />
          )
        }
      />
      <Route
        path="/login"
        element={authUser ? <Navigate to={"/"} /> : <Login />}
      />
      <Route
        path="/signup"
        element={authUser ? <Navigate to={"/"} /> : <Signup />}
      />
    </Routes>
  );
};

export default App;
