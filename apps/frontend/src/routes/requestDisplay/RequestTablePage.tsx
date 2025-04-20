import {trpc} from '../../lib/trpc.ts';
import {useEffect, useRef, useState} from 'react';
import {useRequestData} from './RequestDataContext.tsx';
import type {ServiceRequest} from '@/types.tsx';
import {useNavigate} from 'react-router-dom';
import DeleteRequest from '@/components/ui/DeleteRequest.tsx';
import EditRequest from '@/components/ui/EditRequest.tsx';
import ViewRequest from "@/components/ui/ViewRequest.tsx";

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

//Handles closing the filter popup when you click outside the popup
const useClickOutside = (handler: () => void) => {
    const reference = useRef();

    useEffect(() => {
        const newHandler = (event: MouseEvent) => {
            if (!reference.current?.contains(event.target)) handler();
        };

        document.addEventListener('mousedown', newHandler);

        return () => {
            document.removeEventListener('mousedown', newHandler);
        };
    }, [handler]);
    return reference;
};

export default function RequestTablePage() {
    const {filteredData, isLoading, error} = useRequestData();

    // Prop for column to sort by, has to be one of following columns
    const [sortKey, setSortKey] = useState<
        | 'request_id'
        | 'priority'
        | 'status'
        | 'request_type'
        | 'location'
        | 'department'
        | 'request_date'
        | 'name'
    >('request_id');
    const [ascending, setAscending] = useState(true);

    //Defining ascending & descending sort order for priority and status
    const priorityOrder = ['Emergency', 'High', 'Medium', 'Low'];
    const statusOrder = ['Unassigned', 'Assigned', 'Working', 'Done'];

    // Input a service request, sets page to detailed view with that service request selected.
    const navigate = useNavigate();
    const sendToDetailedView = (highlightedRequest: ServiceRequest, editMode: boolean) => {
        console.log(highlightedRequest);
        navigate('/requests/list', {state: {ServiceRequest: highlightedRequest, editMode: editMode}});
    };

    // Edit & Delete menu props
    const [menuVisible, setMenuVisible] = useState(false);
    const [menuPos, setMenuPos] = useState({x: 0, y: 0});
    const [activeRequest, setActiveRequest] = useState<ServiceRequest | null>(null);

    // On event (typically used with onClick) with service request input, set to active request, and make menu visible at location of users cursor
    const handleMenu = (e: React.MouseEvent, request: ServiceRequest) => {
        e.preventDefault();
        setActiveRequest(request);

        const rect = e.currentTarget.getBoundingClientRect();
        setMenuPos({x: rect.left - 233, y: rect.top + 8});
        setMenuVisible(true);
    };

    const menuRef = useClickOutside(() => {
        setMenuVisible(false);
    });

    // Sort logic. Takes array of service requests (filteredData -- passed through with context from RequestPage to keep filters active), sorts it based on current SortKey
    const sortedData = (filteredData ? [...filteredData] : []).sort((a, b) => {
        if (!sortKey) return 0;

        const aVal = a[sortKey];
        const bVal = b[sortKey];

        // Uses order defined above to compare each value in array and sort, in ascending order if ascending true, else in descending.

        if (sortKey === 'priority') {
            return (
                (priorityOrder.indexOf(aVal as string) - priorityOrder.indexOf(bVal as string)) *
                (ascending ? 1 : -1)
            );
        }

        if (sortKey === 'status') {
            return (
                (statusOrder.indexOf(aVal as string) - statusOrder.indexOf(bVal as string)) *
                (ascending ? 1 : -1)
            );
        }

        // Sort by date
        if (sortKey === 'request_date') {
            return (
                (new Date(aVal as string).getTime() - new Date(bVal as string).getTime()) *
                (ascending ? 1 : -1)
            );
        }

        // Numerical sort for request_id
        if (sortKey === 'request_id') {
            return ((aVal as number) - (bVal as number)) * (ascending ? 1 : -1);
        }

        // Alphabetical sort if not one of the cases above
        return String(aVal).localeCompare(String(bVal)) * (ascending ? 1 : -1);
    });

    // Loading & Error messages
    if (isLoading) return <p>Loading...</p>;
    if (error) return <p>Error: {error.message}</p>;

    //Table page
    return (
        <nav className="flex flex-1">
            <nav
                className="w-full max-h-[105vh] bg-white p-6 pl-4 font-[Poppins]"
                style={{
                    borderTop: 'none',
                    borderBottom: 'none',
                    borderRight: 'none',
                    borderLeft: 'none',
                }}
            >
                {filteredData && filteredData.length > 0 ? (
                    <div
                        className="relative flex flex-col w-full overflow-scroll text-gray-700 bg-white bg-clip-border rounded-xl overflow-hidden border border-[#003A96] max-h-5/6 overflow-y-auto"
                        ref={menuRef}
                    >
                        <table className="w-full text-left table-auto min-w-max w-fit overflow-x-clip">
                            <thead className="bg-gray-200 sticky top-0 z-20">
                            <tr>
                                <th
                                    className="cursor-pointer hover:underline p-4 border-b border-gray-300 break-words"
                                    onClick={() => {
                                        if (sortKey === 'request_id') setAscending(!ascending);
                                        else {
                                            setSortKey('request_id');
                                            setAscending(true);
                                        }
                                    }}
                                >
                                    <h3
                                        className="block text-lg font-semibold font-[Poppins]"
                                        style={{color: '#003A96'}}
                                    >
                                        ID {sortKey === 'request_id' && (ascending ? '↑' : '↓')}
                                    </h3>
                                </th>

                                <th
                                    className="cursor-pointer hover:underline p-4 border-b border-gray-300 break-words"
                                    onClick={() => {
                                        if (sortKey === 'request_type')
                                            setAscending(!ascending);
                                        else {
                                            setSortKey('request_type');
                                            setAscending(true);
                                        }
                                    }}
                                >
                                    <h3
                                        className="block text-lg font-semibold font-[Poppins] break-words"
                                        style={{color: '#003A96'}}
                                    >
                                        Request Type{' '}
                                        {sortKey === 'request_type' && (ascending ? '↑' : '↓')}
                                    </h3>
                                </th>

                                <th
                                    className="cursor-pointer hover:underline p-4 border-b border-gray-300 break-words"
                                    onClick={() => {
                                        if (sortKey === 'priority') setAscending(!ascending);
                                        else {
                                            setSortKey('priority');
                                            setAscending(true);
                                        }
                                    }}
                                >
                                    <h3
                                        className="block text-lg font-semibold font-[Poppins]"
                                        style={{color: '#003A96'}}
                                    >
                                        Priority{' '}
                                        {sortKey === 'priority' && (ascending ? '↑' : '↓')}
                                    </h3>
                                </th>

                                <th className="p-4 border-b border-gray-300  break-words">
                                    <h3
                                        className="block text-lg font-semibold font-[Poppins]"
                                        style={{color: '#003A96'}}
                                    >
                                        Request Details
                                    </h3>
                                </th>

                                <th
                                    className="cursor-pointer hover:underline p-4 border-b border-gray-300  break-words"
                                    onClick={() => {
                                        if (sortKey === 'location') setAscending(!ascending);
                                        else {
                                            setSortKey('location');
                                            setAscending(true);
                                        }
                                    }}
                                >
                                    <h3
                                        className="block text-lg font-semibold font-[Poppins]"
                                        style={{color: '#003A96'}}
                                    >
                                        Location{' '}
                                        {sortKey === 'location' && (ascending ? '↑' : '↓')}
                                    </h3>
                                </th>

                                <th
                                    className="cursor-pointer hover:underline p-4 border-b border-gray-300  break-words"
                                    onClick={() => {
                                        if (sortKey === 'department') setAscending(!ascending);
                                        else {
                                            setSortKey('department');
                                            setAscending(true);
                                        }
                                    }}
                                >
                                    <h3
                                        className="block text-lg font-semibold font-[Poppins]"
                                        style={{color: '#003A96'}}
                                    >
                                        Department{' '}
                                        {sortKey === 'department' && (ascending ? '↑' : '↓')}
                                    </h3>
                                </th>

                                <th
                                    className="cursor-pointer hover:underline p-4 border-b border-gray-300  break-words"
                                    onClick={() => {
                                        if (sortKey === 'name') setAscending(!ascending);
                                        else {
                                            setSortKey('name');
                                            setAscending(true);
                                        }
                                    }}
                                >
                                    <h3
                                        className="block text-lg font-semibold font-[Poppins]"
                                        style={{color: '#003A96'}}
                                    >
                                        Name (ID){' '}
                                        {sortKey === 'name' && (ascending ? '↑' : '↓')}
                                    </h3>
                                </th>

                                <th
                                    className="cursor-pointer hover:underline p-4 border-b border-gray-300  break-words"
                                    onClick={() => {
                                        if (sortKey === 'request_date')
                                            setAscending(!ascending);
                                        else {
                                            setSortKey('request_date');
                                            setAscending(true);
                                        }
                                    }}
                                >
                                    <h3
                                        className="block text-lg font-semibold font-[Poppins]"
                                        style={{color: '#003A96'}}
                                    >
                                        Request Date{' '}
                                        {sortKey === 'request_date' && (ascending ? '↑' : '↓')}
                                    </h3>
                                </th>

                                <th
                                    className="cursor-pointer hover:underline p-4 border-b border-gray-300  break-words"
                                    onClick={() => {
                                        if (sortKey === 'status') setAscending(!ascending);
                                        else {
                                            setSortKey('status');
                                            setAscending(true);
                                        }
                                    }}
                                >
                                    <h3
                                        className="block text-lg font-semibold font-[Poppins]"
                                        style={{color: '#003A96'}}
                                    >
                                        Status {sortKey === 'status' && (ascending ? '↑' : '↓')}
                                    </h3>
                                </th>

                                <th className="p-4 border-b border-gray-300 break-words">
                                    <h3
                                        className="block text-lg font-semibold font-[Poppins]"
                                        style={{color: '#003A96'}}
                                    >
                                        Additional Comments
                                    </h3>
                                </th>
                                <th className="p-4 border-b border-gray-300 bg-gray-200 sticky right-0 z-10 text-center">
                                    <h3
                                        className="block text-lg font-semibold font-[Poppins]"
                                        style={{color: '#003A96'}}
                                    >
                                        Manage
                                    </h3>
                                </th>
                            </tr>
                            </thead>
                            <tbody>
                            {sortedData.map((res) => (
                                <tr
                                    key={res.request_id}
                                    className="even:bg-gray-100 odd:bg-white hover:bg-blue-100 pt-0 pb-0"
                                >
                                    <td className="p-4 break-words max-w-[50px] pt-0 pb-2">
                                        <p className="block font-[Poppins] text-med text-blue-gray-900">
                                            {res.request_id}
                                        </p>
                                    </td>

                                    <td className="p-4 break-words max-w-[200px] pt-0 pb-2">
                                        <p className="block font-[Poppins] text-med text-blue-gray-900 font-semibold">
                                            <i>
                                                {res.request_type === 'Sanitation'
                                                    ? 'Sanitation'
                                                    : res.request_type === 'Transportation'
                                                        ? 'Transportation'
                                                        : res.request_type === 'Security'
                                                            ? 'Security'
                                                            : res.request_type === 'AudioVisual'
                                                                ? 'Audio/Visual Accommodations'
                                                                : res.request_type === 'Language'
                                                                    ? 'Language Interpreter ️'
                                                                    : 'N/A'}
                                            </i>
                                        </p>
                                    </td>

                                    <td className="p-4  break-words w-fit pt-0 pb-2">
                                        <p
                                            className={`block font-[Poppins] text-med font-semibold ${
                                                res.priority === 'Low'
                                                    ? 'text-green-600'
                                                    : res.priority === 'Medium'
                                                        ? 'text-yellow-500'
                                                        : res.priority === 'High'
                                                            ? 'text-red-500'
                                                            : res.priority === 'Emergency'
                                                                ? 'text-red-700 underline'
                                                                : 'text-blue-gray-900'
                                            }`}
                                        >
                                            {res.priority}
                                        </p>
                                    </td>

                                    <td className="p-4  break-words max-w-[225px] pt-0 pb-2">
                                        <div className="font-[Poppins] text-med text-blue-gray-900 space-y-1">
                                            {res.sanitation?.cleaningType && (
                                                <div className="pl-4">
                                                        <span className="underline w-45 pl-4">
                                                            <ul>Cleaning Type:</ul>
                                                        </span>
                                                    <p className="pl-4 py-2">
                                                        {res.sanitation.cleaningType}
                                                    </p>
                                                </div>
                                            )}
                                            {res.language?.targetLanguage && (
                                                <div className="pl-4">
                                                        <span className="underline w-45 pl-4">
                                                            <ul>Target Language:</ul>
                                                        </span>
                                                    <p className="pl-4 py-2">
                                                        {res.language.targetLanguage}
                                                    </p>
                                                </div>
                                            )}
                                            {res.audioVisual?.accommodationType && (
                                                <div className="pl-4">
                                                        <span className="underline w-45 pl-4">
                                                            <ul>Accommodation Type:</ul>
                                                        </span>
                                                    <p className="pl-4 py-2">
                                                        {res.audioVisual.accommodationType}
                                                    </p>
                                                </div>
                                            )}
                                            {res.transportation?.transportationType && (
                                                <div className="pl-4">
                                                        <span className="underline w-45 pl-4">
                                                            <ul>Transportation Type:</ul>
                                                        </span>
                                                    <p className="pl-4 py-2">
                                                        {res.transportation.transportationType}
                                                    </p>
                                                </div>
                                            )}
                                            {res.security?.accessZones && (
                                                <div className="pl-4">
                                                        <span className="underline w-45 pl-4">
                                                            <ul>Access Zones:</ul>
                                                        </span>
                                                    <p className="pl-4 py-2">
                                                        {res.security.accessZones}
                                                    </p>
                                                </div>
                                            )}
                                            {res.request_type === 'Sanitation' && (
                                                <div className="pl-4">
                                                        <span className="underline w-45 pl-4">
                                                            <ul>Contaminant:</ul>
                                                        </span>
                                                    <p className="pl-4 py-2">
                                                        {res.sanitation?.contaminant?.trim()
                                                            ? res.sanitation.contaminant
                                                            : 'N/A'}
                                                    </p>
                                                </div>
                                            )}
                                            {res.language?.sourceLanguage && (
                                                <div className="pl-4">
                                                        <span className="underline w-45 pl-4">
                                                            <ul>Source Language:</ul>
                                                        </span>
                                                    <p className="pl-4 py-2">
                                                        {res.language.sourceLanguage}
                                                    </p>
                                                </div>
                                            )}
                                            {res.request_type === 'AudioVisual' && (
                                                <div className="pl-4">
                                                        <span className="underline w-45 pl-4">
                                                            <ul>Accommodation Details:</ul>
                                                        </span>
                                                    <p className="pl-4 py-2">
                                                        {res.audioVisual?.accommodationDetails?.trim()
                                                            ? res.audioVisual
                                                                .accommodationDetails
                                                            : 'N/A'}
                                                    </p>
                                                </div>
                                            )}
                                            {res.transportation?.transportationDestination && (
                                                <div className="pl-4">
                                                        <span className="underline w-45 pl-4">
                                                            <ul>Transportation Destination:</ul>
                                                        </span>
                                                    <p className="pl-4 py-2">
                                                        {
                                                            res.transportation
                                                                .transportationDestination
                                                        }
                                                    </p>
                                                </div>
                                            )}
                                            {res.security?.securityIssue && (
                                                <div className="pl-4">
                                                        <span className="underline pl-4">
                                                            <ul>Security Issue:</ul>
                                                        </span>
                                                    <p className="pl-4 py-2">
                                                        {res.security.securityIssue}
                                                    </p>
                                                </div>
                                            )}
                                        </div>
                                        {/*Displays details for specific request types. Fields semibold, spacing consistent with flex & w-35 */}
                                    </td>

                                    <td className="p-4  break-words max-w-[150px] pt-0 pb-2">
                                        <p className="block font-[Poppins] text-med text-blue-gray-900">
                                            {res.location}
                                        </p>
                                    </td>

                                    <td className="p-4  break-words max-w-[130px] pt-0 pb-2">
                                        <p className="block font-[Poppins] text-med text-blue-gray-900">
                                            {res.department}
                                        </p>
                                    </td>

                                    <td className="p-4  break-words max-w-[150px] pt-0 pb-2">
                                        <p className="block font-[Poppins] text-med text-blue-gray-900">
                                            {res.name} ({res.employee_id})
                                        </p>
                                    </td>

                                    <td className="p-4  break-words max-w-[50px] pt-0 pb-2">
                                        <p className="block font-[Poppins] text-med text-blue-gray-900">
                                            {new Date(res.request_date).toLocaleDateString(
                                                undefined,
                                                {
                                                    year: 'numeric',
                                                    month: 'long',
                                                    day: 'numeric',
                                                    hour: 'numeric',
                                                    minute: 'numeric',
                                                    second: 'numeric',
                                                }
                                            )}
                                        </p>
                                    </td>

                                    <td className="p-4 break-words w-fit pt-0 pb-2">
                                        <p
                                            className={`block font-[Poppins] text-med ${
                                                res.status === 'Unassigned'
                                                    ? 'text-gray-500'
                                                    : res.status === 'Assigned'
                                                        ? 'text-blue-600'
                                                        : res.status === 'Working'
                                                            ? 'text-amber-600'
                                                            : res.status === 'Done'
                                                                ? 'text-green-600'
                                                                : 'text-blue-gray-900'
                                            }`}
                                        >
                                            {res.status}
                                        </p>
                                    </td>

                                    <td className="p-4 break-words max-w-[50px] pt-2 pb-2">
                                        <p className="block font-[Poppins] text-med text-blue-gray-900">
                                            {res.additional_comments?.trim() ? (
                                                <i>{res.additional_comments}</i>
                                            ) : (
                                                'N/A'
                                            )}
                                        </p>
                                    </td>

                                    <td className="p-4 sticky right-0 bg-inherit z-15 w-fit pt-2 pb-2 break-words">
                                        <div className="flex justify-center gap-2">
                                            <div className={"flex justify-center gap-4"}>
                                            <ViewRequest
                                                size={25}
                                                onClick={() => {
                                                console.log("View");
                                                setMenuVisible(false);
                                                sendToDetailedView(res, false);
                                            }}
                                                tooltip={"View Service Request"}
                                            />
                                            <EditRequest
                                                size={20}
                                                onClick={() => {
                                                    console.log('Edit');
                                                    setMenuVisible(false);
                                                    sendToDetailedView(res, true);
                                                }}
                                                tooltip={"Edit Service Request"}
                                            />
                                            </div>
                                            <DeleteRequest
                                                size={20}
                                                onClick={() => {
                                                    console.log('Delete: ');
                                                    console.log(res);
                                                    setMenuVisible(false);
                                                }}
                                                tooltip={"Delete Service Request"}
                                            />
                                        </div>
                                    </td>
                                </tr>
                            ))}
                            </tbody>
                        </table>
                    </div>
                ) : (
                    <nav
                        className="border p-5 rounded-lg flex items-center w-1/3"
                        style={{borderColor: '#005E64'}}
                    >
                        <p className="text-gray-700 font-[Poppins]">No active service requests.</p>
                    </nav>
                )}
            </nav>
        </nav>
    );
}
/*email phone#*/