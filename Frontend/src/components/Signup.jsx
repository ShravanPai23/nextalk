import React, { useState } from "react";
import { useForm } from "react-hook-form";
import axios from "axios";
import { useAuth } from "../context/AuthProvider";
import { Link } from "react-router-dom";

const Signup = () => {
  const { authUser, setAuthUser } = useAuth();
  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
    reset,
  } = useForm();

  const password = watch("password", "");

  const [generalError, setGeneralError] = useState("");
  const [successMessage, setSuccessMessage] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const validatePasswordMatch = (value) => {
    return value === password || "Passwords do not match";
  };

  const onSubmit = async (data) => {
    setGeneralError("");
    setSuccessMessage("");
    setIsLoading(true);

    const userInfo = {
      username: data.username,
      email: data.email,
      password: data.password,
      confirmPassword: data.confirmPassword,
    };

    try {
      const response = await axios.post(
        "http://localhost:5000/user/signup",
        userInfo,
        { withCredentials: true }
      );
      if (response.data) {
        console.log("Signup successful", response.data);
        localStorage.setItem("ChatApp", JSON.stringify(response.data));
        setSuccessMessage("Signup successful! Redirecting...");
        setAuthUser(response.data);
        reset();
      }
    } catch (error) {
      if (
        error.response &&
        error.response.data &&
        error.response.data.message
      ) {
        setGeneralError(error.response.data.message);
        console.error("Backend Error:", error.response.data.message);
      } else {
        setGeneralError("Signup failed. Please try again later.");
        console.error("Signup failed:", error.message || error);
      }
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="flex h-screen items-center justify-center bg-gray-800 font-sans">
      <form
        onSubmit={handleSubmit(onSubmit)}
        className="border border-purple-400 bg-[#3d0e5c] px-6 py-6 rounded-lg space-y-4 w-96 shadow-lg"
      >
        <h1 className="text-3xl text-center text-purple-400 font-bold">
          Nextalk
        </h1>
        <h2 className="text-xl text-center text-white">
          Create a new{" "}
          <span className="text-purple-300 font-semibold">Account</span>
        </h2>

        {generalError && (
          <div className="text-red-400 text-sm font-semibold text-center">
            {generalError}
          </div>
        )}
        {successMessage && (
          <div className="text-green-400 text-sm font-semibold text-center">
            {successMessage}
          </div>
        )}

        <label className="flex items-center gap-2 border border-gray-600 px-3 py-2 rounded-lg text-white bg-transparent focus-within:border-purple-400 transition">
          <svg
            className="w-4 h-4 opacity-70 text-gray-400"
            viewBox="0 0 16 16"
            fill="currentColor"
          >
            <path d="M8 8a3 3 0 1 0 0-6 3 3 0 0 0 0 6ZM12.735 14c.618 0 1.093-.561.872-1.139a6.002 6.002 0 0 0-11.215 0c-.22.578.254 1.139.872 1.139h9.47Z" />
          </svg>
          <input
            type="text"
            placeholder="Username"
            className="grow bg-transparent placeholder-gray-400 border-none focus:outline-none focus:ring-0"
            {...register("username", { required: "Username is required" })}
          />
        </label>
        {errors.username && (
          <span className="text-red-400 text-sm font-semibold">
            {errors.username.message}
          </span>
        )}

        <label className="flex items-center gap-2 border border-gray-600 px-3 py-2 rounded-lg text-white bg-transparent focus-within:border-purple-400 transition">
          <svg
            className="w-4 h-4 opacity-70 text-gray-400"
            viewBox="0 0 16 16"
            fill="currentColor"
          >
            <path d="M2.5 3A1.5 1.5 0 0 0 1 4.5v.793c.026.009.051.02.076.032L7.674 8.51c.206.1.446.1.652 0l6.598-3.185A.755.755 0 0 1 15 5.293V4.5A1.5 1.5 0 0 0 13.5 3h-11Z" />
            <path d="M15 6.954 8.978 9.86a2.25 2.25 0 0 1-1.956 0L1 6.954V11.5A1.5 1.5 0 0 0 2.5 13h11a1.5 1.5 0 0 0 1.5-1.5V6.954Z" />
          </svg>
          <input
            type="email"
            placeholder="Email"
            className="grow bg-transparent placeholder-gray-400 border-none focus:outline-none focus:ring-0"
            {...register("email", {
              required: "Email is required",
              pattern: {
                value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
                message: "Invalid email address",
              },
            })}
          />
        </label>
        {errors.email && (
          <span className="text-red-400 text-sm font-semibold">
            {errors.email.message}
          </span>
        )}

        <label className="flex items-center gap-2 border border-gray-600 px-3 py-2 rounded-lg text-white bg-transparent focus-within:border-purple-400 transition">
          <svg
            className="w-4 h-4 opacity-70 text-gray-400"
            viewBox="0 0 16 16"
            fill="currentColor"
          >
            <path
              fillRule="evenodd"
              d="M14 6a4 4 0 0 1-4.899 3.899l-1.955 1.955a.5.5 0 0 1-.353.146H5v1.5a.5.5 0 0 1-.5.5h-2a.5.5 0 0 1-.5-.5v-2.293a.5.5 0 0 1 .146-.353l3.955-3.955A4 4 0 1 1 14 6Zm-4-2a.75.75 0 0 0 0 1.5.5.5 0 0 1 .5.5.75.75 0 0 0 1.5 0 2 2 0 0 0-2-2Z"
              clipRule="evenodd"
            />
          </svg>
          <input
            type="password"
            placeholder="Password"
            className="grow bg-transparent placeholder-gray-400 border-none focus:outline-none focus:ring-0"
            {...register("password", {
              required: "Password is required",
              minLength: {
                value: 6,
                message: "Password must be at least 6 characters long",
              },
            })}
          />
        </label>
        {errors.password && (
          <span className="text-red-400 text-sm font-semibold">
            {errors.password.message}
          </span>
        )}

        <label className="flex items-center gap-2 border border-gray-600 px-3 py-2 rounded-lg text-white bg-transparent focus-within:border-purple-400 transition">
          <svg
            className="w-4 h-4 opacity-70 text-gray-400"
            viewBox="0 0 16 16"
            fill="currentColor"
          >
            <path
              fillRule="evenodd"
              d="M14 6a4 4 0 0 1-4.899 3.899l-1.955 1.955a.5.5 0 0 1-.353.146H5v1.5a.5.5 0 0 1-.5.5h-2a.5.5 0 0 1-.5-.5v-2.293a.5.5 0 0 1 .146-.353l3.955-3.955A4 4 0 1 1 14 6Zm-4-2a.75.75 0 0 0 0 1.5.5.5 0 0 1 .5.5.75.75 0 0 0 1.5 0 2 2 0 0 0-2-2Z"
              clipRule="evenodd"
            />
          </svg>
          <input
            type="password"
            placeholder="Confirm password"
            className="grow bg-transparent placeholder-gray-400 border-none focus:outline-none focus:ring-0"
            {...register("confirmPassword", {
              required: "Confirm password is required",
              validate: validatePasswordMatch,
            })}
          />
        </label>
        {errors.confirmPassword && (
          <span className="text-red-400 text-sm font-semibold">
            {errors.confirmPassword.message}
          </span>
        )}

        <button
          type="submit"
          disabled={isLoading}
          className={`w-full py-2 rounded-lg font-semibold transition shadow-md ${
            isLoading
              ? "bg-blue-400 cursor-not-allowed"
              : "bg-blue-600 hover:bg-blue-700 cursor-pointer"
          } text-white`}
        >
          {isLoading ? "Signing Up..." : "Signup"}
        </button>

        <p className="text-center text-sm text-gray-300">
          Already have an account?{" "}
          <Link
            to={"/login"}
            className="text-blue-300 font-semibold cursor-pointer hover:underline"
            onClick={() => setShowLogin(true)}
          >
            Login
          </Link>
        </p>
      </form>
    </div>
  );
};

export default Signup;
