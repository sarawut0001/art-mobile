"use client";

import { useEffect, useState } from "react";
import Swal from "sweetalert2";
import { config } from "@/app/config";
import axios from "axios";

export default function Page() {
  const [serial, setSeraial] = useState("");
  const [price, setPrice] = useState(0);
  const [sells, setSells] = useState([]);
  // const [id, setId] = useState(0)
  const [totalAmount, setTotalAmount] = useState(0);

  useEffect(() => {
    getSells();
  }, []);

  const getSells = async () => {
    try {
      const response = await axios.get(`${config.apiUrl}/sell/list`);
      setSells(response.data);

      let total = 0;
      for (let i = 0; i < response.data.length; i++) {
        total += response.data[i].price;
      }
      setTotalAmount(total);

      // eslint-disable-next-line @typescript-eslint/no-explicit-any
    } catch (error: any) {
      Swal.fire({
        icon: "error",
        title: "เกิดข้อผิดพลาด",
        text: error.message,
      });
    }
  };

  const handleSave = async () => {
    try {
      const payload = { serial, price };

      await axios.post(`${config.apiUrl}/sell/create`, payload);

      getSells();
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
    } catch (error: any) {
      Swal.fire({
        icon: "error",
        title: "",
        text: error.message,
      });
    }
  };

  const handleDelete = async (id: number) => {
    try {
      const button = await Swal.fire({
        text: "ลบรายการนี้หรือไม่",
        title: "ต้องการลบรายการนี้หรือไม่",
        icon: "question",
        showCancelButton: true,
        showConfirmButton: true,
      });

      if (button.isConfirmed) {
        await axios.delete(`${config.apiUrl}/sell/remove/${id}`);
        getSells();
      }

      // eslint-disable-next-line @typescript-eslint/no-explicit-any
    } catch (error: any) {
      Swal.fire({
        icon: "error",
        title: "",
        text: error.message,
      });
    }
  };

  const handleConfirm = async () => {
    try {
      const button = await Swal.fire({
        text: "ยืนยันการขายหรือไม่",
        title: "ยืนยันการขาย",
        icon: "question",
        showCancelButton: true,
        showConfirmButton: true,
      });

      if (button.isConfirmed) {
        await axios.get(`${config.apiUrl}/sell/confirm`);
        getSells();
      }
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
    } catch (error: any) {
      Swal.fire({
        icon: "error",
        title: "",
        text: error.message,
      });
    }
  };

  return (
    <div>
      <div className="content-header">ขายสินค้า</div>
      <div className="flex gap-2 items-end">
        <div className="w-full">
          <div>Serial</div>
          <input
            className="form-control"
            type="text"
            onChange={(e) => setSeraial(e.target.value)}
          />
        </div>
        <div className="text-right">
          <div>ราคา</div>
          <input
            className="form-control"
            type="number"
            onChange={(e) => setPrice(Number(e.target.value))}
          />
        </div>

        <button className="btn flex items-center" onClick={handleSave}>
          <i className="fa-solid fa-save mr-2"></i>
          บันทึก
        </button>
      </div>

      <table className="table mt-5">
        <thead>
          <tr>
            <th className="text-left">serial</th>
            <th className="text-left">รายการสินค้า</th>
            <th className="text-right pr-0">ราคา</th>
            <th className="w-[110px]"></th>
          </tr>
        </thead>
        <tbody>
          {/* eslint-disable-next-line @typescript-eslint/no-explicit-any  */}
          {sells.map((item: any) => (
            <tr key={item.id}>
              <td>{item.product.serial}</td>
              <td>{item.product.name}</td>
              <td className="text-right">{item.price.toLocaleString()}</td>
              <td className="text-center">
                <button
                  className="btn-delete"
                  onClick={() => handleDelete(item.id)}
                >
                  <i className="fa-solid fa-trash-alt"></i>
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      {sells.length > 0 && (
        <>
          <div className="mt-5 flex justify-between">
            <div>ยอดรวมทั้งหมด</div>
            <div className="text-right font-bold bg-gray-300 px-4 py-2 rounded-md">
              {totalAmount.toLocaleString()}
            </div>
          </div>

          <div className="mt-5 text-center">
            <button className="btn" onClick={handleConfirm}>
              <i className="fa-solid fa-check mr-2"></i>
              ยืนยันการขาย
            </button>
          </div>
        </>
      )}
    </div>
  );
}
