"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";

export default function SignIn() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const router = useRouter();

  const handleSubmit = async (e) => {
    e.preventDefault();
    console.log("Sign-In Data:", { email, password });
    // Logic to send data to backend
    try {
      const response = await fetch("/api/signin", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, password }),
      });
      const data = await response.json();
      // (checking data response from backend)
      console.log("data from backend.", data);

      if (response.ok) {
        //  Redirect based on the user role returned from the backend
        if (data.role === "user") {
          router.push("/home");
        } else if (data.role === "admin") {
          router.push("/dashboard");
        }
      } else {
        alert(data.error || "Sign-In failed!");
      }
    } catch (error) {
      alert("An error occurred. Please try again.");
      console.error("Sign-In Error:", error.message);
    }
  };

  return (
    <div className="max-w-md mx-auto p-8">
      <h1 className="text-3xl font-bold mb-4 text-center">Sign In</h1>
      <form onSubmit={handleSubmit} className="flex flex-col gap-4">
        <input
          type="email"
          placeholder="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
          className="border rounded px-4 py-2"
        />
        <input
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
          className="border rounded px-4 py-2"
        />
        <button
          type="submit"
          className="bg-blue-600 text-white px-4 py-2 rounded"
        >
          Sign In
        </button>
      </form>
    </div>
  );
}
