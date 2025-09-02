"use client";
import axios from "axios";
import toast from "react-hot-toast";
import { useRouter } from "next/navigation";
import React from "react";
import Link from "next/link";

export default function ProfilePage() {
  const router = useRouter();
  const [data, setData] = React.useState("");

  const logout = async () => {
    try {
      await axios.get("/api/users/logout");
      toast.success("Logout successful");
      router.push("/login");
    } catch (error: unknown) {
      if (error instanceof Error) {
        toast.error(error.message);
      } else {
        toast.error("An unexpected error occurred.");
      }
    }
  };

  const getUserDetails = async () => {
    const res = await axios.get("/api/users/me");
    console.log(res.data);
    setData(res.data.data._id);
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen py-2 bg-gray-900 text-white font-sans">
      <div className="w-full max-w-md p-8 space-y-6 bg-gray-800 rounded-2xl shadow-2xl shadow-blue-500/20">
        <h1 className="text-4xl font-extrabold text-center bg-clip-text text-transparent bg-gradient-to-r from-blue-400 to-teal-400">
          Profile Dashboard
        </h1>
        <hr className="border-t border-gray-700" />
        <p className="text-center text-gray-400">
          Welcome to your personal space.
        </p>
        <div className="p-4 bg-gray-900/50 rounded-lg text-center">
          <h2 className="text-gray-500 text-sm font-medium mb-2">User ID</h2>
          <span className="font-mono text-lg text-green-400 break-all">
            {data === "" ? (
              "Click below to fetch ID"
            ) : (
              <Link
                href={`/profile/${data}`}
                className="hover:underline hover:text-green-300 transition-colors"
              >
                {data}
              </Link>
            )}
          </span>
        </div>
        <hr className="border-t border-gray-700" />
        <div className="flex flex-col sm:flex-row items-center gap-4">
          <button
            onClick={getUserDetails}
            className="w-full bg-gradient-to-r from-sky-500 to-indigo-600 p-3 hover:from-sky-600 hover:to-indigo-700 cursor-pointer font-bold text-white rounded-lg transition-all duration-300 transform hover:scale-105 focus:outline-none focus:ring-4 focus:ring-sky-400/50"
          >
            Get User Details ✨
          </button>
          <button
            onClick={logout}
            className="w-full bg-transparent border-2 border-red-500 text-red-500 p-3 hover:bg-red-500 hover:text-white cursor-pointer font-bold rounded-lg transition-all duration-300 transform hover:scale-105 focus:outline-none focus:ring-4 focus:ring-red-500/50"
          >
            Logout 🚪
          </button>
        </div>
      </div>
    </div>
  );
}
