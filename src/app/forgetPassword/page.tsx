"use client";

import axios from "axios";
import React, { useEffect, useState } from "react";

const ResetPassword = () => {
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [error, setError] = useState(false);
  const [token, setToken] = useState("");

  const handleSubmit = async () => {
    // Check if password and confirm password match
    if (password === confirmPassword) {
      // Passwords match, you can perform further actions here
      try {
        const response = await axios.post("/api/users/verifyPassword", {
          password,
          token,
        });
        console.log(response.data);
        console.log("Verified");
      } catch (e: any) {
        setError(true);
        console.log(e.response.data);
      }
    } else {
      // Passwords do not match, handle accordingly
      console.error("Passwords do not match");
    }
  };

  useEffect(() => {
    const urlToken = window.location.search.split("=")[1];
    setToken(urlToken || "");
  }, []);

  return (
    <div className="max-w-md mx-auto mt-8">
      <div className="mb-4">
        <label htmlFor="password" className="block text-gray-600">
          Password:
        </label>
        <input
          type="password"
          id="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
          className="w-full px-4 py-2 mt-2 border rounded-md focus:outline-none focus:border-blue-500 text-black"
        />
      </div>
      <div className="mb-4">
        <label htmlFor="confirmPassword" className="block text-gray-600">
          Confirm Password:
        </label>
        <input
          type="password"
          id="confirmPassword"
          value={confirmPassword}
          onChange={(e) => setConfirmPassword(e.target.value)}
          required
          className="w-full px-4 py-2 mt-2 border rounded-md focus:outline-none focus:border-blue-500 text-black"
        />
      </div>
      <div className="text-center">
        <button
          onClick={handleSubmit}
          type="button"
          className="px-4 py-2 text-white bg-blue-500 rounded-md focus:outline-none hover:bg-blue-600"
        >
          Submit
        </button>
      </div>
    </div>
  );
};

export default ResetPassword;
