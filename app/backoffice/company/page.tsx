"use client";

import { useEffect, useState } from "react";
import Swal from "sweetalert2";
import { config } from "@/app/config";
import axios from "axios";

export default function Page() {
  const [name, setName] = useState("");
  const [address, setAddress] = useState("");
  const [phone, setPhone] = useState("");
  const [email, setEmail] = useState("");
  const [taxCode, setTaxcode] = useState("");

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    const res = await axios.get(`${config.apiUrl}/company/list`);
    setName(res.data.name);
    setAddress(res.data.address);
    setPhone(res.data.phone);
    setEmail(res.data.email);
    setTaxcode(res.data.taxCode);
  };

  const handleSave = async () => {
    try {
      const payload = {
        name,
        address,
        phone,
        email,
        taxCode,
      };

      await axios.post(`${config.apiUrl}/company/create`, payload);
      Swal.fire({
        icon: "success",
        title: "บันทึกข้อมูลสำเร็จ",
        timer: 2000,
      });
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
    } catch (error: any) {
      Swal.fire({
        icon: "error",
        title: "ผิดพลาด",
        text: "ไม่สามรถบันทึกข้อมูลได้",
      });
      console.log("error", error);
    }
  };

  return (
    <div>
      <h1 className="content-header">ข้อมูลร้าน</h1>
      <div>
        <div>ชื่อร้าน</div>
        <input
          type="text"
          value={name}
          onChange={(e) => setName(e.target.value)}
        />

        <div className="mt-4">ที่อยู่</div>
        <input
          type="text"
          value={address}
          onChange={(e) => setAddress(e.target.value)}
        />

        <div className="mt-4">เบอร์โทรศัพท์</div>
        <input
          type="text"
          value={phone}
          onChange={(e) => setPhone(e.target.value)}
        />

        <div className="mt-4">อีเมล</div>
        <input
          type="text"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />

        <div className="mt-4">รหัสประจำตัวผู้เสียภาษี</div>
        <input
          type="text"
          value={taxCode}
          onChange={(e) => setTaxcode(e.target.value)}
        />

        <button className="btn mt-4" onClick={handleSave}>
          <i className="fa fa-save mr-2"></i>
          บันทึก
        </button>
      </div>
    </div>
  );
}
