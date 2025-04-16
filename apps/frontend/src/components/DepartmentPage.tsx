import { useParams } from 'react-router-dom';
import DepartmentList from './DepartmentList.ts';
import {trpc} from "../lib/trpc.ts";

export default function DepartmentPage() {

    //const {deptId} = useParams();
    //const department = DepartmentList.find((dept) => dept.id === deptId);
    const { deptId } = useParams();
    const department = trpc.getUniqueDirectory.useQuery({ id: parseInt(deptId as string, 10) });

    {/*Create routes with URLs for each dept*/}

    /* Error handling */
    if (!department) {
        return <p className={"font-[Poppins]"}><strong>Department not found</strong></p>
    }

    return (
        <div className="border p-6 rounded-lg" style={{ borderColor: '#005E64' }}>
            <h2 className="text-2xl font-bold font-[Poppins] border-b pb-2 mb-4" style={{ color: '#003A96'}}>{department.data?.name}: </h2> {/*Header with department name*/}

            <h3 className="text-lg font-semibold font-[Poppins]" style={{ color: '#005E64'}}>Specialties and Services: </h3> {/*Header for specialties and services*/}
            <ul className="list-disc ml-6 mb-4">
                {department.data?.services?.split(',').map((service, index) => (
                    <li key={index} className="text-gray-700 font-[Poppins]">
                        {service.trim()}
                    </li>
                ))} {/*Parse through specialties array and make each one a bullet point in a list*/}
            </ul>

            <h3 className="text-lg font-semibold font-[Poppins]" style={{ color: '#005E64'}}>Location: </h3> {/*Header for location (floor/suite)*/}
            <ul className="list-disc ml-6 mb-4">
                <li className="text-gray-700 font-[Poppins]">
                    {department.data?.location}
                </li> {/*Parse through floor array and make each one a bullet point in a list (some departments have multiple locations)*/}
            </ul>

            <h3 className="text-lg font-semibold font-[Poppins]" style={{ color: '#005E64'}}>Telephone: </h3>{/*Header for phone number */}
            <p className="text-grey-700 font-[Poppins]">{department.data?.telephone}</p>
        </div>
    )
}