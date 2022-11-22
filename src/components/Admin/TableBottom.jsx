import React from 'react'

export default function TableBottom({ resetOrder, resetFilters, table }) {
    return (
        <div className=" flex mt-10 items-center "/* style={{ width: table.getCenterTotalSize() ? table.getCenterTotalSize() : 'auto'  }} */>
            <button onClick={() => resetOrder()} className="bg-blue-800 p-2 h-min mr-2 rounded-xl">
                Reset Column Order
            </button>
            <button onClick={() => resetFilters()} className="bg-blue-800 p-2 h-min mr-2 rounded-xl">
                Reset Filter
            </button>
            <div className="flex items-center mx-auto justify-center font-bold text-[18px]">
                <button
                    className="cursor-pointer border h-min p-1 tanstack-table-hook-pg-navigation-btn"
                    onClick={() => table.setPageIndex(0)}
                    disabled={!table.getCanPreviousPage()}>
                    {"<<"}
                </button>
                <button
                    className="cursor-pointer h-min p-1 border tanstack-table-hook-pg-navigation-btn"
                    onClick={() => table.previousPage()}
                    disabled={!table.getCanPreviousPage()}>
                    {"<"}
                </button>
                <button
                    className="cursor-pointer h-min p-1 border tanstack-table-hook-pg-navigation-btn"
                    onClick={() => table.nextPage()}
                    disabled={!table.getCanNextPage()}>
                    {">"}
                </button>
                <button
                    className="cursor-pointer h-min p-1 border tanstack-table-hook-pg-navigation-btn"
                    onClick={() => table.setPageIndex(table.getPageCount() - 1)}
                    disabled={!table.getCanNextPage()}>
                    {">>"}
                </button>
                <span className="flex text-white mx-2">
          <div className="mr-1">Page</div>
          <strong>
            {table.getState().pagination.pageIndex + 1} sur{" "}
              {table.getPageCount()}
          </strong>
        </span>
                <span className="d-flex text-dark">
          <span style={{ whiteSpace: "nowrap" }} className="me-1">
            | Aller à la page:
          </span>
          <input
              type="number"
              defaultValue={table.getState().pagination.pageIndex + 1}
              onChange={(e) => {
                  const page = e.target.value ? Number(e.target.value) - 1 : 0;
                  table.setPageIndex(page);
              }}
              className="form-control ps-2 me-1 bg-transparent border-b-2 w-16 ml-4"
          />
        </span>
                <select
                    className="border-b-2 bg-transparent ml-10"
                    value={table.getState().pagination.pageSize}
                    onChange={(e) => {
                        table.setPageSize(Number(e.target.value));
                    }}>
                    {[10, 20, 30, 40, 50].map((pageSize) => (
                        <option key={pageSize} value={pageSize}>
                            Show {pageSize}
                        </option>
                    ))}
                </select>
            </div>
        </div>
    );
}
