"use client";

import { useState } from "react";
import Swal from "sweetalert2";
import { config } from "@/app/config";
import axios from "axios";
import Modal from "../modal";

export default function Page() {
  const [isOpen, setIsOpen] = useState(false);
  const [serial, setSerial] = useState("");
  const [name, setName] = useState("");
  const [release, setRelease] = useState("");
  const [color, setColor] = useState("");
  const [price, setPrice] = useState(0);
  const [customerName, setCustomerName] = useState("");
  const [customerPhone, setCustomerPhone] = useState("");
  const [customerAddress, setCustomerAddress] = useState("");
  const [remark, setRemark] = useState("");

  const handleOpenModal = () => {
    setIsOpen(true);
  };

  const handleCloseModal = () => {
    setIsOpen(false);
  };

  const handleSave = async () => {
    try {
      const payload = {
        serial,
        name,
        release,
        color,
        price,
        customerName,
        customerPhone,
        customerAddress,
        remark,
      };
      await axios.post(`${config.apiUrl}/buy/create`, payload);

      Swal.fire({
        icon: "success",
        title: "บันทึกข้อมูลเรียบร้อย",
        text: "ข้อมูลถูกบันทึกเรียบร้อย",
        timer: 2000,
      });
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
    } catch (error: any) {
      Swal.fire({
        icon: "error",
        title: "ผิดพลาด",
        text: "ไม่สามารถบันทึกข้อมูล",
      });
      console.log("error", error);
    }
  };

  return (
    <>
      <h1 className="content-header">รายการซื้อ</h1>

      <div>
        <button className="btn" onClick={handleOpenModal}>
          <i className="fa-solid fa-plus mr-2"></i>
          เพิ่มรายการ
        </button>

        <Modal title="เพิ่มรายการ" isOpen={isOpen} onClose={handleCloseModal}>
          <div>Serial สินค้า</div>
          <input
            type="text"
            value={serial}
            onChange={(e) => setSerial(e.target.value)}
          />

          <div>ชื่อสินค้า</div>
          <input
            type="text"
            value={name}
            onChange={(e) => setName(e.target.value)}
          />

          <div>รุ่น</div>
          <input
            type="text"
            value={release}
            onChange={(e) => setRelease(e.target.value)}
          />

          <div>สี</div>
          <input
            type="text"
            value={color}
            onChange={(e) => setColor(e.target.value)}
          />

          <div>ราคา</div>
          <input
            type="text"
            value={price}
            onChange={(e) => setPrice(Number(e.target.value))}
          />

          <div>ชื่อลูกค้า</div>
          <input
            type="text"
            value={customerName}
            onChange={(e) => setCustomerName(e.target.value)}
          />

          <div>เบอร์โทรศัพท์</div>
          <input
            type="text"
            value={customerPhone}
            onChange={(e) => setCustomerPhone(e.target.value)}
          />

          <div>ที่อยู่</div>
          <input
            type="text"
            value={customerAddress}
            onChange={(e) => setCustomerAddress(e.target.value)}
          />

          <div>หมายเหตุ</div>
          <input
            type="text"
            value={remark}
            onChange={(e) => setRemark(e.target.value)}
          />

          <div className="mt-2">
            <button className="btn" onClick={handleSave}>
              <i className="fa-solid fa-save mr-2"></i>
              บันทึก
            </button>
          </div>
        </Modal>
      </div>
    </>
  );
}
