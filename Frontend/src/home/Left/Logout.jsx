import React, { useState } from "react";
import { RiLogoutBoxLine } from "react-icons/ri";
import axios from "axios";
import Cookies from "js-cookie";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../../context/AuthProvider";

const Logout = () => {
  const [loading, setloading] = useState(false);
  const navigate = useNavigate();
  const { setAuthUser } = useAuth();

  const handleLogout = async () => {
    setloading(true);
    try {
      await axios.post("http://localhost:5000/user/logout");

      localStorage.removeItem("ChatApp");
      Cookies.remove("jwt");

      setAuthUser(null);
      navigate("/login");

      setloading(false);
    } catch (error) {
      console.error("Logout error:", error);
      setloading(false);
    }
  };

  return (
    <div className="w-[1%] bg-gray-800 text-white flex flex-col justify-end items-center h-screen pl-5 pr-3 pb-5">
      <div onClick={handleLogout} className="cursor-pointer hover:text-red-400">
        <RiLogoutBoxLine size={24} />
      </div>
    </div>
  );
};

export default Logout;
