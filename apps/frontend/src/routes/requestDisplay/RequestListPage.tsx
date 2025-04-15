import {trpc} from "../../lib/trpc.ts";
import DepartmentRoutes from "../departmentDirectory/DepartmentRoutes.tsx";
import DepartmentList from "../../components/DepartmentList.ts";
import {NavLink} from "react-router-dom";
import {useState} from "react";


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

{/*
function formatPhoneNumber(phone: string): string {
    // Get rid of all non numbers
    const digits = phone.replace(/\D/g, '');

    if (digits.length !== 10) return phone; // if not 10 numbers just return original string

    const start = digits.slice(0, 3);
    const middle = digits.slice(3, 6);
    const end = digits.slice(6, 10);

    return `(${start}) ${middle}-${end}`;
}
*/}

export default function RequestListPage(){
    const { data, isLoading, error } = trpc.requestList.useQuery();
    const [selectedRequest, setSelectedRequest] = useState<ServiceRequest | null>(null);
    if (isLoading) return <p>Loading...</p>;
    if (error) return <p>Error: {error.message}</p>;

    return(
        <nav className="flex flex-1 font-[Poppins]">
            <nav className="w-1/3 min-h-[85vh] bg-white p-6 overflow-hidden"  style={{
                borderTop: '2px solid #d9d9d9',
                borderBottom: '2px solid #005E64',
                borderRight: '2px solid #d9d9d9',
                borderLeft: 'none',
            }}>
                <h3 className="text-2xl font-bold mb-4 font-[Poppins]" style={{ color: '#003A96'}}>Select a Request:</h3> {/*Header for list of departments on page*/}

                {data && data.length > 0 ? (
                    data?.map((res) => (
                        <ul key={res.request_id} className="mb-2">
                            <button
                                onClick={() => setSelectedRequest(res)}
                                className={`w-full text-left block p-5 border rounded ${selectedRequest?.request_id == res.request_id 
                                    ? "bg-teal-400 text-blue-900 font-bold font-[Poppins]" : "text-gray-700 hover:bg-gray-100 font-[Poppins]"}` /* Put requests in rounded rectangle boxes*/
                            }
                                style={{ borderColor: '#005E64', borderWidth: '1 px', borderStyle: 'solid' }}
                            >
                                {res.request_id}. {res.request_type} ({res.priority} Priority)
                            </button>
                        </ul>
                    ))
                ) : (
                    <nav className="border p-5 rounded-lg flex items-center"  style={{ borderColor: '#005E64'}}>
                        <p className="text-gray-700 font-[Poppins]">No active service requests.</p>
                    </nav>
                )}
            </nav>

            <div className="h-auto flex-1 bg-white p-6" style={{
                borderTop: '2px solid #d9d9d9',
                borderBottom: '2px solid #005E64',
                borderRight: 'none',
                borderLeft: '2px solid #d9d9d9',
            }}> {/*Border styling*/}
                <h3 className="text-2xl font-bold mb-4 font-[Poppins]" style={{ color: '#003A96'}}>Request Details:</h3>
                {selectedRequest ? (
                    <nav className="border p-6 rounded-lg text-blue-gray-900"  style={{ borderColor: '#005E64'}}>
                        <div>
                            <h2 className="text-xl font-bold border-b pb-2 mb-3" style={{ color: '#003A96'}}>{selectedRequest.request_id}. {selectedRequest.request_type} ({selectedRequest.priority} Priority): </h2>
                            {/*ReqID. Type (Priority)*/}

                            <h3 className="text-lg font-semibold font-[Poppins] py-1" style={{ color: '#005E64'}}>Request Type: </h3>
                            <ul className="list-disc ml-6 mb-3 font-semibold text-blue-gray-900">
                                <p><i>{selectedRequest.request_type}</i></p>
                            </ul>  {/*Request Type*/}

                            <h3 className="text-lg font-semibold font-[Poppins] py-1" style={{ color: '#005E64'}}>Priority: </h3>
                            <ul className="list-disc ml-6 mb-3">
                                <p className={`block font-[Poppins] text-med font-semibold ${
                                    selectedRequest.priority === "Low"
                                        ? "text-green-600"
                                        : selectedRequest.priority === "Medium"
                                            ? "text-yellow-500"
                                            : selectedRequest.priority === "High"
                                                ? "text-red-500"
                                                : selectedRequest.priority === "Emergency"
                                                    ? "text-red-700 underline"
                                                    : "text-blue-gray-900"
                                }`}>
                                    {selectedRequest.priority}
                                </p>
                            </ul>  {/*Priority*/}

                            <h3 className="text-lg font-semibold font-[Poppins] py-1" style={{ color: '#005E64'}}>Status: </h3>
                            <ul className="list-disc ml-6 mb-3">
                                <p className={`block font-[Poppins] text-med ${
                                    selectedRequest.status === "Unassigned"
                                        ? "text-gray-500"
                                        : selectedRequest.status === "Assigned"
                                            ? "text-blue-600"
                                            : selectedRequest.status === "Working"
                                                ? "text-amber-600"
                                                : selectedRequest.status === "Done"
                                                    ? "text-green-600"
                                                    : "text-blue-gray-900"
                                }`}>
                                    {selectedRequest.status}
                                </p>
                            </ul>  {/*Status*/}

                            <h3 className="text-lg font-semibold font-[Poppins] py-1" style={{ color: '#005E64'}}>Request Details: </h3>
                            <ul className="list-disc ml-6 mb-4">
                                <p>
                                    {selectedRequest.sanitation?.cleaningType && (
                                        <>
                                            <span className="underline">Cleaning Type:</span> {selectedRequest.sanitation.cleaningType}{" "}
                                        </>
                                    )}
                                    {selectedRequest.language?.targetLanguage && (
                                        <>
                                            <span className="underline">Target Language:</span> {selectedRequest.language.targetLanguage}{" "}
                                        </>
                                    )}
                                    {selectedRequest.audioVisual?.accommodationType && (
                                        <>
                                            <span className="underline">Accommodation Type:</span> {selectedRequest.audioVisual.accommodationType}{" "}
                                        </>
                                    )}
                                    {selectedRequest.transportation?.transportationType && (
                                        <>
                                            <span className="underline">Transportation Type:</span> {selectedRequest.transportation.transportationType}{" "}
                                        </>
                                    )}
                                    {selectedRequest.security?.accessZones && (
                                        <>
                                            <span className="underline">Access Zones:</span> {selectedRequest.security.accessZones}{" "}
                                        </>
                                    )}
                                    <br />
                                    {selectedRequest.request_type === "Sanitation" && (
                                        <>
                                            <span className="underline">Contaminant:</span>{" "}
                                            {selectedRequest.sanitation?.contaminant?.trim()
                                                ? selectedRequest.sanitation.contaminant
                                                : "N/A"}
                                        </>
                                    )}
                                    {selectedRequest.language?.sourceLanguage && (
                                        <>
                                            <span className="underline">Source Language:</span> {selectedRequest.language.sourceLanguage}
                                        </>
                                    )}
                                    {selectedRequest.request_type === "AudioVisual" && (
                                        <>
                                            <span className="underline">Accommodation Details:</span>{" "}
                                            {selectedRequest.audioVisual?.accommodationDetails?.trim()
                                                ? selectedRequest.audioVisual.accommodationDetails
                                                : "N/A"}
                                        </>
                                    )}
                                    {selectedRequest.transportation?.transportationDestination && (
                                        <>
                                            <span className="underline">Transportation Destination:</span> {selectedRequest.transportation.transportationDestination}{" "}
                                        </>
                                    )}
                                    {selectedRequest.security?.securityIssue && (
                                        <>
                                            <span className="underline">Security Issue:</span> {selectedRequest.security.securityIssue}{" "}
                                        </>
                                    )}

                                </p>
                            </ul> {/*Request Details*/}

                            <h3 className="text-lg font-semibold font-[Poppins] py-1" style={{ color: '#005E64'}}>Additional Comments: </h3>
                            <ul className="list-disc ml-6 mb-4">
                                <p>{selectedRequest.additional_comments?.trim() ? <i>selectedRequest.additional_comments</i> : "N/A"}</p>
                            </ul> {/*Additional comments*/}

                            <h3 className="text-lg font-semibold font-[Poppins] py-1" style={{ color: '#005E64'}}>Location: </h3>
                            <ul className="list-disc ml-6 mb-3">
                                <p>{selectedRequest.location}</p>
                            </ul> {/*Location*/}

                            <h3 className="text-lg font-semibold font-[Poppins] py-1" style={{ color: '#005E64'}}>Department: </h3>
                            <ul className="list-disc ml-6 mb-3">
                                <p>{selectedRequest.department}</p>
                            </ul> {/*Department*/}

                            <h3 className="text-lg font-semibold font-[Poppins] py-1" style={{ color: '#005E64'}}>Name: </h3>
                            <ul className="list-disc ml-6 mb-3">
                                <p>{selectedRequest.name} (Employee ID: {selectedRequest.employee_id})</p>
                            </ul>  {/*Name (Employee ID: #)*/}

                            <h3 className="text-lg font-semibold font-[Poppins] py-1" style={{ color: '#005E64'}}>Request Date: </h3>
                            <ul className="list-disc ml-6 mb-4">
                                <p>{new Date(selectedRequest.request_date).toLocaleDateString(undefined, {
                                    year: 'numeric',
                                    month: 'long',
                                    day: 'numeric',
                                    hour: 'numeric',
                                    minute: 'numeric',
                                    second: 'numeric',
                                })} (Request ID: {selectedRequest.request_id})</p>
                            </ul> {/*MONTH DAY, YEAR at HOUR:MINUTE:SECOND AM/PM (Request ID: #)*/}

                            <h3 className="text-lg font-semibold font-[Poppins] py-1" style={{ color: '#005E64'}}>Request ID: </h3>
                            <ul className="list-disc ml-6 mb-3">
                                <p>#{selectedRequest.request_id}</p>
                            </ul> {/*Request ID*/}

                        </div>
                    </nav>
                ) : (
                    <div className="flex-1" style={{ borderColor: '#005E64'}}>
                        <nav className="border p-5 rounded-lg flex items-center"  style={{ borderColor: '#005E64'}}>
                            <p className="text-gray-700 font-[Poppins]">Select a service request to view details.</p>
                        </nav>
                    </div>
                )} {/*No service selected yet*/}
            </div>
        </nav>
    )
}