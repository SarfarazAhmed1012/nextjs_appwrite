"use client";

import axios from "axios";
import React, { useState } from "react";

const ForgotPassword = () => {
  const [email, setEmail] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSubmit = async () => {
    setLoading(true);

    try {
      axios.post("/api/users/forgotPassword", { email });
      console.log(email);
      setLoading(false);
    } catch (e: any) {
      setLoading(false);
      console.log(e.response.data);
    }
  };

  return (
    <div className="flex justify-center items-center h-[100vh] w-full flex-col gap-4">
      <span className=" text-white">Your email</span>
      <input
        type="text"
        className="p-2 bg-white text-black rounded-md"
        value={email}
        placeholder="Enter your email"
        onChange={(e) => setEmail(e.target.value)}
      />
      <button
        className="p-2 text-base text-white bg-blue-700 rounded-md w-[100px]"
        onClick={handleSubmit}
      >
        {loading ? "Submitting..." : "Submit"}
      </button>
    </div>
  );
};

export default ForgotPassword;
