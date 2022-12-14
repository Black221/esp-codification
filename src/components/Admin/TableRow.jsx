import React, { Fragment } from "react";
import {isEmpty} from "lodash";

export default function TableRow({
                                     row,
                                     draggable,
                                     flexRender,
                                     renderSubComponent,
                                     nestedTableDataId,
                                     onContextMenu,
                                     table,
                                     rowSelection,
                                     onDrop,
                                 }) {
    const dragStart = (event) => {
        let dragData;
        if (isEmpty(rowSelection)) dragData = [row.original];
        else
            dragData = table
                .getSelectedRowModel()
                .flatRows.map((row) => row.original);

        event.dataTransfer.setData("row", JSON.stringify(dragData));
    };

    const niveau = {
        '5': 'DIC3',
        '4': 'DIC2',
        '3': 'DIC1',
        '2': 'DUT2',
        '1': 'DUT1',
    }
    
    return (
        <Fragment>
            <tr
                {...{
                    onContextMenu: () => onContextMenu && onContextMenu(row),
                }}
                key={row.id}
                onDragOver={(e) => e.preventDefault()}
                onDrop={(e) => {
                    onDrop && onDrop(e, row.original);
                }}
                draggable={draggable}
                onDragStart={(event) => dragStart(event)}
                // onClick={row.getCanExpand() && row.getToggleExpandedHandler()}
            >
                {row.getVisibleCells().map((cell) => (
                    <td
                        {...{
                            key: cell.id,
                            style: {
                                width: cell.column.getSize(),
                            },
                        }}>
                        { flexRender(cell.column.columnDef.cell, cell.getContext()) }
                    </td>
                ))}

            </tr>
            {row.getIsExpanded() && (
                <tr>
                    {/* 2nd row is a custom 1 cell row */}
                    <td colSpan={row.getVisibleCells().length}>
                        {renderSubComponent(row.original[nestedTableDataId])}
                    </td>
                </tr>
            )}
        </Fragment>
    );
}
