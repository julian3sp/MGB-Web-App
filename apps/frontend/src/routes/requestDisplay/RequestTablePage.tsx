import { trpc } from '../../lib/trpc.ts';
import DepartmentRoutes from '../departmentDirectory/DepartmentRoutes.tsx';
import DepartmentList from '../../components/DepartmentList.ts';
import { NavLink } from 'react-router-dom';
import { useState } from 'react';

type ServiceRequest = {
    request_id: number;
    name: string;
    request_type: string;
    request_date: string;
    status: string;
    location: string;
    priority: string;
    department: string;
    employee_id: string | null;
    additional_comments: string | null;
    assigned_employee: string | null;
    language: string | null;
    cleaningType: string | null;
};

// function formatPhoneNumber(phone: string): string {
//     // Get rid of all non numbers
//     const digits = phone.replace(/\D/g, '');
//
//     if (digits.length !== 10) return phone; // if not 10 numbers just return original string
//
//     const start = digits.slice(0, 3);
//     const middle = digits.slice(3, 6);
//     const end = digits.slice(6, 10);
//
//     return `(${start}) ${middle}-${end}`;
// }

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
                            <th className="p-4 border-b border-gray-300 whitespace=normal break-words max-w-[75px]">
                                    <h3 className="block text-lg font-semibold font-[Poppins]" style={{ color: '#003A96' }}>
                                        Request ID
                                    </h3>
                            </th>

                            <th className="p-4 border-b border-gray-300 whitespace=normal break-words max-w-[75px]">
                                <h3 className="block text-lg font-semibold font-[Poppins]" style={{ color: '#003A96' }}>
                                    Priority
                                </h3>
                            </th>

                            <th className="p-4 border-b border-gray-300 whitespace=normal break-words max-w-[75px]">
                                <h3 className="block text-lg font-semibold font-[Poppins]" style={{ color: '#003A96' }}>
                                    Request Type
                                </h3>
                            </th>

                            <th className="p-4 border-b border-gray-300 whitespace=normal break-words max-w-[150px]">
                                <h3 className="block text-lg font-semibold font-[Poppins]" style={{ color: '#003A96' }}>
                                    Request Details
                                </h3>
                            </th>

                            <th className="p-4 border-b border-gray-300 whitespace=normal break-words max-w-[50px]">
                                <h3 className="block text-lg font-semibold font-[Poppins]" style={{ color: '#003A96' }}>
                                    Location
                                </h3>
                            </th>

                            <th className="p-4 border-b border-gray-300 whitespace=normal break-words max-w-[50px]">
                                <h3 className="block text-lg font-semibold font-[Poppins]" style={{ color: '#003A96' }}>
                                    Department
                                </h3>
                            </th>

                            <th className="p-4 border-b border-gray-300 whitespace=normal break-words max-w-[150px]">
                                <p className="block font-bold font-[Poppins] text-sm text-blue-gray-900">
                                    <h3 className="block text-lg font-semibold font-[Poppins]" style={{ color: '#003A96' }}>
                                        Name (Employee ID)
                                    </h3>
                                </p>
                            </th>

                            <th className="p-4 border-b border-gray-300 whitespace=normal break-words max-w-[100px]">
                                <h3 className="block text-lg font-semibold font-[Poppins]" style={{ color: '#003A96' }}>
                                    Request Date
                                </h3>
                            </th>

                            <th className="p-4 border-b border-gray-300 whitespace=normal break-words max-w-[50px]">
                                <h3 className="block text-lg font-semibold font-[Poppins]" style={{ color: '#003A96' }}>
                                    Additional Comments
                                </h3>
                            </th>

                            <th className="p-4 border-b border-gray-300 whitespace=normal break-words max-w-[50px]">
                                <h3 className="block text-lg font-semibold font-[Poppins]" style={{ color: '#003A96' }}>
                                    Status
                                </h3>
                            </th>

                        </tr>
                    </thead>
                    <tbody>
                        {data?.map((res) => (
                            <tr key={res.request_id} className="even:bg-gray-100">

                                <td className="p-4 whitespace=normal break-words max-w-[75px]">
                                    <p className="block font-[Poppins] text-med text-blue-gray-900">
                                        {res.request_id}
                                    </p>
                                </td>

                                <td className="p-4 whitespace=normal break-words max-w-[75px]">
                                    <p className={`block font-[Poppins] text-med font-semibold ${
                                        res.priority === "Low"
                                            ? "text-green-600"
                                            : res.priority === "Medium"
                                                ? "text-yellow-500"
                                                : res.priority === "High"
                                                    ? "text-red-500"
                                                    : res.priority === "Emergency"
                                                        ? "text-red-700 underline"
                                                        : "text-blue-gray-900"
                                    }`}>
                                        {res.priority}
                                    </p>
                                </td>

                                <td className="p-4 whitespace=normal break-words max-w-[100px]">
                                    <p className="block font-[Poppins] text-med text-blue-gray-900 font-semibold">
                                        {res.request_type}
                                    </p>
                                </td>

                                <td className="p-4 whitespace=normal break-words max-w-[150px]">
                                    <div className="font-[Poppins] text-med text-blue-gray-900 space-y-1">
                                        {res.sanitation?.cleaningType && (
                                            <div className="pl-4">
                                                <span className="underline w-45 pl-4"><ul>Cleaning Type:</ul></span>
                                                <p className="pl-4 py-2">{res.sanitation.cleaningType}</p>
                                            </div>
                                        )}
                                        {res.language?.targetLanguage && (
                                            <div className="pl-4">
                                                <span className="underline w-45 pl-4"><ul>Target Language:</ul></span>
                                                <p className="pl-4 py-2">{res.language.targetLanguage}</p>
                                            </div>
                                        )}
                                        {res.audioVisual?.accommodationType && (
                                            <div className="pl-4">
                                                <span className="underline w-45 pl-4"><ul>Accommodation Type:</ul></span>
                                                <p className="pl-4 py-2">{res.audioVisual.accommodationType}</p>
                                            </div>
                                        )}
                                        {res.transportation?.transportationType && (
                                            <div className="pl-4">
                                                <span className="underline w-45 pl-4"><ul>Transportation Type:</ul></span>
                                                <p className="pl-4 py-2">{res.transportation.transportationType}</p>
                                            </div>
                                        )}
                                        {res.security?.accessZones && (
                                            <div className="pl-4">
                                                <span className="underline w-45 pl-4"><ul>Access Zones:</ul></span>
                                                <p className="pl-4 py-2">{res.security.accessZones}</p>
                                            </div>
                                        )}
                                        {res.request_type === "Sanitation" && (
                                            <div className="pl-4">
                                                <span className="underline w-45 pl-4"><ul>Contaminant:</ul></span>
                                                <p className="pl-4 py-2">{res.sanitation?.contaminant?.trim() ? res.sanitation.contaminant : "N/A"}</p>
                                            </div>
                                        )}
                                        {res.language?.sourceLanguage && (
                                            <div className="pl-4">
                                                <span className="underline w-45 pl-4"><ul>Source Language:</ul></span>
                                                <p className="pl-4 py-2">{res.language.sourceLanguage}</p>
                                            </div>
                                        )}
                                        {res.request_type === "AudioVisual" && (
                                            <div className="pl-4">
                                                <span className="underline w-45 pl-4"><ul>Accommodation Details:</ul></span>
                                                <p className="pl-4 py-2">{res.audioVisual?.accommodationDetails?.trim() ? res.audioVisual.accommodationDetails : "N/A"}</p>
                                            </div>
                                        )}
                                        {res.transportation?.transportationDestination && (
                                            <div className="pl-4">
                                                <span className="underline w-45 pl-4"><ul>Transportation Destination:</ul></span>
                                                <p className="pl-4 py-2">{res.transportation.transportationDestination}</p>
                                            </div>
                                        )}
                                        {res.security?.securityIssue && (
                                            <div className="pl-4">
                                                <span className="underline pl-4"><ul>Security Issue:</ul></span>
                                                <p className="pl-4 py-2">{res.security.securityIssue}</p>
                                            </div>
                                        )}
                                    </div> {/*Displays details for specific request types. Fields semibold, spacing consistent with flex & w-35 */}
                                </td>

                                <td className="p-4 whitespace=normal break-words max-w-[150px]">
                                    <p className="block font-[Poppins] text-med text-blue-gray-900">
                                        {res.location}
                                    </p>
                                </td>

                                <td className="p-4 whitespace=normal break-words max-w-[100px]">
                                    <p className="block font-[Poppins] text-med text-blue-gray-900">
                                        {res.department}
                                    </p>
                                </td>

                                <td className="p-4 whitespace=normal break-words max-w-[50px]">
                                    <p className="block font-[Poppins] text-med text-blue-gray-900">
                                        {res.name} ({res.employee_id})
                                    </p>
                                </td>

                                <td className="p-4 whitespace=normal break-words max-w-[50px]">
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

                                <td className="p-4 whitespace=normal break-words max-w-[125px]">
                                    <p className="block font-[Poppins] text-med text-blue-gray-900">
                                        <i>{res.additional_comments}</i>
                                    </p>
                                </td>

                                <td className="p-4 whitespace=normal break-words max-w-[75px]">
                                    <p className={`block font-[Poppins] text-med ${
                                        res.status === "Unassigned"
                                            ? "text-gray-500"
                                            : res.status === "Assigned"
                                                ? "text-blue-600"
                                                : res.status === "Working"
                                                    ? "text-amber-600"
                                                    : res.status === "Done"
                                                        ? "text-green-600"
                                                        : "text-blue-gray-900"
                                    }`}>
                                        {res.status}
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
/*email phone#*/