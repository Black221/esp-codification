import { flexRender } from "@tanstack/react-table";
import { columnResizeMode } from "./EtudiantList";
import { reorderColumn } from "../../utils/utils";
import Filter from "./Filter";

const ColumnHeader = ({ header, table, dontShowFilters }) => {
    const { getState, setColumnOrder } = table;
    const { columnOrder } = getState();
    const { column } = header;

    const onDrop = (event) => {
        const draggedColumn = JSON.parse(event.dataTransfer.getData("column"));
        if (column.id === "select") return;
        const newColumnOrder = reorderColumn(
            draggedColumn.id,
            column.id,
            columnOrder
        );
        setColumnOrder(newColumnOrder);
    };

    const dragStart = (event) => {
        event.dataTransfer.setData("column", JSON.stringify(column));
    };

    return (
        <th
            colSpan={header.colSpan}
            onDragOver={(e) => e.preventDefault()}
            onDrop={onDrop}
            {...{
                key: header.id,
                style: {
                    width: header.getSize(),
                },
            }}>
            <div className="text-start w-11/12">
                {header.isPlaceholder ? null : (
                    <>
                        <div
                            {...{
                                className: header.column.getCanSort()
                                    ? "cursor-pointer "
                                    : "",
                                onClick:
                                    header.column.getToggleSortingHandler(),
                            }}
                        >
                            <span
                              className="m-2 cursor-grabbing"
                              draggable={header.column.columnDef.id !== "select"}
                              onDragStart={(event) => dragStart(event)}
                            >
                            {flexRender(
                                header.column.columnDef.header,
                                header.getContext()
                            )}
                              {header.column.columnDef.id !== "select" && ""}
                            </span>
                            {
                                ({
                                        asc: " 🔼",
                                        desc: " 🔽",
                                    }[header.column.getIsSorted()] ??
                                    " ")}
                        </div>
                        
                        { /* header.column.getCanFilter() && header.column.id !== "sexe" && header.column.id !== "actions" && !dontShowFilters ? (
                            <div>
                                <Filter column={header.column} table={table} />
                            </div>
                        ) : null */}
                    </>
                )}

                <div
                    {...{
                        onMouseDown: header.getResizeHandler(),
                        onTouchStart: header.getResizeHandler(),
                        className: `resizer ${
                            header.column.getIsResizing() ? "isResizing" : ""
                        }`,
                        style: {
                            transform:
                                columnResizeMode === "onEnd" && header.column.getIsResizing()
                                    ? `translateX(${
                                        table.getState().columnSizingInfo.deltaOffset
                                    }px)`
                                    : "",
                        },
                    }}
                />
            </div>
        </th>
    );
};
export default ColumnHeader;
