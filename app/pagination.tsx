"use client";

interface ModalProps {
  totalRows: number;
  page: number;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  setPage: any;
  totalPage: number;
}

export default function Pagination({
  totalRows,
  page,
  setPage,
  totalPage,
}: ModalProps) {
  return (
    <div className="mt-5">
      <div>รายการทั้งหมด {totalRows}</div>
      <div>
        หน้า {page} จาก {totalPage}
      </div>
      <div className="flex gap-1">
        <button
          className={page <= 1 ? "btn-disbled" : "btn"}
          onClick={() => setPage(1)}
        >
          <i className="fa-solid fa-caret-left mr-2"></i>
          หน้าแรก
        </button>
        <button
          className={page <= 1 ? "btn-disbled" : "btn"}
          onClick={() => setPage(page - 1)}
          disabled={page <= 1 ? true : false}
        >
          <i className="fa-solid fa-caret-left"></i>
        </button>
        {Array.from({ length: totalPage }, (_, i) => (
          <button
            className={`btn ${i + 1 === page ? "btn-active" : ""}`}
            onClick={() => setPage(i + 1)}
            key={i}
          >
            {i + 1}
          </button>
        ))}
        <button
          className={page >= totalPage ? "btn-disbled" : "btn"}
          onClick={() => setPage(page + 1)}
          disabled={page >= totalPage ? true : false}
        >
          <i className="fa-solid fa-caret-right"></i>
        </button>
        <button
          className={page >= totalPage ? "btn-disbled" : "btn"}
          onClick={() => setPage(totalPage)}
        >
          หน้าสุดท้าย
          <i className="fa-solid fa-caret-right ml-2"></i>
        </button>
      </div>
    </div>
  );
}
