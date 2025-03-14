"use client";

import { useState } from "react";

export default function Signin() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  return (
    <div className="signin-container">
      <div className="signin-box">
        <h1 className="text-2xl font-bold">Sign</h1>

        <div>Username</div>
        <input
          type="text"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
        />
        <div className="mt-4">Password</div>
        <input
          type="text"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />

        <button className="mt-4">Sign In</button>
      </div>
    </div>
  );
}
