"use client";
import axios from "axios";
import Link from "next/link";
import { useRouter } from "next/navigation";
import React, { useState } from "react";
import toast from "react-hot-toast";

const page = () => {
  const router = useRouter();
  const [user, setUser] = useState("");
  const onLogout = async () => {
    try {
      const response = await axios.get("/api/users/logout");
      toast.success("Logout successful");
      router.push("/");
    } catch (err: any) {
      console.log(err.message);
      toast.error(err.message);
    }
  };
  const getUserDetails = async () => {
    const res = await axios.get("/api/users/me");
    console.log(res.data);
    setUser(res.data.data._id);
  };
  return (
    <div className="flex flex-col items-center justify-center min-h-screen py-2">
      <h1>Profile</h1>
      <hr />
      <p>Profile page</p>
      <h2>
        {user ? (
          <Link href={`/profile/${user}`}>{user}</Link>
        ) : (
          "No user found!"
        )}
      </h2>
      <button
        onClick={onLogout}
        className="bg-blue-500 mt-4 hover:bg-blue-600 text-white font-bold py-2 px-4 rounded"
      >
        Logout
      </button>
      <button
        onClick={getUserDetails}
        className="bg-blue-500 mt-4 hover:bg-blue-600 text-white font-bold py-2 px-4 rounded"
      >
        Get user
      </button>
    </div>
  );
};

export default page;
