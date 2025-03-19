"use client";

import axios from "axios";
import { useEffect, useState } from "react";
import Swal from "sweetalert2";
import { config } from "@/app/config";
import Modal from "../modal";

export default function UserPage() {
  const [users, setUsers] = useState([]);
  const [id, setId] = useState("");
  const [name, setName] = useState("");
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [level, setLevel] = useState("");
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const [levelList, setLevelList] = useState(["admin", "user"]);
  const [isShowModal, setIsShowModal] = useState(false);

  useEffect(() => {
    getUsers();
  }, []);

  const getUsers = async () => {
    try {
      const res = await axios.get(`${config.apiUrl}/user/list`);
      setUsers(res.data);
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
    } catch (error: any) {
      Swal.fire({
        icon: "error",
        title: "ผิดพลาด",
        text: error.message,
      });
    }
  };

  const handleSave = async () => {
    try {
      if (password !== confirmPassword) {
        Swal.fire({
          icon: "error",
          title: "ผิดพลาด",
          text: "รหัสผ่านไม่ตรงกัน",
        });
        return;
      }

      const payload = { name, username, password, level };

      if (id === "") {
        await axios.post(`${config.apiUrl}/user/create`, payload);
      } else {
        await axios.put(`${config.apiUrl}/user/update/${id}`, payload);
        setId("");
      }

      getUsers();
      handleCloseModal();
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
    } catch (error: any) {
      Swal.fire({
        icon: "error",
        title: "ผิดพลาด",
        text: error.message,
      });
    }
  };

  const handleEdit = (id: string) => {
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const user = users.find((user: any) => user.id === id) as any;

    setId(user.id);
    setName(user.name);
    setUsername(user.username);
    setLevel(user.level);
    setIsShowModal(true);
  };

  const handleDelete = async (id: string) => {
    try {
      const button = await Swal.fire({
        icon: "question",
        title: "คุณต้องการลบผู้ใช้งานนี้หรือไม่",
        showCancelButton: true,
        showConfirmButton: true,
      });

      if (button.isConfirmed) {
        await axios.delete(`${config.apiUrl}/user/remove/${id}`);
        getUsers();
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

  const handleOpenModal = () => {
    setIsShowModal(true);
  };

  const handleCloseModal = () => {
    setIsShowModal(false);
  };

  return (
    <>
      <h1 className="content-header">ผู้ใช้งาน</h1>

      <div>
        <button className="btn" onClick={handleOpenModal}>
          <i className="fa-solid fa-plus mr-2"></i>
          เพิ่มผู้ใช้งาน
        </button>

        <table className="table mt-5">
          <thead>
            <tr>
              <th className="text-left">ชื่อผู้ใช้งาน</th>
              <th className="text-left">username</th>
              <th className="text-left">level</th>
              <th className="w-[110px]"></th>
            </tr>
          </thead>
          <tbody>
            {/* eslint-disable-next-line @typescript-eslint/no-explicit-any  */}
            {users.map((user: any) => (
              <tr key={user.id}>
                <td>{user.name}</td>
                <td>{user.username}</td>
                <td>{user.level}</td>
                <td className="text-center">
                  <button
                    className="btn-edit mr-1"
                    onClick={() => handleEdit(user.id)}
                  >
                    <i className="fa-solid fa-pen"></i>
                  </button>
                  <button
                    className="btn-delete"
                    onClick={() => handleDelete(user.id)}
                  >
                    <i className="fa-solid fa-trash"></i>
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>

        <Modal
          title="เพิ่มผู้ใช้งาน"
          isOpen={isShowModal}
          onClose={handleCloseModal}
        >
          <div>
            <div>ชื่อผู้ใช้งาน</div>
            <input
              type="text"
              value={name}
              onChange={(e) => setName(e.target.value)}
            />
          </div>

          <div className="mt-4">
            <div>username</div>
            <input
              type="text"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
            />
          </div>

          <div className="mt-4">
            <div>password</div>
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
          </div>

          <div className="mt-4">
            <div>ยืนยัน Password</div>
            <input
              type="password"
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
            />
          </div>

          <div className="mt-4">
            <div>ระดับผู้ใช้งาน</div>
            <select
              className="form-control"
              value={level}
              onChange={(e) => setLevel(e.target.value)}
            >
              {/* eslint-disable-next-line @typescript-eslint/no-explicit-any  */}
              {levelList.map((item: any) => (
                <option key={item} value={item}>
                  {item}
                </option>
              ))}
            </select>
          </div>

          <div className="mt-4" onClick={handleSave}>
            <button className="btn">
              <i className="fa-solid fa-save mr-2"></i>
              เพิ่มผู้ใช้งาน
            </button>
          </div>
        </Modal>
      </div>
    </>
  );
}
