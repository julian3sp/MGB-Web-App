import { trpc } from '../../lib/trpc.ts';
import DepartmentRoutes from '../departmentDirectory/DepartmentRoutes.tsx';
import DepartmentList from '../../components/DepartmentList.ts';
import { NavLink } from 'react-router-dom';
import { useEffect, useState } from 'react';
import type { ServiceRequest } from '@/types.tsx';
import { useRequestData } from '@/routes/requestDisplay/RequestDataContext.tsx';
import { useLocation } from 'react-router-dom';
import EditRequest from '@/components/ui/EditRequest.tsx';
import DeleteRequest from '@/components/ui/DeleteRequest.tsx';
import { ServiceComponentDropdown } from '@/components/serviceRequest/inputFields/ServiceComponentDropdown.tsx';
import FilterIcon from '../../../assets/FilterIcon.png';
import SubmitFormEdit from '@/components/ui/SubmitFormEdit.tsx';
import ExitButton from '@/components/ui/ExitButton.tsx';
import ServiceFormSideBar from '@/components/serviceRequest/ServiceFormSideBar.tsx';
import PageWrapper from '@/components/ui/PageWrapper.tsx';
import ServiceRequestPage from '@/routes/ServiceRequestPage.tsx';

/*
function formatPhoneNumber(phone: string): string {
// Get rid of all non numbers
const digits = phone.replace(/\D/g, '');

if (digits.length !== 10) return phone; // if not 10 numbers just return original string

const start = digits.slice(0, 3);
const middle = digits.slice(3, 6);
const end = digits.slice(6, 10);

return `(${start}) ${middle}-${end}`;
*/

