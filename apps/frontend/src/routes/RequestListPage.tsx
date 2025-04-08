import {trpc} from "../lib/trpc.ts";
import DepartmentRoutes from "./DepartmentRoutes.tsx";


export default function RequestListPage(){
    const { data, isLoading, error } = trpc.requestList.useQuery();
    if (isLoading) return <p>Loading...</p>;
    if (error) return <p>Error: {error.message}</p>;
    return(
        <nav className="flex flex-1">
            <nav className="w-1/3 bg-white p-4 border"  style={{ borderColor: '#005E64', borderWidth: '2px', borderStyle: 'solid' }}>

            <h2 className="text-2xl font-bold mb-4" style={{ color: '#003A96'}}>Service Requests:</h2> {/*Header for list of departments on page*/}
            {data?.map((res, index) => (
                <h2 className="text-2xl font-bold border-b pb-2 mb-4" style={{ color: '#003A96'}}>{res.request_id}. {res.request_type} ({res.language}) - Room #{res.room_num} ({res.name}): </h2>
                ))} {/*WILL NEED TO CHANGE ONCE MORE FORMS ARE ADDED. Display of specific language will not be applicable for all forms types.*/}
            </nav>

            <nav className="w-2/3 bg-white p-4 border"  style={{ borderColor: '#005E64', borderWidth: '2px', borderStyle: 'solid' }}>
                {data?.map((res, index) => (
                    <h2 className="text-2xl font-bold border-b pb-2 mb-4" style={{ color: '#003A96'}}>{res.request_id}. {res.request_type} ({res.language}) - Room #{res.room_num} ({res.name}): </h2>
                ))} {/*WILL NEED TO CHANGE ONCE MORE FORMS ARE ADDED. Display of specific language will not be applicable for all forms types.*/}

                <h3 className="text-lg font-semibold" style={{ color: '#005E64'}}>Name: </h3>
            <ul className="list-disc ml-6 mb-4">
                {data?.map((res, index) => (
                    <p>{res.name} (Employee ID: {res.employee_id})</p>
                ))} {/*Parse through specialties array and make each one a bullet point in a list*/}
            </ul>

            <h3 className="text-lg font-semibold" style={{ color: '#005E64'}}>Request Date: </h3>
            <ul className="list-disc ml-6 mb-4">
                {data?.map((res, index) => (
                    <p>{new Date(res.request_date).toLocaleDateString(undefined, {
                        year: 'numeric',
                        month: 'long',
                        day: 'numeric',
                        hour: 'numeric',
                        minute: 'numeric',
                        second: 'numeric',
                    })} (Request ID: {res.request_id})</p>
                ))} {/*Parse through specialties array and make each one a bullet point in a list*/}
            </ul>

            <h3 className="text-lg font-semibold" style={{ color: '#005E64'}}>Email: </h3>
            <ul className="list-disc ml-6 mb-4">
                {data?.map((res, index) => (
                    <p>{res.email}</p>
                ))} {/*Parse through specialties array and make each one a bullet point in a list*/}
            </ul>

            <h3 className="text-lg font-semibold" style={{ color: '#005E64'}}>Room Number: </h3>
            <ul className="list-disc ml-6 mb-4">
                {data?.map((res, index) => (
                    <p>{res.room_num}</p>
                ))} {/*Parse through specialties array and make each one a bullet point in a list*/}
            </ul>

            <h3 className="text-lg font-semibold" style={{ color: '#005E64'}}>Phone Number: </h3>
            <ul className="list-disc ml-6 mb-4">
                {data?.map((res, index) => (
                    <p>{res.phone_num}</p>
                ))} {/*Parse through specialties array and make each one a bullet point in a list*/}
            </ul>
            </nav>
        </nav>
    )
}