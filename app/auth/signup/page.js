"use client";

import Initial from "@/app/components/Initial";
import { useState } from "react";

export default function SignUp() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  const [errorMessage, setErrorMessage] = useState("");

  const [emailError, setEmailError] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    // (email validation client side)
    const regEx = /^[a-zA-Z0-9._-]{2,}@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
    if (!regEx.test(email)) {
      setEmailError("Correct email Format: example@gmail.com");
      return;
    } else {
      setEmailError("");
    }
    if (password !== confirmPassword) {
      alert("Passwords do not match!");
      return;
    }
    if (password.length < 4) {
      setErrorMessage(
        "Password is shorter than 4 character, try to increase it."
      );
      return;
    } else {
      setErrorMessage("");
    }

    if (email.includes(" ")) {
      setEmailError("Email cannot contain spaces.");
      return;
    }

    console.log("Sign-Up Data:", { email, password });
    // (re-setting fields)
    setEmail("");
    setPassword("");
    setConfirmPassword("");
    // Logic to send data to backend
    try {
      const responseServer = await fetch("/api/signup", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, password }),
      });

      // (to show user what is going on in backend.)
      if (responseServer.ok) {
        alert("Sign-Up successful!");
      } else {
        const errorFromServer = await responseServer.json();
        alert(errorFromServer.error || "Sign-Up failed!");
      }
    } catch (error) {
      alert("An error occurred. Please try again.");
    }
  };

  return (
    <>
      <Initial />
      <div className="max-w-md mx-auto p-8">
        <h1 className="text-3xl font-bold mb-4 text-center">Sign Up</h1>
        <form onSubmit={handleSubmit} className="flex flex-col gap-4">
          {emailError && (
            <div className="text-red-400 text-sm -mb-4">{emailError}</div>
          )}
          <input
            type="email"
            placeholder="Email"
            value={email}
            onChange={(e) => setEmail(e.target.value.trim().toLowerCase())}
            required
            className={
              emailError
                ? "border-2 rounded px-4 py-2 text-gray-600 border-red-500"
                : "border rounded px-4 py-2 text-gray-600"
            }
          />
          {/* (If error ? then message : no message) */}
          {errorMessage && (
            <div className="text-red-500 text-sm -mb-4">{errorMessage}</div>
          )}
          <input
            type="password"
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
            className={
              errorMessage
                ? "border-2 rounded px-4 py-2 text-gray-600 border-red-500"
                : "border rounded px-4 py-2 text-gray-600"
            }
          />
          <input
            type="password"
            placeholder="Confirm Password"
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
            required
            className="border rounded px-4 text-gray-600 py-2"
          />
          <button
            type="submit"
            className="bg-blue-600 text-white px-4 py-2 rounded"
          >
            Sign Up
          </button>
        </form>
      </div>
    </>
  );
}
