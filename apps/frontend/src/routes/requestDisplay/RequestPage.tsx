import { NavLink , Outlet} from 'react-router-dom';
import RequestTablePage from './RequestTablePage.tsx';
import RequestListPage from "./RequestListPage.tsx";

export default function RequestPage() {
    return (
        <div className="bg-white p-0.4 border font-[Poppins] py-4"  style={{ borderColor: '#005E64', borderWidth: '4px', borderStyle: 'solid' }}>
            <h1 className="text-3xl font-bold mb-4 font-[Poppins] w-full text-center" style={{ color: '#003A96' }}>
                Service Requests:
            </h1>

            <div className="flex gap-4 justify-center">
                <NavLink
                    to="table"
                    className={({ isActive }) =>
                        `block p-2 border rounded ${isActive ? "bg-teal-400 text-blue-900 font-bold font-[Poppins]" : "text-gray-700 hover:bg-gray-100 font-[Poppins]"}`
                    }>
                    Table View
                </NavLink>
                <NavLink
                    to="list"
                    className={({ isActive }) =>
                        `block p-2 border rounded ${isActive ? "bg-teal-400 text-blue-900 font-bold font-[Poppins]" : "text-gray-700 hover:bg-gray-100 font-[Poppins]"}`
                    }>
                    List View
                </NavLink>
            </div>
            <div className="py-1">
                <Outlet />
            </div>

        </div>
    );
}
