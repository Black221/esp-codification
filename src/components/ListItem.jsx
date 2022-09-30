import React from "react";

const ListItem = ({chambre, members}) => {

    return(
        <div className="mt-0 w-full flex justify-center">
            <table className="table-auto bg-[rgba(0,0,0,0.3)] border-spacing-3 w-full md:w-auto">
                <thead className="border-b border-gray-400">
                    <tr>
                        <th colSpan="3" className="text-center border-b-2 py-4 text-xl">
                            Chambre {chambre && `${chambre.numero}${chambre.pavillon}`}
                        </th>
                    </tr>
                    <tr>
                        <th scope="col" className="py-3 px-1 md:px-10">Occupants</th>
                        <th scope="col" className="py-3 px-1 md:px-10">Departments</th>
                        <th scope="col" className="py-3 px-1 md:px-10">Classes</th>
                    </tr>
                </thead>
                <tbody className="text-center">
                {members && members.map((member) => (
                    <tr key={member._id} className="border-b border-gray-500">
                        <td className="py-3 px-1 md:px-6">{`${member.prenom} ${member.nom}`}</td>
                        <td className="py-3 px-1 md:px-6">{member.departement}</td>
                        <td className="py-3 px-1 md:px-6">{member.niveau}</td>
                    </tr>
                ))}
                </tbody>
            </table>
        </div>
    )
}

export default ListItem;