export default function RequestListPage() {
    const tableRequest = useLocation();
    const { filteredData, isLoading, error } = useRequestData();
    const [selectedRequest, setSelectedRequest] = useState<ServiceRequest | null>(
        tableRequest.state?.ServiceRequest
    );
    const [editMode, setEditMode] = useState(tableRequest.state?.editMode);
    const [editId, setEditId] = useState(tableRequest.state?.ServiceRequest.request_id);
    const [editPriority, setEditPriority] = useState(tableRequest.state?.ServiceRequest.priority);
    const [editStatus, setEditStatus] = useState(tableRequest.state?.ServiceRequest.status);
    const [pendingRequest, setPendingRequest] = useState<ServiceRequest | null>(null);
    const [swapMenu, setSwapMenu] = useState(false);
    const [exitMenu, setExitMenu] = useState(false);

    const deleteRequest = trpc.deleteRequest.useMutation();
    const updateRequest = trpc.updateRequest.useMutation();

    const handleDelete = () => {
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

    const handleUpdate = () => {
        console.log('Trying to update:', selectedRequest);

        if (!selectedRequest?.priority) {
            console.error('No request selected');
            return;
        }

        updateRequest.mutate(
            { priority: editPriority, status: editStatus, request_id: selectedRequest.request_id },
            {
                onSuccess: () => {
                    console.log('Request updated');
                    window.location.reload();
                    //window.location.href = 'http://localhost:3000/requests/table'
                },
                onError: (error) => {
                    console.error('Error updating request:', error);
                },
            }
        );
    };

    if (isLoading) return <p>Loading...</p>;
    if (error) return <p>Error: {error.message}</p>;

    function allowSwap(
        editPriorityValue: string,
        editStatusValue: string,
        originalRequest: ServiceRequest
    ): boolean {
        if (
            !editPriorityValue ||
            !editMode ||
            (editMode &&
                editPriorityValue === originalRequest.priority &&
                editStatusValue === originalRequest.status)
        ) {
            console.log('no unsaved edits');
            console.log(`Edit Priority: ${editPriorityValue}`);
            console.log(`Original Priority: ${originalRequest.priority}`);
            console.log(`Edit Status: ${editStatusValue}`);
            console.log(`Original Status: ${originalRequest.status}`);
            return true;
        } else {
            console.log('some unsaved edits');
            console.log(`Edit Priority: ${editPriorityValue}`);
            console.log(`Original Priority: ${originalRequest.priority}`);
            console.log(`Edit Status: ${editStatusValue}`);
            console.log(`Original Status: ${originalRequest.status}`);
            return false;
        }
    }

    return (
        <PageWrapper
            open={true}
            contents={
                <nav className="w-full h-300 bg-white border-1 overflow-scroll overflow-x-hidden scrollbar-thin scrollbar-thumb-yellow-500 hover:scrollbar-thumb-blue-700  border-light p-6 overflow-hidden shadow-lg">
                    <h3
                        className="text-2xl font-bold mb-4 font-[Poppins] text-center"
                        style={{ color: '#003A96' }}
                    >
                        Select a Request:
                    </h3>{' '}
                    {/*Header for list of departments on page*/}
                    {filteredData && filteredData.length > 0 ? (
                        filteredData?.map((res) => (
                            <ul key={res.request_id} className="mb-4 text-[14pt] group">
                                <button
                                    onClick={() => {
                                        if (!selectedRequest) {
                                            console.log('SAFE SWAP!!!!!');
                                            setSelectedRequest(res);
                                            setEditMode(false);
                                            setEditId(res.request_id);
                                            setEditPriority(res.priority);
                                            setEditStatus(res.status);
                                        } else {
                                            if (
                                                allowSwap(editPriority, editStatus, selectedRequest)
                                            ) {
                                                console.log('SAFE SWAP!!!!!');
                                                setSelectedRequest(res);
                                                setEditMode(false);
                                                setEditId(res.request_id);
                                                setEditPriority(res.priority);
                                                setEditStatus(res.status);
                                            } else {
                                                console.log('UNSAFE SWAP!!!!!');
                                                setSwapMenu(true);
                                                console.log(swapMenu);
                                                setPendingRequest(res);
                                                console.log(pendingRequest);
                                            }
                                        }
                                    }}
                                    className={
                                        `w-full text-left block p-5  rounded-lg border-1 border-[#44A6A6]  ${
                                            selectedRequest?.request_id == res.request_id
                                                ? 'text-white bg-[#003a96]  font-[Poppins] hover:border-b-5 border-b-5 border-b-[#44A6A6] border-[#44A6A6] shadow-md'
                                                : 'text-gray-700 hover:bg-white hover:text-gray-700 border-b-1 hover:border-b-[5px] hover:border-b-[#44A6A6] transition-all duration-150 font-[Poppins] shadow-lg'
                                        }` /* Put requests in rounded rectangle boxes*/
                                    }
                                    style={{
                                        borderColor:
                                            selectedRequest?.request_id == res.request_id
                                                ? 'light-grey'
                                                : 'light-grey',
                                        borderWidth: '1 px',
                                        borderStyle: 'solid',
                                    }}
                                >
                                    {res.request_id}.{' '}
                                    {res.request_type === 'Sanitation'
                                        ? 'Sanitation'
                                        : res.request_type === 'Transportation'
                                          ? 'Transportation'
                                          : res.request_type === 'Security'
                                            ? 'Security'
                                            : res.request_type === 'AudioVisual'
                                              ? 'Audio/Visual Accommodations'
                                              : res.request_type === 'Language'
                                                ? 'Language Interpreter'
                                                : res.request_type === 'MedicalDevice'
                                                  ? 'Medical Device'
                                                  : res.request_type === 'Facilities'
                                                    ? 'Facilities'
                                                    : 'N/A'}{' '}
                                    (Priority: <span>{res.priority}</span>)
                                </button>
                            </ul>
                        ))
                    ) : (
                        <nav
                            className="border p-5
                             flex items-center"
                            style={{ borderColor: '#003A96' }}
                        >
                            <p className="text-gray-700 font-[Poppins]">
                                No active service requests.
                            </p>
                        </nav>
                    )}
                </nav>
            }
            scaling={3}
        >
            <nav className="min-h-screen flex flex-1 font-[Poppins]">
                {swapMenu && pendingRequest && (
                    <div className="fixed top-1/2 left-1/2 z-50 transform -translate-x-1/2 -translate-y-1/2 bg-white border rounded-lg shadow-lg p-6 w-[450px] border-[#003A96] border-1">
                        <h3 className="font-bold text-xl text-center text-[#003A96]">
                            Are you sure? You will lose any unsaved changes.
                        </h3>
                        <div className="w-full flex flex-rows justify-center gap-4 pt-2">
                            <button
                                onClick={() => {
                                    setSwapMenu(false);
                                    setPendingRequest(null);
                                }}
                                className="px-4 py-2 bg-white text-[#003A96] border-2 border-blue-950 w-auto rounded-lg hover:bg-gray-100"
                            >
                                Go Back
                            </button>

                            <button
                                onClick={() => {
                                    setSwapMenu(false);
                                    if (pendingRequest) {
                                        console.log('IGNORE AND SWAP');
                                        setSelectedRequest(pendingRequest);
                                        setEditMode(false);
                                        setEditPriority(pendingRequest.priority);
                                        setEditStatus(pendingRequest.status);
                                        setPendingRequest(null);
                                    }
                                }}
                                className="px-4 py-2 bg-[#003A96] border-2 border-blue-950 w-auto text-white rounded-lg hover:bg-blue-950"
                            >
                                Continue Anyways
                            </button>
                        </div>
                    </div>
                )}
                {exitMenu && (
                    <div className="fixed top-1/2 left-1/2 z-50 transform -translate-x-1/2 -translate-y-1/2 bg-white border rounded-lg shadow-lg p-6 w-[450px] border-[#003A96] border-1">
                        <h3 className="font-bold text-xl text-center text-[#003A96]">
                            Are you sure? You will lose any unsaved changes.
                        </h3>
                        <div className="w-full flex flex-rows justify-center gap-4 pt-4">
                            <button
                                onClick={() => {
                                    console.log('Stay in edit mode, cancel exit');
                                    setExitMenu(false);
                                }}
                                className="px-4 py-2 bg-white text-[#003A96] border-2 border-blue-950 w-auto rounded-lg hover:bg-gray-100"
                            >
                                Stay in Edit Mode
                            </button>

                            <button
                                onClick={() => {
                                    if (selectedRequest) {
                                        console.log('Exit edit mode discard changes');
                                        setExitMenu(false);
                                        setEditMode(false);
                                        setEditId(selectedRequest.request_id);
                                        setEditPriority(selectedRequest.priority);
                                        setEditStatus(selectedRequest.status);
                                    } else {
                                        console.log(
                                            'You should not see this message -- in edit mode but no selected request?'
                                        );
                                    }
                                }}
                                className="px-4 py-2 bg-[#003A96] border-2 border-blue-950 w-auto text-white rounded-lg hover:bg-blue-950"
                            >
                                Exit Edit Mode
                            </button>
                        </div>
                    </div>
                )}

                <div
                    className="h-auto flex-1 bg-white p-6 pl-5"
                    style={{
                        borderTop: '1px solid lightgrey',
                        borderBottom: 'none',
                        borderRight: 'none',
                        borderLeft: 'none',
                    }}
                >
                    {' '}
                    {/*Border styling*/}
                    <h3
                        className="text-2xl font-bold mb-4  font-[Poppins] text-center"
                        style={{ color: '#003A96' }}
                    >
                        Request Details:
                    </h3>
                    {selectedRequest ? (
                        <nav className="shadow-md rounded-sm min-h-220 border-1 border-[#44A6A6] rounded-tl-xl rounded-tr-xl rounded-xl text-blue-gray-900">
                            <div>
                                <div className="flex justify-between border-b-5 border-b-[#44A6A6]  bg-[#003A96] rounded-tl-lg rounded-tr-lg border-[#d9d9d9] mb-3 ">
                                    <h2 className="text-xl  p-5 " style={{ color: 'white' }}>
                                        {selectedRequest.request_id}.{' '}
                                        {selectedRequest.request_type === 'Sanitation'
                                            ? 'Sanitation'
                                            : selectedRequest.request_type === 'Transportation'
                                              ? 'Transportation'
                                              : selectedRequest.request_type === 'Security'
                                                ? 'Security'
                                                : selectedRequest.request_type === 'AudioVisual'
                                                  ? 'Audio/Visual Accommodations'
                                                  : selectedRequest.request_type === 'Language'
                                                    ? 'Language Interpreter'
                                                    : selectedRequest.request_type ===
                                                        'MedicalDevice'
                                                      ? 'Medical Device'
                                                      : selectedRequest.request_type ===
                                                          'Facilities'
                                                        ? 'Facilities'
                                                        : 'N/A'}{' '}
                                        (Priority: <span>{selectedRequest.priority}</span>)
                                    </h2>
                                    {/*ReqID. Type (Priority)*/}
                                    <div className="relative-top-[12px] flex gap-4 pl-4 pt-4  pr-3">
                                        <div className="h-[35px] flex items-center gap-4">
                                            {!editMode ? (
                                                <div className="relative top-[4px] ">
                                                    <EditRequest
                                                        size={20}
                                                        onClick={() => {
                                                            console.log('Edit');
                                                            console.log(selectedRequest);
                                                            setEditMode(true);
                                                        }}
                                                        tooltip={'Edit Service Request'}
                                                        blue={false}
                                                    />
                                                </div>
                                            ) : (
                                                <>
                                                    <SubmitFormEdit
                                                        label={'Submit Changes'}
                                                        submitCondition={true}
                                                        onSubmit={handleUpdate}
                                                        onDeny={() =>
                                                            console.log('Deny submit (status)')
                                                        }
                                                        errorMessage={'Error: No changes made'}
                                                        successMessage={
                                                            'Status successfully changed'
                                                        }
                                                        width={'w-[150px]'}
                                                    />
                                                    <ExitButton
                                                        size={24}
                                                        onClick={() => {
                                                            if (
                                                                allowSwap(
                                                                    editPriority,
                                                                    editStatus,
                                                                    selectedRequest
                                                                )
                                                            ) {
                                                                console.log('Exit edit');
                                                                setEditMode(false);
                                                                setEditId(
                                                                    selectedRequest?.request_id
                                                                );
                                                                setEditPriority(
                                                                    selectedRequest.priority
                                                                );
                                                                setEditStatus(
                                                                    selectedRequest.status
                                                                );
                                                            } else {
                                                                console.log(`Show exit menu`);
                                                                setExitMenu(true);
                                                            }
                                                        }}
                                                        tooltip={'Exit Edit Mode'}
                                                    />
                                                </>
                                            )}
                                        </div>
                                        <DeleteRequest
                                            size={20}
                                            onClick={() => {
                                                if (
                                                    window.sessionStorage.getItem('isAdmin') ===
                                                    'true'
                                                ) {
                                                    console.log('Delete: ');
                                                    console.log(selectedRequest);
                                                    handleDelete();
                                                } else {
                                                    console.log('Insufficient Permissions');
                                                }
                                            }}
                                            tooltip={'Delete Service Request'}
                                            blue={false}
                                        />
                                    </div>
                                </div>
                                <div className="grid grid-cols-2 h-120 pl-5 pr-5 mb-10 mt-1">
                                    <div className={'border-1 border-[#44A6A6] shadow-sm rounded-lg p-3 m-5'}>
                                    <div className={'p-2 '}>
                                        {/*Request Type*/}
                                        <h3
                                            className="text-xl font-semibold font-[Poppins] py-1 "
                                            style={{ color: '#003A96' }}
                                        >
                                            Request Type:{' '}
                                        </h3>
                                        <ul className="list-disc ml-6 mt-1 mb-3 text-blue-gray-900">
                                            <p>
                                                <p className={'text-[15pt]'}>
                                                    {selectedRequest.request_type === 'Sanitation'
                                                        ? 'Sanitation'
                                                        : selectedRequest.request_type ===
                                                        'Transportation'
                                                            ? 'Transportation'
                                                            : selectedRequest.request_type ===
                                                            'Security'
                                                                ? 'Security'
                                                                : selectedRequest.request_type ===
                                                                'AudioVisual'
                                                                    ? 'Audio/Visual Accommodations'
                                                                    : selectedRequest.request_type ===
                                                                    'Language'
                                                                        ? 'Language Interpreter'
                                                                        : selectedRequest.request_type ===
                                                                        'MedicalDevice'
                                                                            ? 'Medical Device'
                                                                            : selectedRequest.request_type ===
                                                                            'Facilities'
                                                                                ? 'Facilities'
                                                                                : 'N/A'}
                                                </p>
                                            </p>
                                        </ul>
                                    </div>
                                    <div className={'p-2   '}>
                                        {/*Request ID*/}
                                        <h3
                                            className="text-xl font-semibold font-[Poppins] py-1 "
                                            style={{ color: '#003A96' }}
                                        >
                                            Request ID:{' '}
                                        </h3>
                                        <ul className="list-disc  ml-6 mb-3 mt-1">
                                            <p className={'text-[15pt]'}>
                                                #{selectedRequest.request_id}
                                            </p>
                                        </ul>
                                    </div>
                                    <div className={'p-2   '}>
                                        {/*MONTH DAY, YEAR at HOUR:MINUTE:SECOND AM/PM (Request ID: #)*/}
                                        <h3
                                            className="text-xl font-semibold font-[Poppins] py-1 "
                                            style={{ color: '#003A96' }}
                                        >
                                            Request Date:{' '}
                                        </h3>
                                        <ul className="list-disc ml-6 mb-3 mt-1">
                                            <p className={'text-[15pt]'}>
                                                {new Date(
                                                    selectedRequest.request_date
                                                ).toLocaleDateString(undefined, {
                                                    year: 'numeric',
                                                    month: 'long',
                                                    day: 'numeric',
                                                    hour: 'numeric',
                                                    minute: 'numeric',
                                                    second: 'numeric',
                                                })}{' '}
                                                (Request ID: {selectedRequest.request_id})
                                            </p>
                                        </ul>
                                    </div>
                                    {editMode ? (
                                        <div >
                                            {/* Priority Edit */}
                                            <div>
                                                <h3 className="text-xl font-semibold font-[Poppins] py-1" style={{ color: '#003A96' }}>
                                                    Priority:
                                                </h3>
                                                <div className="flex flex-row gap-4 items-center mt-1 mb-3">
                                                    <ServiceComponentDropdown
                                                        value={editPriority}
                                                        setState={setEditPriority}
                                                        width={'w-[175px]'}
                                                        options={[
                                                            { value: 'Low', label: 'Low' },
                                                            { value: 'Medium', label: 'Medium' },
                                                            { value: 'High', label: 'High' },
                                                            { value: 'Emergency', label: 'Emergency' },
                                                        ]}
                                                        placeholder={selectedRequest.priority}
                                                        originalValue={selectedRequest.priority}
                                                    />
                                                </div>
                                            </div>

                                            {/* Status Edit */}
                                            <div>
                                                <h3 className="text-xl font-semibold font-[Poppins] py-1" style={{ color: '#003A96' }}>
                                                    Status:
                                                </h3>
                                                <div className="flex flex-row gap-4 items-center mt-1 mb-3">
                                                    <ServiceComponentDropdown
                                                        value={editStatus}
                                                        setState={setEditStatus}
                                                        width={'w-[175px]'}
                                                        options={['Unassigned', 'Assigned', 'Working', 'Done']}
                                                        placeholder={selectedRequest.status}
                                                        originalValue={selectedRequest.status}
                                                    />
                                                </div>
                                            </div>
                                        </div>
                                    ) : (
                                        <>
                                            {/* Priority Display */}
                                            <div>
                                                <h3 className="text-xl font-semibold font-[Poppins] py-1 pl-2" style={{ color: '#003A96' }}>
                                                    Priority:
                                                </h3>
                                                <ul className="list-disc ml-6 mb-3 mt-1 pl-2">
                                                    <p className="text-[15pt]">{selectedRequest.priority}</p>
                                                </ul>
                                            </div>

                                            {/* Status Display */}
                                            <div>
                                                <h3 className="text-xl font-semibold font-[Poppins] py-0 pl-2" style={{ color: '#003A96' }}>
                                                    Status:
                                                </h3>
                                                <ul className="list-disc ml-6 mb-3 mt-1 pl-2">
                                                    <p className="text-[15pt]">{selectedRequest.status}</p>
                                                </ul>
                                            </div>
                                        </>
                                    )}
                                    </div>
<div>
                                    <div className={'border-1 border-[#44A6A6] shadow-sm rounded-lg p-3 m-5'}>
                                    <div>
                                            {/*Name (Employee ID: #)*/}
                                            <h3
                                                className="text-xl pl-2 font-semibold font-[Poppins] py-1  "
                                                style={{ color: '#003A96' }}
                                            >
                                                Name:{' '}
                                            </h3>
                                            <ul className="list-disc ml-6 mb-3 mt-1">
                                                <p className={'text-[15pt]'}>
                                                    {selectedRequest.name} (Employee ID:{' '}
                                                    {selectedRequest.employee_id})
                                                </p>
                                            </ul>
                                        </div>
                                    <div className={'p-2   '}>

                                        {/*Location*/}
                                        <h3
                                            className="text-xl font-semibold font-[Poppins] py-1 "
                                            style={{ color: '#003A96' }}
                                        >
                                            Location:{' '}
                                        </h3>
                                        <ul className="list-disc ml-6 mb-3 mt-1">
                                            <p className={'text-[15pt]'}>
                                                {selectedRequest.location}
                                            </p>
                                        </ul>
                                    </div>
                                    <div className={'p-2   '}>
                                        {/*Department*/}
                                        <h3
                                            className="text-xl font-semibold font-[Poppins] py-1 "
                                            style={{ color: '#003A96' }}
                                        >
                                            Department:{' '}
                                        </h3>
                                        <ul className="list-disc ml-6 mb-3 mt-1">
                                            <p className={'text-[15pt]'}>
                                                {selectedRequest.department}
                                            </p>
                                        </ul>
                                    </div>
                                    </div>
                                    <div className={'border-1 border-[#44A6A6] shadow-sm rounded-lg p-3 m-5'}>
                                        <div className={'p-2   '}>
                                            {/*Request Details*/}
                                            <h3
                                                className="text-xl font-semibold font-[Poppins] py-1 "
                                                style={{ color: '#003A96' }}
                                            >
                                                Request Details:{' '}
                                            </h3>
                                            <ul className="list-disc ml-6 mb-3 mt-1">
                                                <p className={'text-[15pt]'}>
                                                    {selectedRequest.sanitation?.cleaningType && (
                                                        <>
                                                            <span className="">Cleaning Type:</span>{' '}
                                                            {
                                                                selectedRequest.sanitation.cleaningType
                                                            }{' '}
                                                        </>
                                                    )}
                                                    {selectedRequest.language?.targetLanguage && (
                                                        <>
                                                            <span className="">Target Language:</span>{' '}
                                                            {
                                                                selectedRequest.language.targetLanguage
                                                            }{' '}
                                                        </>
                                                    )}
                                                    {selectedRequest.audioVisual?.accommodationType && (
                                                        <>
                                                        <span className="">
                                                            Accommodation Type:
                                                        </span>{' '}
                                                            {
                                                                selectedRequest.audioVisual
                                                                    .accommodationType
                                                            }{' '}
                                                        </>
                                                    )}
                                                    {selectedRequest.transportation
                                                        ?.transportationType && (
                                                        <>
                                                        <span className="">
                                                            Transportation Type:
                                                        </span>{' '}
                                                            {
                                                                selectedRequest.transportation
                                                                    .transportationType
                                                            }{' '}
                                                        </>
                                                    )}
                                                    {selectedRequest.security?.accessZones && (
                                                        <>
                                                            <span className="">Access Zones:</span>{' '}
                                                            {selectedRequest.security.accessZones}{' '}
                                                        </>
                                                    )}
                                                    {selectedRequest.medicalDevice?.device && (
                                                        <>
                                                            <span className="">Medical Device:</span>{' '}
                                                            {selectedRequest.medicalDevice.device}
                                                        </>
                                                    )}
                                                    {selectedRequest.facilities?.maintenanceType && (
                                                        <>
                                                            <span className="">Maintenance Type:</span>{' '}
                                                            {selectedRequest.facilities.maintenanceType}
                                                        </>
                                                    )}
                                                    <br />
                                                    {selectedRequest.request_type === 'Sanitation' && (
                                                        <>
                                                            <span className="">Contaminant:</span>{' '}
                                                            {selectedRequest.sanitation?.contaminant?.trim()
                                                                ? selectedRequest.sanitation.contaminant
                                                                : 'N/A'}
                                                        </>
                                                    )}
                                                    {selectedRequest.language?.sourceLanguage && (
                                                        <>
                                                            <span className="">Source Language:</span>{' '}
                                                            {selectedRequest.language.sourceLanguage}
                                                        </>
                                                    )}
                                                    {selectedRequest.request_type === 'AudioVisual' && (
                                                        <>
                                                        <span className="">
                                                            Accommodation Details:
                                                        </span>{' '}
                                                            {selectedRequest.audioVisual?.accommodationDetails?.trim()
                                                                ? selectedRequest.audioVisual
                                                                    .accommodationDetails
                                                                : 'N/A'}
                                                        </>
                                                    )}
                                                    {selectedRequest.transportation
                                                        ?.transportationDestination && (
                                                        <>
                                                        <span className="">
                                                            Transportation Destination:
                                                        </span>{' '}
                                                            {
                                                                selectedRequest.transportation
                                                                    .transportationDestination
                                                            }{' '}
                                                        </>
                                                    )}
                                                    {selectedRequest.security?.securityIssue && (
                                                        <>
                                                            <span className="">Security Issue:</span>{' '}
                                                            {
                                                                selectedRequest.security.securityIssue
                                                            }{' '}
                                                        </>
                                                    )}
                                                    {selectedRequest.medicalDevice
                                                        ?.operatorRequired && (
                                                        <>
                                                            <span className="">Operator Required?</span>{' '}
                                                            {
                                                                selectedRequest.medicalDevice
                                                                    .operatorRequired
                                                            }
                                                        </>
                                                    )}
                                                    {selectedRequest.facilities?.equipmentType && (
                                                        <>
                                                            <span className="">Equipment Type:</span>{' '}
                                                            {selectedRequest.facilities.equipmentType}
                                                        </>
                                                    )}
                                                </p>
                                            </ul>
                                        </div>
                                    </div>
                                </div>





                                </div>
                                <div className={'border-1 border-[#44A6A6] shadow-sm rounded-lg ml-10 mr-10 mt-15 p-3 m-5'}>
                                    {/*Additional comments*/}
                                    <h3
                                        className="text-xl font-semibold p-3 font-[Poppins] py-1 "
                                        style={{ color: '#003A96' }}
                                    >
                                        Additional Comments:{' '}
                                    </h3>
                                    <div >
                                    <ul className="list-disc ml-3 mb-3 mt-3">
                                        <p className={'text-[15pt]'}>
                                            {selectedRequest.additional_comments?.trim() ? (
                                                <p>{selectedRequest.additional_comments}</p>
                                            ) : (
                                                'N/A'
                                            )}
                                        </p>
                                    </ul>
                                    </div>
                                </div>

                            </div>

                        </nav>
                    ) : (
                        <>
                            {/*No service selected yet*/}
                            <nav
                                className="border p-5 py-[22px] border-1 border-[#44A6A6] rounded-lg flex items-center shadow-md"
                            >
                                <p className="text-gray-700 font-[Poppins]">
                                    Select a service request to view details.
                                </p>
                            </nav>
                        </>
                    )}{' '}
                </div>
            </nav>
        </PageWrapper>
    );
}
