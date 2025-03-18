"use client";

import { useEffect, useState } from "react";
import Modal from "./../modal";
import Swal from "sweetalert2";
import axios from "axios";
import { config } from "@/app/config";
import dayjs from "dayjs";

export default function Page() {
  const [isShowModal, setIsShowModal] = useState(false);
  const [name, setName] = useState("");
  const [price, setPrice] = useState(0);
  const [remark, setRemark] = useState("");
  const [id, setId] = useState("");
  const [repairs, setRepairs] = useState([]);

  useEffect(() => {
    getServices();
  }, []);

  const getServices = async () => {
    try {
      const res = await axios.get(`${config.apiUrl}/service/list`);
      setRepairs(res.data);

      // eslint-disable-next-line @typescript-eslint/no-explicit-any
    } catch (error: any) {
      Swal.fire({
        icon: "error",
        title: "ผิดพลาด",
        text: error.message,
      });
    }
  };

  const handleOpenModal = () => {
    setIsShowModal(true);
  };

  const handleCloseModal = () => {
    setIsShowModal(false);
  };

  const handleSave = async () => {
    try {
      const payload = { name, price, remark };

      if (id !== "") {
        await axios.put(`${config.apiUrl}/service/update/${id}`, payload);
      } else {
        await axios.post(`${config.apiUrl}/service/create`, payload);
      }

      handleClearForm();
      handleCloseModal();

      getServices();
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
    } catch (error: any) {
      Swal.fire({
        icon: "error",
        title: "ผิดพลาด",
        text: error.message,
      });
    }
  };

  const handleClearForm = () => {
    setName("");
    setPrice(0);
    setRemark("");
  };

  const handleDelete = async (id: number) => {
    try {
      const button = await Swal.fire({
        icon: "question",
        title: "ต้องการลบข้อมูลนี้ใช่หรือไม่",
        showCancelButton: true,
        showConfirmButton: true,
      });

      if (button.isConfirmed) {
        await axios.delete(`${config.apiUrl}/service/remove/${id}`);
        getServices();
      }
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
    } catch (error: any) {
      Swal.fire({
        icon: "error",
        title: "ผิดพลาด",
        text: error.message,
      });
    }
  };

  const handleEdit = async (id: number) => {
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const repair = repairs.find((repair: any) => repair.id === id) as any;

    if (repair) {
      setId(repair.id);
      setName(repair.name);
      setPrice(repair.price);
      setRemark(repair.remark);

      handleOpenModal();
    }
  };

  return (
    <div>
      <h1 className="content-header">งานบริการ</h1>

      <div>
        <button className="btn" onClick={handleOpenModal}>
          <i className="fa-solid fa-plus mr-2"></i>
          บันทึกงานบริการ
        </button>
      </div>

      <table className="table mt-5">
        <thead>
          <tr>
            <th className="text-left">ชื่องานบริการ</th>
            <th className="text-right">ราคา</th>
            <th className="text-left">หมายเหตุ</th>
            <th className="text-left">วันที่บันทึก</th>
            <th className="w-[120px]"></th>
          </tr>
        </thead>

        <tbody>
          {/* eslint-disable-next-line @typescript-eslint/no-explicit-any  */}
          {repairs.map((item: any) => (
            <tr key={item.id}>
              <td>{item.name}</td>
              <td className="text-right">{item.price.toLocaleString()}</td>
              <td>{item.remark}</td>
              <td>{dayjs(item.payDate).format("DD/MM/YYYY")}</td>
              <td className="text-center">
                <button
                  className="btn-edit mr-1"
                  onClick={() => handleEdit(item.id)}
                >
                  <i className="fa-solid fa-pen"></i>
                </button>
                <button
                  className="btn-delete"
                  onClick={() => {
                    handleDelete(item.id);
                  }}
                >
                  <i className="fa-solid fa-trash"></i>
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      <Modal
        isOpen={isShowModal}
        title="งานบันทึกบริการ"
        onClose={handleCloseModal}
      >
        <div>
          <div>ชื่องานบริการ</div>
          <input
            type="text"
            value={name}
            onChange={(e) => setName(e.target.value)}
          />
        </div>
        <div className="mt-4">ราคา</div>
        <input
          type="number"
          value={price}
          onChange={(e) => setPrice(Number(e.target.value))}
        />
        <div className="mt-4">หมายเหตุ</div>
        <input
          type="text"
          value={remark}
          onChange={(e) => setRemark(e.target.value)}
        />

        <div className="mt-4">
          <button className="btn" onClick={handleSave}>
            <i className="fa-solid fa-save mr-2"></i>
            บันทึก
          </button>
        </div>
      </Modal>
    </div>
  );
}
