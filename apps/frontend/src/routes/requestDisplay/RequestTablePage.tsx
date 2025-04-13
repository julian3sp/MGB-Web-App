import { trpc } from '../../lib/trpc.ts';
import DepartmentRoutes from '../departmentDirectory/DepartmentRoutes.tsx';
import DepartmentList from '../../components/DepartmentList.ts';
import { NavLink } from 'react-router-dom';
import { useState } from 'react';

type ServiceRequest = {
    request_id: number;
    name: string;
    email: string;
    phone_num: string;
    room_num: number;
    request_type: string;
    request_date: string;
    employee_id: string;
    additional_comments: string | null;
    assigned_employee: string | null;
    language: string | null;
};

function formatPhoneNumber(phone: string): string {
    // Get rid of all non numbers
    const digits = phone.replace(/\D/g, '');

    if (digits.length !== 10) return phone; // if not 10 numbers just return original string

    const start = digits.slice(0, 3);
    const middle = digits.slice(3, 6);
    const end = digits.slice(6, 10);

    return `(${start}) ${middle}-${end}`;
}

export default function RequestTablePage() {
    const { data, isLoading, error } = trpc.requestList.useQuery();
    const [selectedRequest, setSelectedRequest] = useState<ServiceRequest | null>(null);
    if (isLoading) return <p>Loading...</p>;
    if (error) return <p>Error: {error.message}</p>;

    return (
        <nav className="flex flex-1">
            <nav className="w-full min-h-[85vh] bg-white p-6 font-[Poppins]"  style={{
                borderTop: '2px solid #d9d9d9',
                borderBottom: '2px solid #005E64',
                borderRight: 'none',
                borderLeft: 'none'
            }}>

            {data && data.length > 0 ? (
                <div className="relative flex flex-col w-full overflow-scroll text-gray-700 bg-white bg-clip-border rounded-xl rounded-lg overflow-hidden  border border-gray-300">
                <table className="w-full text-left table-auto min-w-max w-fit">
                    <thead className="bg-gray-200">
                        <tr>
                            <th className="p-4 border-b border-gray-300">
                                    <h3 className="block text-lg font-semibold font-[Poppins]" style={{ color: '#005E64'}}>
                                        Request ID
                                    </h3>
                            </th>
                            <th className="p-4 border-b border-gray-300">
                                <h3 className="block text-lg font-semibold font-[Poppins]" style={{ color: '#005E64'}}>
                                    Request Type
                                </h3>
                            </th>
                            <th className="p-4 border-b border-gray-300">
                                <h3 className="block text-lg font-semibold font-[Poppins]" style={{ color: '#005E64'}}>
                                    Request Date
                                </h3>
                            </th>
                            <th className="p-4 border-b border-gray-300">
                                <p className="block font-bold font-[Poppins] text-sm text-blue-gray-900">
                                    <h3 className="block text-lg font-semibold font-[Poppins]" style={{ color: '#005E64'}}>
                                        Name (Employee ID)
                                    </h3>
                                </p>
                            </th>
                            <th className="p-4 border-b border-gray-300">
                                <h3 className="block text-lg font-semibold font-[Poppins]" style={{ color: '#005E64'}}>
                                    Language
                                </h3>
                            </th>
                            <th className="p-4 border-b border-gray-300">
                                <h3 className="block text-lg font-semibold font-[Poppins]" style={{ color: '#005E64'}}>
                                    Contact Info
                                </h3>
                            </th>
                            <th className="p-4 border-b border-gray-300">
                                <h3 className="block text-lg font-semibold font-[Poppins]" style={{ color: '#005E64'}}>
                                    Additional Comments
                                </h3>
                            </th>
                        </tr>
                    </thead>
                    <tbody>
                        {data?.map((res) => (
                            <tr key={res.request_id} className="even:bg-gray-100">
                                <td className="p-4">
                                    <p className="block font-[Poppins] text-med text-blue-gray-900">
                                        {res.request_id}
                                    </p>
                                </td>
                                <td className="p-4">
                                    <p className="block font-[Poppins] text-med text-blue-gray-900">
                                        {res.request_type}
                                    </p>
                                </td>
                                <td className="p-4">
                                    <p className="block font-[Poppins] text-med text-blue-gray-900">
                                        {new Date(res.request_date).toLocaleDateString(undefined, {
                                            year: 'numeric',
                                            month: 'long',
                                            day: 'numeric',
                                            hour: 'numeric',
                                            minute: 'numeric',
                                            second: 'numeric',
                                        })}
                                    </p>
                                </td>
                                <td className="p-4">
                                    <p className="block font-[Poppins] text-med text-blue-gray-900">
                                        {res.name} (Employee ID: {res.employee_id})
                                    </p>
                                </td>
                                <td className="p-4">
                                    <p className="block font-[Poppins] text-med text-blue-gray-900">
                                        {res.language}
                                    </p>
                                </td>
                                <td className="p-4">
                                    <p className="block font-[Poppins] text-med text-blue-gray-900">
                                        {res.email}
                                        <br />
                                        {formatPhoneNumber(res.phone_num)}
                                    </p>
                                </td>
                                <td className="p-4">
                                    <p className="block font-[Poppins] text-med text-blue-gray-900">
                                        {res.additional_comments}
                                    </p>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
                </div>
            ) : (
                <nav
                    className="border p-5 rounded-lg flex items-center w-1/3"
                    style={{ borderColor: '#005E64' }}
                >
                    <p className="text-gray-700 font-[Poppins]">No active service requests.</p>
                </nav>
            )}
        </nav>
        </nav>
    );
}
