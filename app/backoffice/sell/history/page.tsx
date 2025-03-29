"use client";

import { config } from "@/app/config";
import axios from "axios";
import dayjs from "dayjs";
// import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import Swal from "sweetalert2";

export default function Page() {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const [sellList, setSellList] = useState<any[]>([]);
  // const rounter = useRouter();

  useEffect(() => {
    getSellList();
  }, []);

  const getSellList = async () => {
    try {
      const res = await axios.get(`${config.apiUrl}/sell/history`);
      setSellList(res.data);
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
      <div className="content-header">
        <div>ประวัดิการขาย</div>
      </div>

      <table className="table table-bordered">
        <thead>
          <tr>
            <th className="text-left w-[120px]">วันที่</th>
            <th className="text-left">รายการ</th>
            <th className="text-left w-[120px]">ราคา</th>
            <th className="text-left w-[140ยป]">พิมพ์บิล</th>
          </tr>
        </thead>
        <tbody>
          {/* eslint-disable-next-line @typescript-eslint/no-explicit-any  */}
          {sellList.map((item: any, index: number) => (
            <tr key={index}>
              <td>{dayjs(item.payDate).format("DD/MM/YYYY")}</td>
              <td>{item.product.name}</td>
              <td className="text-right">{item.price.toLocaleString()}</td>
              <td className="text-center">
                <a
                  target="_blank"
                  className="btn btn-sm btn-primary"
                  href={`/backoffice/sell/print?id=${item.id}`}
                >
                  <i className="fa-soid fa-print mr-2"></i>
                  พิมพ์
                </a>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
