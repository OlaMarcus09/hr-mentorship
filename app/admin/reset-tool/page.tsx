"use client";
import { useState } from "react";

export default function ResetTool() {
  const [status, setStatus] = useState("Idle");

  async function runReset() {
    setStatus("Resetting...");
    const res = await fetch("/api/reset-password");
    const data = await res.json();
    if (res.ok) {
      setStatus("SUCCESS: Password is now 'password123'. Go to /admin/login");
    } else {
      setStatus("ERROR: " + data.error);
    }
  }

  return (
    <div className="min-h-screen flex items-center justify-center flex-col gap-4">
      <h1 className="text-2xl font-bold">Emergency Admin Reset</h1>
      <button onClick={runReset} className="bg-red-600 text-white px-6 py-3 rounded font-bold">
        RESET PASSWORD TO 'password123'
      </button>
      <p className="font-mono bg-gray-100 p-4 rounded">{status}</p>
    </div>
  );
}
