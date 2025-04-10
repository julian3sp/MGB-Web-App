import React from 'react'
import { NavLink } from "react-router-dom";
import DepartmentList from "../components/DepartmentList.ts";
import DepartmentRoutes from "./DepartmentRoutes.tsx";


const DepartmentDirectory = () => {
    return (
            <div className="flex flex-1">
                <nav className="w-1/3 bg-white p-6 border"  style={{ borderColor: '#005E64', borderWidth: '2px', borderStyle: 'solid' }}> {/*Border styling*/}
                    <h2 className="text-2xl font-bold mb-4 font-[Poppins]" style={{ color: '#003A96'}}>Departments:</h2> {/*Header for list of departments on page*/}
                    <ul>
                        {/*key is used to track changes,
                     each department name can be clicked on to display information about the department (li and NavLink),
                     block p-2 ... used to create a rounded rectangle around the departments. entire box is clickable
                     ` (grave key) is used to wrap the line mentioned above, not ' (single quote)
                     the current selected department will be highlighted
                     hovering a department will slightly change the shade of the box
                     "to" line sets the URL to the correct department
                     */}
                        {DepartmentList.map((dept) => (
                            <li key={dept.id} className="mb-2">
                                <NavLink
                                    to={`/directory/${dept.id}`}
                                    className={({ isActive }) =>
                                        `block p-2 border rounded ${isActive ? "bg-teal-400 text-blue-900 font-bold font-[Poppins]" : "text-gray-700 hover:bg-gray-100 font-[Poppins]"}` /* Put departments in rounded rectangle boxes*/
                                    }
                                >
                                    {dept.name}
                                </NavLink>
                            </li>
                        ))}
                    </ul>
                </nav>

                <div className="flex-1 bg-white p-6 border" style={{ borderColor: '#005E64', borderWidth: '2px', borderStyle: 'solid' }}> {/*Border styling*/}
                    <h2 className="text-2xl font-bold mb-4 font-[Poppins]" style={{ color: '#003A96'}}>Department Details:</h2>
                    <DepartmentRoutes />
                </div>
            </div>


    );
}

export default DepartmentDirectory;