"use client";
import axios from "axios";
import Link from "next/link";
import React, { useEffect, useState } from "react";
import toast from "react-hot-toast";

export default function VerifyEmailPage() {
  const [token, setToken] = useState("");
  const [verified, setVerified] = useState(false);
  const [error, setError] = useState(false);

  useEffect(() => {
    const urlParams = new URLSearchParams(window.location.search);
    const urlToken = urlParams.get("token");
    if (urlToken) {
      setToken(urlToken);
    }
  }, []);

  useEffect(() => {
    const verifyUserEmail = async () => {
      try {
        await axios.post("/api/users/verifyemail", { token });
        setVerified(true);
        setError(false);
      } catch (error: unknown) {
        setError(true);
        setVerified(false);
        if (error instanceof Error) {
          toast.error(error.message);
        } else {
          toast.error("An unexpected error occurred.");
        }
      }
    };
    if (token.length > 0) {
      verifyUserEmail();
    }
  }, [token]);

  return (
    <div className="flex flex-col items-center justify-center min-h-screen py-2 bg-gray-50 dark:bg-gray-900">
      <div className="w-full max-w-lg p-8 space-y-6 bg-white rounded-2xl shadow-xl dark:bg-gray-800">
        <div className="text-center">
          <h1 className="text-4xl font-extrabold text-gray-800 dark:text-white tracking-tight mb-2">
            Email Verification
          </h1>
          <p className="text-gray-500 dark:text-gray-400">
            Please wait while we verify your email address.
          </p>
        </div>

        <div className="flex items-center justify-center p-4 h-24 rounded-lg bg-gray-100 dark:bg-gray-700">
          {!verified && !error && (
            <div className="flex items-center space-x-2">
              <div className="w-4 h-4 rounded-full bg-blue-500 animate-pulse"></div>
              <div className="w-4 h-4 rounded-full bg-blue-500 animate-pulse [animation-delay:0.2s]"></div>
              <div className="w-4 h-4 rounded-full bg-blue-500 animate-pulse [animation-delay:0.4s]"></div>
              <span className="text-gray-600 dark:text-gray-300 ml-2">
                Verifying...
              </span>
            </div>
          )}

          {verified && (
            <div className="text-center">
              <h2 className="text-2xl font-semibold text-green-600 dark:text-green-400 mb-4">
                ✅ Email Verified Successfully!
              </h2>
              <Link
                href="/login"
                className="inline-block px-8 py-3 text-lg font-bold text-white bg-indigo-600 rounded-lg shadow-md hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-opacity-75 transition-transform transform hover:scale-105 duration-300"
              >
                Proceed to Login
              </Link>
            </div>
          )}

          {error && (
            <div className="text-center">
              <h2 className="text-2xl font-semibold text-red-600 dark:text-red-400">
                ❌ Verification Failed
              </h2>
              <p className="text-gray-500 dark:text-gray-400 mt-2">
                Invalid or expired token. Please try again.
              </p>
            </div>
          )}
        </div>

        <div className="pt-4 text-center">
          <h2 className="font-mono text-sm text-gray-400 dark:text-gray-500 break-all p-3 bg-gray-50 dark:bg-gray-900 rounded-md shadow-inner">
            {token ? `Token: ${token}` : "Awaiting token..."}
          </h2>
        </div>
      </div>
    </div>
  );
}
