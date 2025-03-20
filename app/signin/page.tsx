"use client";

import { useState } from "react";
import { config } from "../config";
import axios from "axios";
import Swal from "sweetalert2";
import { useRouter } from "next/navigation";

export default function Signin() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  const router = useRouter();

  const handleSignIn = async () => {
    try {
      const payload = { username, password };
      const res = await axios.post(`${config.apiUrl}/user/signin`, payload);

      if (res.data.token !== null) {
        localStorage.setItem("token", res.data.token);
        if (res.data.level === "admin") {
          router.push("/backoffice/dashboard");
        } else {
          router.push("/backoffice/sell");
        }
      } else {
        Swal.fire({
          title: "ตรวจสอบ User",
          text: "ชื่อผู้ใช้งานหรือรหัสผ่านไม่ถูกต้อง",
          icon: "warning",
          timer: 2000,
        });
      }
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
    } catch (error: any) {
      if (error.response.status === 401) {
        Swal.fire({
          title: "Error",
          text: "ชื่อผู้ใช้งานหรือรหัสผ่านไม่ถูกต้อง",
          icon: "error",
        });
      } else {
        Swal.fire({
          title: "Error",
          text: error.message,
          icon: "error",
        });
      }
    }
  };

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
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />

        <button className="mt-4" onClick={handleSignIn}>
          Sign In
          <i className="fa fa-sign-in-alt ml-2"></i>
        </button>
      </div>
    </div>
  );
}
