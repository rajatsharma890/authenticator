"use client";
import Link from "next/link";
import React, { useEffect } from "react";
import { useRouter } from "next/navigation";
import axios from "axios";
import toast from "react-hot-toast";
import { sendEmail } from "@/helpers/mailer";
import { NextResponse } from "next/server";

export default function LoginPage() {
  const router = useRouter();
  const [user, setUser] = React.useState({
    email: "",
    password: "",
  });

  const [loading, setloading] = React.useState(false);

  const [buttonDisabled, setButtonDisabled] = React.useState(false);

  const [forgotDisabled, setforgotDisabled] = React.useState(true);

  const onLogin = async () => {
    try {
      setloading(true);
      const response = await axios.post("/api/users/login", user);
      console.log("Login success", response.data);
      toast.success("Login success");
      router.push("/profile");
    } catch (error: any) {
      console.log("Login Failed", error.response?.data);
      const errorMessage =
        error.response?.data?.error ||
        "Login failed. Please check your credentials.";
      toast.error(errorMessage);
    } finally {
      setloading(false);
    }
  };

  const handleforgotpassword = async () => {
    if (forgotDisabled || loading) return;

    try {
      setloading(true);

      await axios.post("/api/users/forgotpassword", { email: user.email });
      toast.success("Password reset email sent! Check your inbox.");
    } catch (error: any) {
      toast.error(error.response?.data?.error || "Failed to send email.");
      console.log("Forgot password failed", error.response?.data);
    } finally {
      setloading(false);
    }
  };

  useEffect(() => {
    if (user.email.length > 0 && !loading) {
      setforgotDisabled(false);
    } else {
      setforgotDisabled(true);
    }

    if (user.email.length > 0 && user.password.length > 0) {
      setButtonDisabled(false);
    } else {
      setButtonDisabled(true);
    }
  }, [user]);

  return (
    <div className="flex flex-col items-center justify-center min-h-screen py-2 bg-gray-900 text-gray-200 px-4">
      <h1 className="text-5xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-purple-400 to-pink-600 mb-2">
        {loading ? "Logging In..." : "Login Credentials"}
      </h1>
      <hr className="w-24 border-t-2 border-purple-500 my-6" />

      <label
        htmlFor="email"
        className="w-full max-w-sm text-left text-sm font-semibold text-gray-400 mb-1"
      >
        Email
      </label>
      <input
        className="w-full max-w-sm p-3 bg-gray-800 border-2 border-gray-700 rounded-lg text-gray-100 placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent transition duration-300 ease-in-out mb-4"
        type="email"
        id="email"
        value={user.email}
        onChange={(e) => setUser({ ...user, email: e.target.value })}
        placeholder="you@example.com"
      />

      <label
        htmlFor="password"
        className="w-full max-w-sm text-left text-sm font-semibold text-gray-400 mb-1"
      >
        Password
      </label>
      <input
        className="w-full max-w-sm p-3 bg-gray-800 border-2 border-gray-700 rounded-lg text-gray-100 placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent transition duration-300 ease-in-out"
        type="password"
        id="password"
        value={user.password}
        onChange={(e) => setUser({ ...user, password: e.target.value })}
        placeholder="••••••••"
      />

      <button
        onClick={onLogin}
        disabled={buttonDisabled || loading}
        className="w-full max-w-sm py-3 mt-8 mb-4 font-bold text-white bg-gradient-to-r from-purple-600 to-pink-600 rounded-lg shadow-lg hover:shadow-xl hover:from-purple-700 hover:to-pink-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-pink-500 cursor-pointer focus:ring-offset-gray-900 transform hover:-translate-y-1 transition-all duration-300 disabled:opacity-50 disabled:transform-none disabled:shadow-none disabled:cursor-not-allowed"
      >
        {buttonDisabled ? "Fill in all fields" : "Login"}
      </button>

      <Link
        href="/signup"
        className="text-sm text-purple-400 hover:text-purple-300 hover:underline transition duration-300"
      >
        Don't have an Account? Create Account
      </Link>

      <button
        onClick={handleforgotpassword}
        className={`
            text-sm text-purple-400 transition duration-300
            ${
              forgotDisabled
                ? "opacity-50 cursor-not-allowed pointer-events-none"
                : "hover:text-purple-300 hover:underline cursor-pointer"
            }
            `}
      >
        Forgot Password?
      </button>
    </div>
  );
}
