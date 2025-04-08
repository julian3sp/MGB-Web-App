import {trpc} from "../lib/trpc.ts";
import DepartmentRoutes from "./DepartmentRoutes.tsx";
import DepartmentList from "../components/DepartmentList.ts";
import {NavLink} from "react-router-dom";
import {useState} from "react";


type ServiceRequest = {
    request_id: number
    name: string
    email: string
    phone_num: string
    room_num: number
    request_type: string
    request_date: string
    employee_id: string
    assigned_employee: string | null
    language: string | null
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

export default function RequestListPage(){
    const { data, isLoading, error } = trpc.requestList.useQuery();
    const [selectedRequest, setSelectedRequest] = useState<ServiceRequest | null>(null);
    if (isLoading) return <p>Loading...</p>;
    if (error) return <p>Error: {error.message}</p>;

    return(
        <nav className="flex flex-1">
            <nav className="w-1/3 bg-white p-4 border font-[Poppins]"  style={{ borderColor: '#005E64', borderWidth: '2px', borderStyle: 'solid' }}>
                <h2 className="text-2xl font-bold mb-4 font-[Poppins]" style={{ color: '#003A96'}}>Service Requests:</h2> {/*Header for list of departments on page*/}

                {data?.map((res) => (
                    <ul key={res.request_id} className="mb-2">
                        <button
                            onClick={() => setSelectedRequest(res)}
                            className={`w-full text-left block p-6 border rounded ${selectedRequest?.request_id == res.request_id
                                ? "bg-teal-400 text-blue-900 font-bold font-[Poppins]" : "text-gray-700 hover:bg-gray-100 font-[Poppins]"}` /* Put requests in rounded rectangle boxes*/
                        }
                        >
                            {res.request_id}. {res.request_type} | Room #{res.room_num}
                        </button>
                    </ul>
                ))} {/*ex: "1. Language Interpreter | Room #201"*/}
            </nav>

            <div className="flex-1 bg-white p-6 border" style={{ borderColor: '#005E64', borderWidth: '2px', borderStyle: 'solid' }}> {/*Border styling*/}
                {selectedRequest ? (
                    <nav className="border p-6 rounded-lg"  style={{ borderColor: '#005E64'}}>
                    <div>
                    <h2 className="text-2xl font-bold border-b pb-2 mb-4" style={{ color: '#003A96'}}>{selectedRequest.request_id}. {selectedRequest.request_type} ({selectedRequest.language}) - Room #{selectedRequest.room_num} ({selectedRequest.name}): </h2>
                        {/*Will need to change once more forms are added. Currently prints the language field after the request type (Language Interpreter (English)), will likely not apply for future forms*/}

                    <h3 className="text-lg font-semibold font-[Poppins]" style={{ color: '#005E64'}}>Name: </h3>
            <ul className="list-disc ml-6 mb-4">
                    <p>{selectedRequest.name} (Employee ID: {selectedRequest.employee_id})</p> {/*Name (Employee ID: #)*/}
            </ul>


            <h3 className="text-lg font-semibold font-[Poppins]" style={{ color: '#005E64'}}>Room Number: </h3>
                <ul className="list-disc ml-6 mb-4">
                        <p>#{selectedRequest.room_num}</p>
                </ul> {/*#RoomNumber*/}

            <h3 className="text-lg font-semibold font-[Poppins]" style={{ color: '#005E64'}}>Contact Information: </h3>
                <ul className="list-disc ml-6 mb-4">
                        <p>
                            Phone: {formatPhoneNumber(selectedRequest.phone_num)}
                            <br/>
                            Email: {selectedRequest.email}
                        </p>
                </ul> {/*Phone: #
                         Email: #

                         Use formatPhoneNumber to return in (###) ###-#### format
                         */}

            <h3 className="text-lg font-semibold font-[Poppins]" style={{ color: '#005E64'}}>Request Date: </h3>
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

                <h3 className="text-lg font-semibold font-[Poppins]" style={{ color: '#005E64'}}>Additional Comments: </h3>
                <ul className="list-disc ml-6 mb-4">
                        <p>NOT YET IMPLEMENTED</p>
                </ul> {/*Additional comments, not in service_request table yet*/}
                    </div>
                    </nav>
                ) : ( <p className="text-gray-600 font-[Poppins]">Select a service request.</p>
                )} {/*No service selected yet*/}
            </div>
        </nav>
    )
}