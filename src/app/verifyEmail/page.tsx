"use client";

import axios from "axios";
import Link from "next/link";
import React, { useState, useEffect } from "react";

export default function verifyEmailPage() {
  const [token, setToken] = useState("");
  const [verified, setVerified] = useState(false);
  const [error, setError] = useState(false);

  const verifyUserEmail = async () => {
    try {
      axios.post("/api/users/verifyEmail", { token });
      setVerified(true);
      console.log("Verified");
    } catch (e: any) {
      setError(true);
      console.log(e.response.data);
    }
  };

  useEffect(() => {
    const urlToken = window.location.search.split("=")[1];
    setToken(urlToken || "");
  }, []);

  useEffect(() => {
    if (token.length > 0) {
      verifyUserEmail();
    }
  }, [token]);
  return (
    <div className=" flex flex-col items-center justify-center min-h-screen py-2">
      <h1 className=" text-4xl">Verify Email</h1>
      <h2 className="p-2 bg-blue-500 text-black">
        {token ? `${token}` : "no token"}
        {verified && (
          <div>
            <h2 className=" text-2xl">Email Verified</h2>
            <Link
              href="/login"
              className="bg-blue-500 text-white px-4 py-2 rounded-md hover:bg-blue-600"
            >
              {/* <a > */}
              Login
              {/* </a> */}
            </Link>
          </div>
        )}
        {error && (
          <div>
            <h2 className="text-red-800 text-2xl">Error found</h2>
          </div>
        )}
      </h2>
    </div>
  );
}
