"use client";
import Link from "next/link";
import React, { useEffect } from "react";
import { useRouter } from "next/navigation";
import axios from "axios";
import toast from "react-hot-toast";


export default function SignUpPage(){
    const router = useRouter();
    const [user, setUser] = React.useState({
        email: "",
        password: "",
        username: ""
    })

    const [loading, setloading] = React.useState(false);

    const [buttonDisabled, setButtonDisabled] = React.useState(false);

    const onSignup = async () => {
        try {
            setloading(true);
            const response = await axios.post("/api/users/signup", user);
            console.log("Signup success", response.data);
            router.push("/login");
        } catch (error: any) {
            console.log("Signup failed", error.message);
            toast.error(error.message);
        }finally{
            setloading(false);
        }
    }

    useEffect(() => {
        if(user.email.length > 0 && user.password.length > 0 && user.username.length > 0){
            setButtonDisabled(false)
        }
        else{
            setButtonDisabled(true);
        }
    },[user])

    return (
        <div className="flex flex-col items-center justify-center min-h-screen py-2 bg-gray-900 text-gray-200 px-4">
            <h1 className="text-5xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-purple-400 to-pink-600 mb-2">
                {loading ? "Signing Up..." : "Get Started"}
            </h1>
            <hr className="w-24 border-t-2 border-purple-500 my-6" />
            
            <label htmlFor="username" className="w-full max-w-sm text-left text-sm font-semibold text-gray-400 mb-1">
                Username
            </label>
            <input
                className="w-full max-w-sm p-3 bg-gray-800 border-2 border-gray-700 rounded-lg text-gray-100 placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent transition duration-300 ease-in-out mb-4"
                type="text" 
                id="username" 
                value={user.username}
                onChange={(e) => setUser({...user, username: e.target.value})}
                placeholder="Enter your name"
            />

            <label htmlFor="email" className="w-full max-w-sm text-left text-sm font-semibold text-gray-400 mb-1">
                Email
            </label>
            <input
                className="w-full max-w-sm p-3 bg-gray-800 border-2 border-gray-700 rounded-lg text-gray-100 placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent transition duration-300 ease-in-out mb-4"
                type="email" 
                id="email" 
                value={user.email}
                onChange={(e) => setUser({...user, email: e.target.value})}
                placeholder="you@example.com"
            />

            <label htmlFor="password" className="w-full max-w-sm text-left text-sm font-semibold text-gray-400 mb-1">
                Password
            </label>
            <input
                className="w-full max-w-sm p-3 bg-gray-800 border-2 border-gray-700 rounded-lg text-gray-100 placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent transition duration-300 ease-in-out"
                type="password" 
                id="password" 
                value={user.password}
                onChange={(e) => setUser({...user, password: e.target.value})}
                placeholder="••••••••"
            />
            
            <button
                onClick={onSignup}
                disabled={buttonDisabled || loading}
                className="w-full max-w-sm py-3 mt-8 mb-4 font-bold text-white bg-gradient-to-r from-purple-600 to-pink-600 rounded-lg shadow-lg hover:shadow-xl hover:from-purple-700 hover:to-pink-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-pink-500 cursor-pointer focus:ring-offset-gray-900 transform hover:-translate-y-1 transition-all duration-300 disabled:opacity-50 disabled:transform-none disabled:shadow-none disabled:cursor-not-allowed">
                {buttonDisabled ? "Fill in all fields" : "Create Account"}
            </button>
            
            <Link href="/login" className="text-sm text-purple-400 hover:text-purple-300 hover:underline transition duration-300">
                Already have an account? Login
            </Link>
        </div>
    )
}