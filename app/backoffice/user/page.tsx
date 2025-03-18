"use client";

import axios from "axios";
import { useEffect, useState } from "react";
import Swal from "sweetalert2";
import { config } from "@/app/config";

export default function UserPage() {
  const [users, setUsers] = useState([]);
  //   const [id, setId] = useState("");
  //   const [name, setName] = useState("");
  //   const [username, setUsername] = useState("");
  //   const [password, setPassword] = useState("");
  //   const [level, setLevel] = useState("");
  //   const [levelList, setLevelList] = useState("");
  //   const [isShowModal, setIsShowModal] = useState(false);

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

  //   const handleOpenModal = () => {
  //     setIsShowModal(true);
  //   };

  //   const handleCloseModal = () => {
  //     setIsShowModal(false);
  //   };
  return (
    <>
      <h1 className="content-header">ผู้ใช้งาน</h1>

      <div>
        <button className="btn">
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
                  <button className="btn-edit mr-1">
                    <i className="fa-solid fa-pen"></i>
                  </button>
                  <button className="btn-delete">
                    <i className="fa-solid fa-trash"></i>
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </>
  );
}
