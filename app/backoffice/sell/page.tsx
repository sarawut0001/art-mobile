"use client";

import { useEffect, useState } from "react";
import Swal from "sweetalert2";
import { config } from "@/app/config";
import axios from "axios";

export default function Page() {
  const [serial, setSeraial] = useState("");
  const [price, setPrice] = useState(0);

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = () => {};

  const handleSave = async () => {
    try {
      const payload = { serial, price };

      await axios.post(`${config.apiUrl}/sell/create`, payload);

      fetchData();
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
    </div>
  );
}
