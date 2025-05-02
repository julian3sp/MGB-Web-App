import DepartmentPage from "@/components/UI/DepartmentPage.tsx";
import {Routes, Route} from "react-router-dom";

function DepartmentRoutes() {
    return (
        <Routes>
            <Route path="/" element={<nav
                className="border p-5 rounded-sm flex shadow-md items-center"
                style={{ borderColor: 'lightgrey' }}
            >
                <p className="text-gray-700 font-[Poppins] ">
                    Select a department to view details.
                </p>
            </nav> } /> {/* Default message */}
            <Route path=":deptId" element={<DepartmentPage />} /> {/* Department page */}
        </Routes>
    );
}

export default DepartmentRoutes;