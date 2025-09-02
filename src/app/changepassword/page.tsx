"use client";
import axios from "axios";
import React, { useEffect, useState } from "react";
import toast from "react-hot-toast";

export default function ResetPasswordPage() {
  const [token, setToken] = useState("");
  const [passwords, setPasswords] = useState({
    newPassword: "",
    confirmPassword: "",
  });
  const [loading, setLoading] = useState(false);
  const [buttonDisabled, setButtonDisabled] = useState(true);

  useEffect(() => {
    const urlToken = window.location.search.split("=")[1];
    setToken(urlToken || "");
  }, []);

  // Enable button only when both passwords are entered and match
  useEffect(() => {
    if (
      passwords.newPassword.length > 0 &&
      passwords.confirmPassword.length > 0 &&
      passwords.newPassword === passwords.confirmPassword
    ) {
      setButtonDisabled(false);
    } else {
      setButtonDisabled(true);
    }
  }, [passwords]);

  const onResetPassword = async () => {
    if (buttonDisabled || loading) return;

    try {
      setLoading(true);
      await axios.post("/api/users/resetpassword", {
        token: token,
        password: passwords.newPassword,
      });
      toast.success("Password reset successfully!");
      window.location.href = "/login"; // Replaced router.push
    } catch (error: unknown) {
      if (error instanceof Error) {
        toast.error(error.message);
      } else {
        toast.error("An unexpected error occurred.");
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen py-2 bg-gray-900 text-gray-200 px-4">
      <h1 className="text-4xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-purple-400 to-pink-600 mb-2">
        {loading ? "Resetting..." : "Choose a New Password"}
      </h1>
      <hr className="w-24 border-t-2 border-purple-500 my-6" />

      <label
        htmlFor="newPassword"
        className="w-full max-w-sm text-left text-sm font-semibold text-gray-400 mb-1"
      >
        New Password
      </label>
      <input
        className="w-full max-w-sm p-3 bg-gray-800 border-2 border-gray-700 rounded-lg text-gray-100 placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent transition duration-300 ease-in-out mb-4"
        type="password"
        id="newPassword"
        value={passwords.newPassword}
        onChange={(e) =>
          setPasswords({ ...passwords, newPassword: e.target.value })
        }
        placeholder="••••••••"
      />

      <label
        htmlFor="confirmPassword"
        className="w-full max-w-sm text-left text-sm font-semibold text-gray-400 mb-1"
      >
        Confirm New Password
      </label>
      <input
        className="w-full max-w-sm p-3 bg-gray-800 border-2 border-gray-700 rounded-lg text-gray-100 placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent transition duration-300 ease-in-out"
        type="password"
        id="confirmPassword"
        value={passwords.confirmPassword}
        onChange={(e) =>
          setPasswords({ ...passwords, confirmPassword: e.target.value })
        }
        placeholder="••••••••"
      />
      {passwords.newPassword !== passwords.confirmPassword &&
        passwords.confirmPassword.length > 0 && (
          <p className="text-red-500 text-xs mt-1 w-full max-w-sm text-left">
            Passwords do not match.
          </p>
        )}

      <button
        onClick={onResetPassword}
        disabled={buttonDisabled || loading}
        className="w-full max-w-sm py-3 mt-8 mb-4 font-bold text-white bg-gradient-to-r from-purple-600 to-pink-600 rounded-lg shadow-lg hover:shadow-xl hover:from-purple-700 hover:to-pink-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-pink-500 cursor-pointer focus:ring-offset-gray-900 transform hover:-translate-y-1 transition-all duration-300 disabled:opacity-50 disabled:transform-none disabled:shadow-none disabled:cursor-not-allowed"
      >
        {buttonDisabled ? "Passwords must match" : "Reset Password"}
      </button>

      <a
        href="/login"
        className="text-sm text-purple-400 hover:text-purple-300 hover:underline transition duration-300"
      >
        Back to Login
      </a>
    </div>
  );
}
