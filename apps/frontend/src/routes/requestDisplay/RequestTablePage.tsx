import { trpc } from '../../lib/trpc.ts';
import { useEffect, useRef, useState } from 'react';
import { useRequestData } from './RequestDataContext.tsx';
import type { ServiceRequest } from '@/types.tsx';
import { useNavigate } from 'react-router-dom';
import DeleteRequest from '@/components/ui/DeleteRequest.tsx';
import EditRequest from '@/components/ui/EditRequest.tsx';
import ViewRequest from '@/components/ui/ViewRequest.tsx';

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

export default function RequestTablePage({userRole}: {userRole: string}) {
    const { filteredData, isLoading, error } = useRequestData();
    const deleteRequest = trpc.deleteRequest.useMutation();
    const handleDelete = (selectedRequest: ServiceRequest) => {
        console.log('Trying to delete:', selectedRequest);

        if (!selectedRequest?.request_id) {
            console.error('No request selected or ID is missing');
            return;
        }

        deleteRequest.mutate(
            { request_id: selectedRequest.request_id },
            {
                onSuccess: () => {
                    console.log('Request deleted');
                    //window.location.reload();
                    window.location.href = 'http://localhost:3000/requests/table';
                },
                onError: (error) => {
                    console.error('Error deleting request:', error);
                },
            }
        );
    };

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
        navigate('/requests/list', {
            state: { ServiceRequest: highlightedRequest, editMode: editMode },
        });
    };

    // Edit & Delete menu props
    const [menuVisible, setMenuVisible] = useState(false);
    const [menuPos, setMenuPos] = useState({ x: 0, y: 0 });
    const [activeRequest, setActiveRequest] = useState<ServiceRequest | null>(null);

    // On event (typically used with onClick) with service request input, set to active request, and make menu visible at location of users cursor
    const handleMenu = (e: React.MouseEvent, request: ServiceRequest) => {
        e.preventDefault();
        setActiveRequest(request);

        const rect = e.currentTarget.getBoundingClientRect();
        setMenuPos({ x: rect.left - 233, y: rect.top + 8 });
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
        <div className="flex flex-1  mt-0">
            <div
                className="w-full  min-h-screen p-6 pl-4 pr-4 font-[Poppins]"
            >
                {filteredData && filteredData.length > 0 ? (
                    <div
                        className="relative flex flex-col w-full overflow-scroll scrollbar-thin scrollbar-thumb-[#003a96] scrollbar-track-blue-100 scrollbar-hide text-gray-700 bg-white bg-clip-border rounded-tl-3xl overflow-hidden shadow-lg max-h-9/10 overflow-y-auto"
                        ref={menuRef}
                    >
                        <table className="w-full text-left table-auto min-w-max w-fit overflow-x-clip">
                            <thead className="bg-[#003A96] sticky top-0 z-20 border-b-5 border-b-[#44A6A6]">
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
                                            style={{ color: '#ffffff' }}
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
                                            style={{ color: '#ffffff' }}
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
                                            style={{ color: '#ffffff' }}
                                        >
                                            Priority{' '}
                                            {sortKey === 'priority' && (ascending ? '↑' : '↓')}
                                        </h3>
                                    </th>

                                    {/*<th className="p-4 border-b border-gray-300  break-words">*/}
                                    {/*    <h3*/}
                                    {/*        className="block text-lg font-semibold font-[Poppins]"*/}
                                    {/*        style={{ color: '#ffffff' }}*/}
                                    {/*    >*/}
                                    {/*        Request Details*/}
                                    {/*    </h3>*/}
                                    {/*</th>*/}

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
                                            style={{ color: '#ffffff' }}
                                        >
                                            Location{' '}
                                            {sortKey === 'location' && (ascending ? '↑' : '↓')}
                                        </h3>
                                    </th>

                                    <th
                                        className="cursor-pointer hover:underline p-4 border-b border-gray-300 break-words"
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
                                            style={{ color: '#ffffff' }}
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
                                            style={{ color: '#ffffff' }}
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
                                            style={{ color: '#ffffff' }}
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
                                            style={{ color: '#ffffff' }}
                                        >
                                            Status {sortKey === 'status' && (ascending ? '↑' : '↓')}
                                        </h3>
                                    </th>

                                    <th className="p-4 border-b border-gray-300 break-words">
                                        <h3
                                            className="block text-lg font-semibold font-[Poppins]"
                                            style={{ color: '#ffffff' }}
                                        >
                                            Additional Comments
                                        </h3>
                                    </th>
                                    <th
                                        className="p-4 border-b border-gray-300 sticky right-0 z-20 text-center bg-[#003A96]"
                                        style={{
                                            boxShadow: '-1px 0 0 #ffffff',
                                        }}
                                    >
                                        <h3
                                            className="block text-lg font-semibold font-[Poppins]"
                                            style={{ color: '#ffffff' }}
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
                                        className="even:bg-gray-100 odd:bg-white hover:bg-blue-100"
                                    >
                                        <td className="p-4 break-words max-w-[50px] pt-2 pb-2">
                                            <p className="block font-[Poppins] text-med text-blue-gray-900">
                                                {res.request_id}
                                            </p>
                                        </td>

                                        <td className="p-2 break-words max-w-[200px] pt-2 pb-2">
                                            <p className="block font-[Poppins] text-med text-blue-gray-900 ">
                                                <p>
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
                                                                : res.request_type ===
                                                                    'MedicalDevice'
                                                                  ? 'Medical Device'
                                                                  : res.request_type ===
                                                                      'Facilities'
                                                                    ? 'Facilities'
                                                                    : 'N/A'}
                                                </p>
                                            </p>
                                        </td>

                                        <td className="p-4 break-words w-fit pt-2 pb-2">
                                            <p
                                            >
                                                {res.priority}
                                            </p>
                                        </td>

                                        {/*<td className="p-4  break-words max-w-[225px] pt-2 pb-1">*/}
                                        {/*    <div className="font-[Poppins] text-med text-blue-gray-900 space-y-0">*/}
                                        {/*        {res.sanitation?.cleaningType && (*/}
                                        {/*            <div className="pl-4">*/}
                                        {/*                <span className="underline w-45 pl-4">*/}
                                        {/*                    <ul>Cleaning Type:</ul>*/}
                                        {/*                </span>*/}
                                        {/*                <p className="pl-4 py-2">*/}
                                        {/*                    {res.sanitation.cleaningType}*/}
                                        {/*                </p>*/}
                                        {/*            </div>*/}
                                        {/*        )}*/}
                                        {/*        {res.language?.targetLanguage && (*/}
                                        {/*            <div className="pl-4">*/}
                                        {/*                <span className="underline w-45 pl-4">*/}
                                        {/*                    <ul>Target Language:</ul>*/}
                                        {/*                </span>*/}
                                        {/*                <p className="pl-4 py-2">*/}
                                        {/*                    {res.language.targetLanguage}*/}
                                        {/*                </p>*/}
                                        {/*            </div>*/}
                                        {/*        )}*/}
                                        {/*        {res.audioVisual?.accommodationType && (*/}
                                        {/*            <div className="pl-4">*/}
                                        {/*                <span className="underline w-45 pl-4">*/}
                                        {/*                    <ul>Accommodation Type:</ul>*/}
                                        {/*                </span>*/}
                                        {/*                <p className="pl-4 py-2">*/}
                                        {/*                    {res.audioVisual.accommodationType}*/}
                                        {/*                </p>*/}
                                        {/*            </div>*/}
                                        {/*        )}*/}
                                        {/*        {res.transportation?.transportationType && (*/}
                                        {/*            <div className="pl-4">*/}
                                        {/*                <span className="underline w-45 pl-4">*/}
                                        {/*                    <ul>Transportation Type:</ul>*/}
                                        {/*                </span>*/}
                                        {/*                <p className="pl-4 py-2">*/}
                                        {/*                    {res.transportation.transportationType}*/}
                                        {/*                </p>*/}
                                        {/*            </div>*/}
                                        {/*        )}*/}
                                        {/*        {res.security?.accessZones && (*/}
                                        {/*            <div className="pl-4">*/}
                                        {/*                <span className="underline w-45 pl-4">*/}
                                        {/*                    <ul>Access Zones:</ul>*/}
                                        {/*                </span>*/}
                                        {/*                <p className="pl-4 py-2">*/}
                                        {/*                    {res.security.accessZones}*/}
                                        {/*                </p>*/}
                                        {/*            </div>*/}
                                        {/*        )}*/}
                                        {/*        {res.medicalDevice?.device && (*/}
                                        {/*            <div className="pl-4">*/}
                                        {/*                <span className="underline w-45 pl-4">*/}
                                        {/*                    <ul>Medical Device:</ul>*/}
                                        {/*                </span>*/}
                                        {/*                <p className="pl-4 py-2">*/}
                                        {/*                    {res.medicalDevice.device}*/}
                                        {/*                </p>*/}
                                        {/*            </div>*/}
                                        {/*        )}*/}
                                        {/*        {res.facilities?.maintenanceType && (*/}
                                        {/*            <div className="pl-4">*/}
                                        {/*                <span className="underline w-45 pl-4">*/}
                                        {/*                    <ul>Maintenance Type:</ul>*/}
                                        {/*                </span>*/}
                                        {/*                <p className="pl-4 py-2">*/}
                                        {/*                    {res.facilities.maintenanceType}*/}
                                        {/*                </p>*/}
                                        {/*            </div>*/}
                                        {/*        )}*/}
                                        {/*        {res.request_type === 'Sanitation' && (*/}
                                        {/*            <div className="pl-4">*/}
                                        {/*                <span className="underline w-45 pl-4">*/}
                                        {/*                    <ul>Contaminant:</ul>*/}
                                        {/*                </span>*/}
                                        {/*                <p className="pl-4 py-2">*/}
                                        {/*                    {res.sanitation?.contaminant?.trim()*/}
                                        {/*                        ? res.sanitation.contaminant*/}
                                        {/*                        : 'N/A'}*/}
                                        {/*                </p>*/}
                                        {/*            </div>*/}
                                        {/*        )}*/}
                                        {/*        {res.language?.sourceLanguage && (*/}
                                        {/*            <div className="pl-4">*/}
                                        {/*                <span className="underline w-45 pl-4">*/}
                                        {/*                    <ul>Source Language:</ul>*/}
                                        {/*                </span>*/}
                                        {/*                <p className="pl-4 py-2">*/}
                                        {/*                    {res.language.sourceLanguage}*/}
                                        {/*                </p>*/}
                                        {/*            </div>*/}
                                        {/*        )}*/}
                                        {/*        {res.request_type === 'AudioVisual' && (*/}
                                        {/*            <div className="pl-4">*/}
                                        {/*                <span className="underline w-45 pl-4">*/}
                                        {/*                    <ul>Accommodation Details:</ul>*/}
                                        {/*                </span>*/}
                                        {/*                <p className="pl-4 py-2">*/}
                                        {/*                    {res.audioVisual?.accommodationDetails?.trim()*/}
                                        {/*                        ? res.audioVisual*/}
                                        {/*                              .accommodationDetails*/}
                                        {/*                        : 'N/A'}*/}
                                        {/*                </p>*/}
                                        {/*            </div>*/}
                                        {/*        )}*/}
                                        {/*        {res.transportation?.transportationDestination && (*/}
                                        {/*            <div className="pl-4">*/}
                                        {/*                <span className="underline w-45 pl-4">*/}
                                        {/*                    <ul>Transportation Destination:</ul>*/}
                                        {/*                </span>*/}
                                        {/*                <p className="pl-4 py-2">*/}
                                        {/*                    {*/}
                                        {/*                        res.transportation*/}
                                        {/*                            .transportationDestination*/}
                                        {/*                    }*/}
                                        {/*                </p>*/}
                                        {/*            </div>*/}
                                        {/*        )}*/}
                                        {/*        {res.security?.securityIssue && (*/}
                                        {/*            <div className="pl-4">*/}
                                        {/*                <span className="underline pl-4">*/}
                                        {/*                    <ul>Security Issue:</ul>*/}
                                        {/*                </span>*/}
                                        {/*                <p className="pl-4 py-2">*/}
                                        {/*                    {res.security.securityIssue}*/}
                                        {/*                </p>*/}
                                        {/*            </div>*/}
                                        {/*        )}*/}
                                        {/*        {res.medicalDevice?.operatorRequired && (*/}
                                        {/*            <div className="pl-4">*/}
                                        {/*                <span className="underline w-45 pl-4">*/}
                                        {/*                    <ul>Operator Required?</ul>*/}
                                        {/*                </span>*/}
                                        {/*                <p className="pl-4 py-2">*/}
                                        {/*                    {res.medicalDevice.operatorRequired}*/}
                                        {/*                </p>*/}
                                        {/*            </div>*/}
                                        {/*        )}*/}
                                        {/*        {res.facilities?.equipmentType && (*/}
                                        {/*            <div className="pl-4">*/}
                                        {/*                <span className="underline w-45 pl-4">*/}
                                        {/*                    <ul>Equipment Type:</ul>*/}
                                        {/*                </span>*/}
                                        {/*                <p className="pl-4 py-2">*/}
                                        {/*                    {res.facilities.equipmentType}*/}
                                        {/*                </p>*/}
                                        {/*            </div>*/}
                                        {/*        )}*/}
                                        {/*    </div>*/}
                                        {/*    /!*Displays details for specific request types. Fields semibold, spacing consistent with flex & w-35 *!/*/}
                                        {/*</td>*/}

                                        <td className="p-4  break-words max-w-[150px] pt-2 pb-2">
                                            <p className="block font-[Poppins] text-med text-blue-gray-900">
                                                {res.location}
                                            </p>
                                        </td>

                                        <td className="p-4  break-words max-w-[130px] pt-2 pb-2">
                                            <p className="block font-[Poppins] text-med text-blue-gray-900">
                                                {res.department}
                                            </p>
                                        </td>

                                        <td className="p-4  break-words max-w-[150px] pt-2 pb-2">
                                            <p className="block font-[Poppins] text-med text-blue-gray-900">
                                                {res.name} ({res.employee_id})
                                            </p>
                                        </td>

                                        <td className="p-4  break-words max-w-[50px] pt-2 pb-2">
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

                                        <td className="p-4 break-words w-fit pt-2 pb-2">
                                            <p
                                                className={`block font-[Poppins] text-med ${
                                                    res.status
                                                }`}
                                            >
                                                {res.status}
                                            </p>
                                        </td>

                                        <td className="p-4 break-words max-w-[50px] py-2">
                                            <p className="block font-[Poppins] text-med text-blue-gray-900">
                                                {res.additional_comments?.trim() ? (
                                                    <i>{res.additional_comments}</i>
                                                ) : (
                                                    'N/A'
                                                )}
                                            </p>
                                        </td>

                                        <td
                                            className="p-4 sticky right-0 z-9 w-fit py-2 pb-1 break-words even:bg-gray-100 odd:bg-white hover:bg-blue-100"
                                            style={{
                                                backgroundColor: 'inherit',
                                                boxShadow: '-1px 0 0 #ffffff',
                                            }}
                                        >
                                            <div className="flex justify-center gap-2">
                                                <div className={'flex justify-center gap-4'}>
                                                    <ViewRequest
                                                        size={25}
                                                        onClick={() => {
                                                            console.log('View');
                                                            setMenuVisible(false);
                                                            sendToDetailedView(res, false);
                                                        }}
                                                        tooltip={'View Service Request'}
                                                    />
                                                    <EditRequest
                                                        size={20}
                                                        onClick={() => {
                                                            console.log('Edit');
                                                            setMenuVisible(false);
                                                            sendToDetailedView(res, true);
                                                        }}
                                                        tooltip={'Edit Service Request'}
                                                    />
                                                </div>
                                                <DeleteRequest
                                                    size={20}
                                                    onClick={() => {
                                                        console.log(
                                                            userRole === "Admin"
                                                        );
                                                        if (
                                                            userRole === "Admin"
                                                        ) {
                                                            console.log('Delete: ');
                                                            console.log(res);
                                                            handleDelete(res);
                                                            setMenuVisible(false);
                                                        } else {
                                                            console.log('Insufficient Permissions');
                                                        }
                                                    }}
                                                    tooltip={'Delete Service Request'}
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
                        style={{ borderColor: '#005E64' }}
                    >
                        <p className="text-gray-700 font-[Poppins]">No active service requests.</p>
                    </nav>
                )}
            </div>
        </div>
    );
}
/*email phone#*/