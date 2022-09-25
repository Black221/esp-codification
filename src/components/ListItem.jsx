import React from "react";

const ListItem = () => {

    return(
        <div className="mt-0">
            <table className="table-auto bg-[rgba(0,0,0,0.3)] border-spacing-3">
                <thead className="border-b border-gray-400">
                    <th colSpan="3" className="text-center border-b py-4 text-xl">
                        Chambre 6C
                    </th>
                    <tr>
                        <th scope="col" className="py-3 px-10">Occupants</th>
                        <th scope="col" className="py-3 px-10">Departments</th>
                        <th scope="col" className="py-3 px-10">Classes</th>
                    </tr>
                </thead>
                <tbody className="border-b border-gray-400 text-center">
                    <tr>
                        <td className="py-3 px-6">Ndiaye Diop</td>
                        <td className="py-3 px-6">Informatique</td>
                        <td className="py-3 px-6">DIC2</td>
                    </tr>
                </tbody>
            </table>
        </div>
    )
}

export default ListItem;