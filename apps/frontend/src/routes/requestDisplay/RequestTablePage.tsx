import { trpc } from '../../lib/trpc.ts';
import { useEffect, useState } from 'react';
import { useRequestData } from './RequestDataContext.tsx';
import type { ServiceRequest } from '@/types.tsx';
import { useNavigate } from 'react-router-dom';
import {
    AlertDialog,
    AlertDialogAction,
    AlertDialogCancel,
    AlertDialogContent,
    AlertDialogDescription,
    AlertDialogFooter,
    AlertDialogHeader,
    AlertDialogTitle,
    AlertDialogTrigger,
    AlertDialogOverlay,
} from '../../components/ui/AlertDialogue';
import edit from '../../../assets/edit.png';
import deleteicon from '../../../assets/deleteicon.png';

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
    const { filteredData, isLoading, error } = useRequestData();

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

    const priorityOrder = ['Emergency', 'High', 'Medium', 'Low'];
    const statusOrder = ['Unassigned', 'Assigned', 'Working', 'Done'];
    const navigate = useNavigate();

    const sendToDetailedView = (highlightedRequest: ServiceRequest) => {
        console.log(highlightedRequest);
        navigate('/requests/list', { state: { ServiceRequest: highlightedRequest } });
    };

    const [menuVisible, setMenuVisible] = useState(false);
    const [menuPos, setMenuPos] = useState({ x: 0, y: 0 });
    const [activeRequest, setActiveRequest] = useState<ServiceRequest | null>(null);

    const handleMenu = (e: React.MouseEvent, request: ServiceRequest) => {
        e.preventDefault();
        setActiveRequest(request);

        setMenuPos({ x: e.clientX, y: e.clientY });
        setMenuVisible(true);
    };

    const handleClick = () => {
        if (menuVisible) {
            setMenuVisible(false);
        }
    };

    useEffect(() => {
        document.addEventListener('click', handleClick);
        return () => document.removeEventListener('click', handleClick);
    }, []);

    const sortedData = (filteredData ? [...filteredData] : []).sort((a, b) => {
        if (!sortKey) return 0;

        const aVal = a[sortKey];
        const bVal = b[sortKey];

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

        if (sortKey === 'request_date') {
            return (
                (new Date(aVal as string).getTime() - new Date(bVal as string).getTime()) *
                (ascending ? 1 : -1)
            );
        }

        if (sortKey === 'request_id') {
            return ((aVal as number) - (bVal as number)) * (ascending ? 1 : -1);
        }

        // alphabetical sort if not one of the cases above
        return String(aVal).localeCompare(String(bVal)) * (ascending ? 1 : -1);
    });

    if (isLoading) return <p>Loading...</p>;
    if (error) return <p>Error: {error.message}</p>;

    return (
        <nav className="flex flex-1">
            <nav
                className="w-full max-h-[105vh] bg-white p-6 font-[Poppins]"
                style={{
                    borderTop: 'none',
                    borderBottom: 'none',
                    borderRight: 'none',
                    borderLeft: 'none',
                }}
            >
                {filteredData && filteredData.length > 0 ? (
                    <div className="relative flex flex-col w-full overflow-scroll text-gray-700 bg-white bg-clip-border rounded-xl rounded-lg overflow-hidden border border-gray-300 max-h-5/6 overflow-y-auto">
                        <table className="w-full text-left table-auto min-w-max w-fit overflow-x-auto">
                            <thead className="bg-gray-200 sticky top-0 z-10">
                                <tr>
                                    <th
                                        className="cursor-pointer hover:underline p-4 border-b border-gray-300 whitespace=normal break-words"
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
                                            style={{ color: '#003A96' }}
                                        >
                                            ID {sortKey === 'request_id' && (ascending ? '↑' : '↓')}
                                        </h3>
                                    </th>

                                    <th
                                        className="cursor-pointer hover:underline p-4 border-b border-gray-300 whitespace=normal break-words"
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
                                            className="block text-lg font-semibold font-[Poppins]"
                                            style={{ color: '#003A96' }}
                                        >
                                            Request Type{' '}
                                            {sortKey === 'request_type' && (ascending ? '↑' : '↓')}
                                        </h3>
                                    </th>

                                    <th
                                        className="cursor-pointer hover:underline p-4 border-b border-gray-300 whitespace=normal break-words"
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
                                            style={{ color: '#003A96' }}
                                        >
                                            Priority{' '}
                                            {sortKey === 'priority' && (ascending ? '↑' : '↓')}
                                        </h3>
                                    </th>

                                    <th className="p-4 border-b border-gray-300 whitespace=normal break-words">
                                        <h3
                                            className="block text-lg font-semibold font-[Poppins]"
                                            style={{ color: '#003A96' }}
                                        >
                                            Request Details
                                        </h3>
                                    </th>

                                    <th
                                        className="cursor-pointer hover:underline p-4 border-b border-gray-300 whitespace=normal break-words"
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
                                            style={{ color: '#003A96' }}
                                        >
                                            Location{' '}
                                            {sortKey === 'location' && (ascending ? '↑' : '↓')}
                                        </h3>
                                    </th>

                                    <th
                                        className="cursor-pointer hover:underline p-4 border-b border-gray-300 whitespace=normal break-words"
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
                                            style={{ color: '#003A96' }}
                                        >
                                            Department{' '}
                                            {sortKey === 'department' && (ascending ? '↑' : '↓')}
                                        </h3>
                                    </th>

                                    <th
                                        className="cursor-pointer hover:underline p-4 border-b border-gray-300 whitespace=normal break-words"
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
                                            style={{ color: '#003A96' }}
                                        >
                                            Name (ID){' '}
                                            {sortKey === 'name' && (ascending ? '↑' : '↓')}
                                        </h3>
                                    </th>

                                    <th
                                        className="cursor-pointer hover:underline p-4 border-b border-gray-300 whitespace=normal break-words"
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
                                            style={{ color: '#003A96' }}
                                        >
                                            Request Date{' '}
                                            {sortKey === 'request_date' && (ascending ? '↑' : '↓')}
                                        </h3>
                                    </th>

                                    <th
                                        className="cursor-pointer hover:underline p-4 border-b border-gray-300 whitespace=normal break-words"
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
                                            style={{ color: '#003A96' }}
                                        >
                                            Status {sortKey === 'status' && (ascending ? '↑' : '↓')}
                                        </h3>
                                    </th>

                                    <th className="p-4 border-b border-gray-300 whitespace=normal break-words">
                                        <h3
                                            className="block text-lg font-semibold font-[Poppins]"
                                            style={{ color: '#003A96' }}
                                        >
                                            Additional Comments
                                        </h3>
                                    </th>
                                </tr>
                            </thead>
                            <tbody>
                                {sortedData.map((res) => (
                                    <tr
                                        key={res.request_id}
                                        className="even:bg-gray-100 even:hover:bg-indigo-100 odd:hover:bg-blue-100 pt-0 pb-0"
                                        onClick={(e) => {
                                            handleMenu(e, res);
                                        }}
                                        onContextMenu={() => {
                                            sendToDetailedView(res);
                                        }}
                                    >
                                        <td className="p-4 whitespace=normal break-words max-w-[50px] pt-0 pb-2">
                                            <p className="block font-[Poppins] text-med text-blue-gray-900">
                                                {res.request_id}
                                            </p>
                                        </td>

                                        <td className="p-4 whitespace=normal break-words max-w-[125px] pt-0 pb-2">
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

                                        <td className="p-4 whitespace=normal break-words max-w-[110px] pt-0 pb-2">
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

                                        <td className="p-4 whitespace=normal break-words max-w-[275px] pt-0 pb-2">
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

                                        <td className="p-4 whitespace=normal break-words max-w-[150px] pt-0 pb-2">
                                            <p className="block font-[Poppins] text-med text-blue-gray-900">
                                                {res.location}
                                            </p>
                                        </td>

                                        <td className="p-4 whitespace=normal break-words max-w-[130px] pt-0 pb-2">
                                            <p className="block font-[Poppins] text-med text-blue-gray-900">
                                                {res.department}
                                            </p>
                                        </td>

                                        <td className="p-4 whitespace=normal break-words max-w-[50px] pt-0 pb-2">
                                            <p className="block font-[Poppins] text-med text-blue-gray-900">
                                                {res.name} ({res.employee_id})
                                            </p>
                                        </td>

                                        <td className="p-4 whitespace=normal break-words max-w-[50px] pt-0 pb-2">
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

                                        <td className="p-4 whitespace=normal break-words max-w-[115px] pt-0 pb-2">
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

                                        <td className="p-4 whitespace=normal break-words max-w-[125px] pt-2 pb-2">
                                            <p className="block font-[Poppins] text-med text-blue-gray-900">
                                                {res.additional_comments?.trim() ? (
                                                    <i>{res.additional_comments}</i>
                                                ) : (
                                                    'N/A'
                                                )}
                                            </p>
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                        {menuVisible && activeRequest && (
                            <div
                                className="fixed bg-white shadow-md rounded border z-50"
                                style={{ top: menuPos.y, left: menuPos.x }}
                            >
                                <div
                                    onClick={(e) => e.stopPropagation()}
                                    className="hover:bg-gray-100 pb-1 pt-2 pl-2 pr-2 select-none"
                                >
                                    <div
                                        className={'container'}
                                        onClick={() => {
                                            console.log('edit: ');
                                            console.log(activeRequest);
                                            setMenuVisible(false);
                                        }}
                                    >
                                        <img
                                            src={edit}
                                            alt="(Edit icon)"
                                            className="pb-1 inline-flex max-w-[20px]"
                                        />{' '}
                                        <p className="inline-flex ml-1">Edit Service Request</p>
                                    </div>
                                </div>

                                <AlertDialog>
                                    <div>
                                        <AlertDialogTrigger
                                            onClick={(e) => e.stopPropagation()}
                                            className="hover:bg-gray-100 pb-2 pt-1 pl-2 pr-2"
                                        >
                                            <div className={'container'}>
                                                <img
                                                    src={deleteicon}
                                                    alt="(Delete icon)"
                                                    className="h-6 pb-1 inline-flex max-w-[20px]"
                                                />{' '}
                                                <p className="pt-2 inline-flex ml-1">
                                                    Delete Service Request
                                                </p>
                                            </div>
                                        </AlertDialogTrigger>

                                        <AlertDialogContent className="flex flex-col justify-between w-[600px] max-w-none p-8 rounded-lg border-3 border-[#003A96]">
                                            <AlertDialogHeader>
                                                <AlertDialogTitle className="text-2xl font-semibold text-[#003A96]">
                                                    Are you absolutely sure?
                                                </AlertDialogTitle>
                                                <AlertDialogDescription className="text-lg text-gray-700 mt-2">
                                                    This action cannot be undone. This will
                                                    permanently delete the service request and
                                                    remove the data from our servers.
                                                </AlertDialogDescription>
                                            </AlertDialogHeader>
                                            <AlertDialogFooter className="flex justify-center gap-6 mt-8">
                                                <AlertDialogCancel
                                                    className="px-6 py-2 pb-3 text-base font-medium text-white bg-[#003A96] hover:bg-blue-950 hover:text-white"
                                                    onClick={() => {
                                                        setMenuVisible(false);
                                                    }}
                                                >
                                                    Go Back
                                                </AlertDialogCancel>
                                                <AlertDialogAction
                                                    className="px-6 py-2 pb-3 text-base font-medium text-white bg-red-600 hover:bg-red-800"
                                                    onClick={() => {
                                                        console.log('delete: ');
                                                        console.log(activeRequest);
                                                        setMenuVisible(false);
                                                    }}
                                                >
                                                    Delete Request
                                                </AlertDialogAction>
                                            </AlertDialogFooter>
                                        </AlertDialogContent>
                                    </div>
                                </AlertDialog>
                            </div>
                        )}
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