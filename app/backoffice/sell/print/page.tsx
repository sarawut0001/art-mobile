"use client";

import { config } from "@/app/config";
import axios from "axios";
import dayjs from "dayjs";
import { useSearchParams } from "next/navigation";
import { useEffect, useState } from "react";

export default function Page() {
  const searchParams = useSearchParams();
  const id = searchParams.get("id");
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const [sell, setSell] = useState<any>(null);

  useEffect(() => {
    getSell();
  }, []);

  const getSell = async (): Promise<void> => {
    const res = await axios.get(`${config.apiUrl}/sell/info/${id}`);
    setSell(res.data);
    printDocument();
  };

  const printDocument = () => {
    const style = document.createElement("style");
    style.textContent = `
        @media print {
        body * {
        visibility: hidden;
        }
        #print-content,
        #print-content * {
        visibility: visible;
        }
        #print-content {
        position: absolute;
        left: 0;
        top: 0;
        width: 80mm;
        height: 100%;
        }
        .content-header {
        display: none;
        }
        }
        `;

    document.head.appendChild(style);

    setTimeout(() => {
      window.print();
    }, 300);
  };

  return (
    <div>
      <div className="content-header flex justify-between">
        <div>พิมพ์บิล</div>
        <div>
          <button className="btn btn-primary text-xl" onClick={printDocument}>
            <i className="fa-solid fa-print mr-3"></i>
            พิมพ์บิล
          </button>
        </div>
      </div>

      <div id="print-content">
        <div className="text-2xl font-bold text-center">ใบเสร็จรับเงิน</div>
        <div className="text-left">
          วันที่ {dayjs(sell?.payDate).format("DD/MM/YYYY")}
        </div>
        <div className="text-left">รายการ: {sell?.product.name}</div>
        <div className="text-left">ราคา: {sell?.price.toLocaleString()}</div>
        <div className="text-left">
          วันที่ออกบิล: {dayjs(sell?.payDate).format("DD/MM/YYYY")}
        </div>
      </div>
    </div>
  );
}
