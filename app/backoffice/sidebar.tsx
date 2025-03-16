"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import axios from "axios";
import { config } from "../config";
import { useEffect, useState } from "react";
import Modal from "./modal";
import Swal from "sweetalert2";

export default function Sidebar() {
  const router = useRouter();

  const [name, setName] = useState("");
  const [level, setLevel] = useState("");
  const [isShowModal, setIsShowModal] = useState(false);
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  useEffect(() => {
    getUser();
  }, []);

  const getUser = async () => {
    const token = localStorage.getItem("token");
    const headers = {
      Authorization: `Bearer ${token}`,
    };

    const res = await axios.get(`${config.apiUrl}/user/info`, {
      headers: headers,
    });

    setName(res.data.name);
    setUsername(res.data.username);
    setLevel(res.data.level);
  };

  const handleLogout = () => {
    localStorage.removeItem("toekn");
    router.push("/");
  };

  const handleShowModal = () => {
    setIsShowModal(true);
  };

  const handleCloseModal = () => {
    setIsShowModal(false);
  };

  const handleSave = async () => {
    if (password !== confirmPassword) {
      Swal.fire({
        icon: "error",
        title: "รหัสผ่านไม่ตรงกัน",
        text: "กรุณาตรวจสอบรหัสผ่านอีกครั้ง",
      });
      return;
    }

    const payload = { name, username, password, level };
    const token = localStorage.getItem("token");
    const headers = { Authorization: `Bearer ${token}` };

    await axios.put(`${config.apiUrl}/user/update`, payload, { headers });
    getUser();
    handleCloseModal();
  };

  return (
    <div className="bg-teal-600 h-screen w-64 fixed">
      <div className="p-5 bg-teal-800 text-white text-xl">
        <h1>ArtMobile Version 1.0</h1>
        <div className="flex items-center gap-2 mt-3">
          <i className="fa fa-user"></i>
          <span className="w-full">
            {name} : {level}
          </span>
          <button
            className="bg-blue-500 rounded-full px-2 py-1"
            onClick={handleShowModal}
          >
            <i className="fa fa-pencil"></i>
          </button>
          <button
            className="bg-red-500 rounded-full px-2 py-1"
            onClick={handleLogout}
          >
            <i className="fa fa-sign-out-alt"></i>
          </button>
        </div>
      </div>
      <div className="p-5 text-white text-xl flex flex-col gap-2">
        <div>
          <Link href="/backoffice/dashboard">
            <i className="fa fa-tachometer-alt mr-2 w-[25px] text-center"></i>
            Dashboard
          </Link>
        </div>

        <div>
          <Link href="/backoffice/buy">
            <i className="fa fa-shopping-cart mr-2 w-[25px] text-center"></i>
            ชื่อสินค้า
          </Link>
        </div>

        <div>
          <Link href="/backoffice/sell">
            <i className="fa fa-dollar-sign mr-2 w-[25px] text-center"></i>
            ขายสินค้า
          </Link>
        </div>

        <div>
          <Link href="/backoffice/repair">
            <i className="fa fa-wrench mr-2 w-[25px] text-center"></i>
            รับซ่อม
          </Link>
        </div>

        <div>
          <Link href="/backoffice/company">
            <i className="fa fa-building mr-2 w-[25px] text-center"></i>
            ข้อมูลร้าน
          </Link>
        </div>

        <div>
          <Link href="/backoffice/repair">
            <i className="fa fa-users mr-2 w-[25px] text-center"></i>
            ผู้ใช้งาน
          </Link>
        </div>
      </div>

      <Modal
        title="แก้ไขข้อมูลผู้ใช้งาน"
        isOpen={isShowModal}
        onClose={handleCloseModal}
      >
        <div>
          <div>ชือผู้ใช้งาน</div>
          <input
            type="text"
            className="form-control"
            value={name}
            onChange={(e) => setName(e.target.value)}
          />

          <div className="mt-3">username</div>
          <input
            type="text"
            className="form-control"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
          />

          <div className="mt-3">รหัสผ่าน</div>
          <input
            type="text"
            className="form-control"
            onChange={(e) => setPassword(e.target.value)}
          />

          <div className="mt-3">ยืนยันรหัสผ่าน</div>
          <input
            type="text"
            className="form-control"
            onChange={(e) => setConfirmPassword(e.target.value)}
          />

          <div className="mt-3">
            <button className="btn" onClick={handleSave}>
              <i className="fa fa-save mr-2"></i>
              บันทึก
            </button>
          </div>
        </div>
      </Modal>
    </div>
  );
}
