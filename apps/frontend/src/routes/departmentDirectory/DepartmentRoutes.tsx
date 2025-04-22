import DepartmentPage from "../../components/DepartmentPage.tsx";
import {Routes, Route} from "react-router-dom";

function DepartmentRoutes() {
    return (
        <Routes>
            <Route path="/" element={<p className="text-gray-700 font-[Poppins]">Select a department to view details.</p>} /> {/* Default message */}
            <Route path=":deptId" element={<DepartmentPage />} /> {/* Department page */}
        </Routes>
    );
}

export default DepartmentRoutes;