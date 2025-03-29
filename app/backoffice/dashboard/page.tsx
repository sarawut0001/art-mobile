"use client";

import { useEffect, useState } from "react";
import {
  Bar,
  BarChart,
  CartesianGrid,
  Legend,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from "recharts";
import { config } from "@/app/config";
import Swal from "sweetalert2";
import axios from "axios";

export default function Dashboard() {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const [data, setData] = useState<any[]>([]);
  const [totalIncome, setTotalIncome] = useState(0);
  const [totalRepair, setTotalRepair] = useState(0);
  const [totalSale, setTotalSale] = useState(0);
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const [listYears, setListYears] = useState<any[]>([]);
  const [currentYear, setCurrentYear] = useState(new Date().getFullYear());

  useEffect(() => {
    const prevYear = new Date().getFullYear() - 5;
    const years = Array.from({ length: 6 }, (_, index) => prevYear + index);
    setListYears(years);

    getDashboard();
    renderChart();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const getDashboard = async () => {
    try {
      const res = await axios.get(
        `${config.apiUrl}/sell/dashboard/${currentYear}`
      );
      setTotalIncome(res.data.totalIncome);
      setTotalRepair(res.data.totalRepair);
      setTotalSale(res.data.totalSale);

      // eslint-disable-next-line @typescript-eslint/no-explicit-any
    } catch (error: any) {
      Swal.fire({
        icon: "error",
        title: "",
        text: error.message,
      });
    }
  };

  const renderChart = () => {
    const mounths = [
      "มกราคม",
      "กุมภาพันธ์",
      "มีนาคม",
      "เมษายน",
      "พฤษภาคม",
      "มิถุนายน",
      "กรกฏาคม",
      "สิงหาคม",
      "กันยายน",
      "ตุลาคม",
      "พฤศจิกายน",
      "ธันวาคม",
    ];

    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    const data = mounths.map((mounth, index) => ({
      name: mounth,
      income: Math.floor(Math.random() * 10000),
    }));

    setData(data);
  };

  const box = (color: string, title: string, value: string) => {
    return (
      <div
        className={`flex flex-col gap-4 items-end w-full ${color} p-4 rounded-lg text-white`}
      >
        <div className="text-2xl font-bold">{title}</div>
        <div className="text-2xl font-bold">{value}</div>
      </div>
    );
  };

  return (
    <div>
      <h1 className="content-header">Dashboard</h1>

      <div className="flex gap-4 mb-3 items-center">
        <div className="w-[50px] text-right">เลือกปี</div>
        <select
          value={currentYear}
          onChange={(e) => setCurrentYear(parseInt(e.target.value))}
          className="form-control"
          style={{ width: "200px" }}
        >
          {listYears.map((year, index) => (
            <option key={index} value={year}>
              {year}
            </option>
          ))}
        </select>

        <button
          className="btn flex items-center w-[160px]"
          onClick={() => {
            getDashboard();
            renderChart();
          }}
        >
          <i className="fa-solid fa-magnifying-glass mr-3"></i>
          แสดงรายการ
        </button>
      </div>

      <div className="flex gap-4">
        {box(
          "bg-purple-600",
          "ยอดขายทั้งหมด",
          (totalIncome === null ? 0 : totalIncome.toLocaleString()) +
            " " +
            "บาท"
        )}
        {box(
          "bg-orange-500",
          "งานรับซ่อม",
          totalRepair.toLocaleString() + " " + "งาน"
        )}
        {box(
          "bg-blue-500",
          "รายการขาย",
          totalSale.toLocaleString() + " " + "รายการ"
        )}
      </div>

      <div className="text-center mb-4 mt-5 text-xl font-bold">
        รายได้แต่ละเดือน
      </div>
      <div style={{ width: "100%", height: 400 }}>
        <ResponsiveContainer>
          <BarChart data={data}>
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="name" />
            <YAxis />
            <Tooltip
              formatter={(value: number) =>
                `รายได้ ${value.toLocaleString()} บาท`
              }
            />
            <Legend />
            <Bar dataKey="income" fill="teal" opacity={0.5} />
          </BarChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
}
