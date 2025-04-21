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
import ServiceFormSideBar from "@/components/serviceRequest/ServiceFormSideBar.tsx";
import PageWrapper from '@/components/ui/PageWrapper.tsx';

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
    const [editPriority, setEditPriority] = useState(tableRequest.state?.ServiceRequest.priority);
    const [editStatus, setEditStatus] = useState(tableRequest.state?.ServiceRequest.status);
    const [pendingRequest, setPendingRequest] = useState<ServiceRequest | null>(null);
    const [swapMenu, setSwapMenu] = useState(false);
    const [exitMenu, setExitMenu] = useState(false);

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
        <PageWrapper open={true} contents={
            <nav
                className="w-full h-full bg-white p-6 overflow-hidden"
                style={{
                    borderTop: '4px solid #d9d9d9',
                    borderBottom: 'none',
                    borderRight: '4px solid #d9d9d9',
                    borderLeft: 'none',
                }}
            >
                <h3 className="text-2xl font-bold mb-4 font-[Poppins] text-center underline" style={{ color: '#003A96' }}>
                    Select a Request:
                </h3>{' '}
                {/*Header for list of departments on page*/}
                {filteredData && filteredData.length > 0 ? (
                    filteredData?.map((res) => (
                        <ul key={res.request_id} className="mb-2">
                            <button
                                onClick={() => {
                                    if (!selectedRequest) {
                                        console.log('SAFE SWAP!!!!!');
                                        setSelectedRequest(res);
                                        setEditMode(false);
                                        setEditPriority(res.priority);
                                        setEditStatus(res.status);
                                    } else {
                                        if (allowSwap(editPriority, editStatus, selectedRequest)) {
                                            console.log('SAFE SWAP!!!!!');
                                            setSelectedRequest(res);
                                            setEditMode(false);
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
                                    `w-full text-left block p-5 border rounded ${
                                        selectedRequest?.request_id == res.request_id
                                            ? 'border-4 text-blue-900 font-bold font-[Poppins]'
                                            : 'text-gray-700 hover:bg-gray-100 font-[Poppins]'
                                    }` /* Put requests in rounded rectangle boxes*/
                                }
                                style={{
                                    borderColor:
                                        selectedRequest?.request_id == res.request_id
                                            ? '#005E64'
                                            : '#003A96',
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
                                                    : 'N/A'}{' '}
                                (Priority:{' '}
                                <span
                                    className={
                                        res.priority === 'Low'
                                            ? 'text-green-600'
                                            : res.priority === 'Medium'
                                                ? 'text-yellow-600'
                                                : res.priority === 'High'
                                                    ? 'text-orange-600'
                                                    : res.priority === 'Emergency'
                                                        ? 'text-red-600'
                                                        : 'text-gray-600'
                                    }
                                >
                                    {res.priority}
                                </span>
                                )
                            </button>
                        </ul>
                    ))
                ) : (
                    <nav
                        className="border p-5 rounded-lg flex items-center"
                        style={{ borderColor: '#003A96' }}
                    >
                        <p className="text-gray-700 font-[Poppins]">No active service requests.</p>
                    </nav>
                )}
            </nav>} scaling = {3}>
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
                                console.log('Stay in edit mode, cancel exit')
                                setExitMenu(false);
                            }}
                            className="px-4 py-2 bg-white text-[#003A96] border-2 border-blue-950 w-auto rounded-lg hover:bg-gray-100"
                        >
                            Stay in Edit Mode
                        </button>

                        <button
                            onClick={() => {
                                if(selectedRequest) {
                                    console.log('Exit edit mode discard changes');
                                    setExitMenu(false);
                                    setEditMode(false);
                                    setEditPriority(selectedRequest.priority);
                                    setEditStatus(selectedRequest.status);
                                } else {
                                    console.log('You should not see this message -- in edit mode but no selected request?');
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
                className="h-auto flex-1 bg-white p-6"
                style={{
                    borderTop: '4px solid #d9d9d9',
                    borderBottom: 'none',
                    borderRight: 'none',
                    borderLeft: 'none',
                }}
            >
                {' '}
                {/*Border styling*/}
                <h3 className="text-2xl font-bold mb-4 font-[Poppins] text-center underline" style={{ color: '#003A96' }}>
                    Request Details:
                </h3>
                {selectedRequest ? (
                    <nav
                        className="border p-6 pl-4 rounded-lg text-blue-gray-900"
                        style={{ borderColor: '#003A96' }}
                    >
                        <div>
                            <div className="flex justify-between mx-auto border-b border-[#d9d9d9] pb-2 mb-3">
                                <h2 className="text-xl font-bold" style={{ color: '#003A96' }}>
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
                                                : 'N/A'}{' '}
                                    (Priority:{' '}
                                    <span
                                        className={
                                            selectedRequest.priority === 'Low'
                                                ? 'text-green-600'
                                                : selectedRequest.priority === 'Medium'
                                                  ? 'text-yellow-600'
                                                  : selectedRequest.priority === 'High'
                                                    ? 'text-orange-600'
                                                    : selectedRequest.priority === 'Emergency'
                                                      ? 'text-red-600'
                                                      : 'text-gray-600'
                                        }
                                    >
                                        {selectedRequest.priority}
                                    </span>
                                    )
                                </h2>
                                {/*ReqID. Type (Priority)*/}
                                <div className="flex gap-8">
                                    {!editMode ? (
                                        //If not in edit mode, show edit icon
                                        <EditRequest
                                            size={20}
                                            onClick={() => {
                                                console.log('Edit');
                                                console.log(selectedRequest);
                                                setEditMode(true);
                                            }}
                                            tooltip={'Edit Service Request'}
                                        />
                                    ) : (
                                        //If in edit mode, show exit icon
                                        <div className={''}>
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
                                                        setEditPriority(selectedRequest.priority);
                                                        setEditStatus(selectedRequest.status);
                                                    } else {
                                                        console.log(`Show exit menu`);
                                                        setExitMenu(true);
                                                    }
                                                }}
                                                tooltip={'Exit Edit Mode'}
                                            />
                                        </div>
                                    )}
                                    <DeleteRequest
                                        size={20}
                                        onClick={() => {
                                            console.log('Delete: ');
                                            console.log(selectedRequest);
                                        }}
                                        tooltip={'Delete Service Request'}
                                    />
                                </div>
                            </div>

                            {/*Request Type*/}
                            <h3
                                className="text-lg font-semibold font-[Poppins] py-1 underline"
                                style={{ color: '#005E64' }}
                            >
                                Request Type:{' '}
                            </h3>
                            <ul className="list-disc ml-6 mt-1 mb-3 font-semibold text-blue-gray-900">
                                <p>
                                    <i>
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
                                                    : 'N/A'}
                                    </i>
                                </p>
                            </ul>

                            {/*Render edit mode for priority status if true, else render normally*/}
                            {editMode ? (
                                <>
                                    <h3
                                        className="text-lg font-semibold font-[Poppins] py-1 underline"
                                        style={{ color: '#005E64' }}
                                    >
                                        Priority:{' '}
                                    </h3>

                                    {/*Priority Editing*/}
                                    <div className="flex flex-row row-2 gap-12 items-center mt-1 mb-3">
                                        <ServiceComponentDropdown
                                            value={editPriority}
                                            setState={setEditPriority}
                                            width={'w-[175px]'}
                                            options={[
                                                { value: 'Low', label: 'Low' },
                                                {
                                                    value: 'Medium',
                                                    label: 'Medium',
                                                },
                                                { value: 'High', label: 'High' },
                                                {
                                                    value: 'Emergency',
                                                    label: '🚨 Emergency 🚨',
                                                },
                                            ]}
                                            placeholder={selectedRequest.priority}
                                            originalValue={selectedRequest.priority}
                                            styledOptions={(option) =>
                                                `block font-[Poppins] text-med ${
                                                    option === 'Low'
                                                        ? 'text-green-600 font-semibold'
                                                        : option === 'Medium'
                                                          ? 'text-yellow-500 font-semibold'
                                                          : option === 'High'
                                                            ? 'text-red-500 font-semibold'
                                                            : option === 'Emergency'
                                                              ? 'text-red-700 underline font-semibold'
                                                              : 'text-blue-gray-900'
                                                }`
                                            }
                                        />
                                        <SubmitFormEdit
                                            label={'Submit Priority Change'}
                                            submitCondition={
                                                editPriority !== selectedRequest.priority
                                            }
                                            onSubmit={() => console.log('Allow submit (priority)')}
                                            onDeny={() => console.log('Deny submit (priority)')}
                                            errorMessage={'Error: No change made'}
                                            successMessage={'Priority successfully changed'}
                                            width={'w-[150px]'}
                                        />
                                    </div>

                                    <h3
                                        className="text-lg font-semibold font-[Poppins] py-1 underline"
                                        style={{ color: '#005E64' }}
                                    >
                                        Status:{' '}
                                    </h3>

                                    {/*Status Editing*/}
                                    <div className="flex flex-row row-2 gap-12 items-center mt-1 mb-3">
                                        <ServiceComponentDropdown
                                            value={editStatus}
                                            setState={setEditStatus}
                                            width={'w-[175px]'}
                                            options={['Unassigned', 'Assigned', 'Working', 'Done']}
                                            placeholder={selectedRequest.status}
                                            originalValue={selectedRequest.status}
                                            styledOptions={(option) =>
                                                `block font-[Poppins] text-med ${
                                                    option === 'Unassigned'
                                                        ? 'text-gray-500 font-semibold'
                                                        : option === 'Assigned'
                                                          ? 'text-blue-600 font-semibold'
                                                          : option === 'Working'
                                                            ? 'text-amber-600 font-semibold bg-blue-gray-900'
                                                            : option === 'Done'
                                                              ? 'text-green-600 font-semibold'
                                                              : 'text-blue-gray-900'
                                                }`
                                            }
                                        />

                                        <SubmitFormEdit
                                            label={'Submit Status Change'}
                                            submitCondition={editStatus !== selectedRequest.status}
                                            onSubmit={() => console.log('Allow submit (status)')}
                                            onDeny={() => console.log('Deny submit (status)')}
                                            errorMessage={'Error: No changes made'}
                                            successMessage={'Status successfully changed'}
                                            width={'w-[150px]'}
                                        />
                                    </div>
                                </>
                            ) : (
                                <>
                                    {/*Priority Normal*/}
                                    <h3
                                        className="text-lg font-semibold font-[Poppins] py-1 underline"
                                        style={{ color: '#005E64' }}
                                    >
                                        Priority:{' '}
                                    </h3>
                                    <ul className="list-disc ml-6 mb-3 mt-1">
                                        <p
                                            className={`block font-[Poppins] text-med font-semibold ${
                                                selectedRequest.priority === 'Low'
                                                    ? 'text-green-600'
                                                    : selectedRequest.priority === 'Medium'
                                                      ? 'text-yellow-500'
                                                      : selectedRequest.priority === 'High'
                                                        ? 'text-red-500'
                                                        : selectedRequest.priority === 'Emergency'
                                                          ? 'text-red-700 underline'
                                                          : 'text-blue-gray-900'
                                            }`}
                                        >
                                            {selectedRequest.priority}
                                        </p>
                                    </ul>

                                    {/*Status Normal*/}
                                    <h3
                                        className="text-lg font-semibold font-[Poppins] py-1 underline"
                                        style={{ color: '#005E64' }}
                                    >
                                        Status:{' '}
                                    </h3>
                                    <ul className="list-disc ml-6 mb-3 mt-1">
                                        <p
                                            className={`block font-[Poppins] text-med ${
                                                selectedRequest.status === 'Unassigned'
                                                    ? 'text-gray-500 font-semibold'
                                                    : selectedRequest.status === 'Assigned'
                                                      ? 'text-blue-600 font-semibold'
                                                      : selectedRequest.status === 'Working'
                                                        ? 'text-amber-600 font-semibold'
                                                        : selectedRequest.status === 'Done'
                                                          ? 'text-green-600 font-semibold'
                                                          : 'text-blue-gray-900'
                                            }`}
                                        >
                                            {selectedRequest.status}
                                        </p>
                                    </ul>
                                </>
                            )}

                            {/*Name (Employee ID: #)*/}
                            <h3
                                className="text-lg font-semibold font-[Poppins] py-1 underline"
                                style={{ color: '#005E64' }}
                            >
                                Name:{' '}
                            </h3>
                            <ul className="list-disc ml-6 mb-3 mt-1">
                                <p>
                                    {selectedRequest.name} (Employee ID:{' '}
                                    {selectedRequest.employee_id})
                                </p>
                            </ul>

                            {/*Request Details*/}
                            <h3
                                className="text-lg font-semibold font-[Poppins] py-1 underline"
                                style={{ color: '#005E64' }}
                            >
                                Request Details:{' '}
                            </h3>
                            <ul className="list-disc ml-6 mb-3 mt-1">
                                <p>
                                    {selectedRequest.sanitation?.cleaningType && (
                                        <>
                                            <span className="underline">Cleaning Type:</span>{' '}
                                            {selectedRequest.sanitation.cleaningType}{' '}
                                        </>
                                    )}
                                    {selectedRequest.language?.targetLanguage && (
                                        <>
                                            <span className="underline">Target Language:</span>{' '}
                                            {selectedRequest.language.targetLanguage}{' '}
                                        </>
                                    )}
                                    {selectedRequest.audioVisual?.accommodationType && (
                                        <>
                                            <span className="underline">Accommodation Type:</span>{' '}
                                            {selectedRequest.audioVisual.accommodationType}{' '}
                                        </>
                                    )}
                                    {selectedRequest.transportation?.transportationType && (
                                        <>
                                            <span className="underline">Transportation Type:</span>{' '}
                                            {selectedRequest.transportation.transportationType}{' '}
                                        </>
                                    )}
                                    {selectedRequest.security?.accessZones && (
                                        <>
                                            <span className="underline">Access Zones:</span>{' '}
                                            {selectedRequest.security.accessZones}{' '}
                                        </>
                                    )}
                                    <br />
                                    {selectedRequest.request_type === 'Sanitation' && (
                                        <>
                                            <span className="underline">Contaminant:</span>{' '}
                                            {selectedRequest.sanitation?.contaminant?.trim()
                                                ? selectedRequest.sanitation.contaminant
                                                : 'N/A'}
                                        </>
                                    )}
                                    {selectedRequest.language?.sourceLanguage && (
                                        <>
                                            <span className="underline">Source Language:</span>{' '}
                                            {selectedRequest.language.sourceLanguage}
                                        </>
                                    )}
                                    {selectedRequest.request_type === 'AudioVisual' && (
                                        <>
                                            <span className="underline">
                                                Accommodation Details:
                                            </span>{' '}
                                            {selectedRequest.audioVisual?.accommodationDetails?.trim()
                                                ? selectedRequest.audioVisual.accommodationDetails
                                                : 'N/A'}
                                        </>
                                    )}
                                    {selectedRequest.transportation?.transportationDestination && (
                                        <>
                                            <span className="underline">
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
                                            <span className="underline">Security Issue:</span>{' '}
                                            {selectedRequest.security.securityIssue}{' '}
                                        </>
                                    )}
                                </p>
                            </ul>

                            {/*Additional comments*/}
                            <h3
                                className="text-lg font-semibold font-[Poppins] py-1 underline"
                                style={{ color: '#005E64' }}
                            >
                                Additional Comments:{' '}
                            </h3>
                            <ul className="list-disc ml-6 mb-3 mt-1">
                                <p>
                                    {selectedRequest.additional_comments?.trim() ? (
                                        <i>{selectedRequest.additional_comments}</i>
                                    ) : (
                                        'N/A'
                                    )}
                                </p>
                            </ul>

                            {/*Location*/}
                            <h3
                                className="text-lg font-semibold font-[Poppins] py-1 underline"
                                style={{ color: '#005E64' }}
                            >
                                Location:{' '}
                            </h3>
                            <ul className="list-disc ml-6 mb-3 mt-1">
                                <p>{selectedRequest.location}</p>
                            </ul>

                            {/*Department*/}
                            <h3
                                className="text-lg font-semibold font-[Poppins] py-1 underline"
                                style={{ color: '#005E64' }}
                            >
                                Department:{' '}
                            </h3>
                            <ul className="list-disc ml-6 mb-3 mt-1">
                                <p>{selectedRequest.department}</p>
                            </ul>

                            {/*MONTH DAY, YEAR at HOUR:MINUTE:SECOND AM/PM (Request ID: #)*/}
                            <h3
                                className="text-lg font-semibold font-[Poppins] py-1 underline"
                                style={{ color: '#005E64' }}
                            >
                                Request Date:{' '}
                            </h3>
                            <ul className="list-disc ml-6 mb-3 mt-1">
                                <p>
                                    {new Date(selectedRequest.request_date).toLocaleDateString(
                                        undefined,
                                        {
                                            year: 'numeric',
                                            month: 'long',
                                            day: 'numeric',
                                            hour: 'numeric',
                                            minute: 'numeric',
                                            second: 'numeric',
                                        }
                                    )}{' '}
                                    (Request ID: {selectedRequest.request_id})
                                </p>
                            </ul>

                            {/*Request ID*/}
                            <h3
                                className="text-lg font-semibold font-[Poppins] py-1 underline"
                                style={{ color: '#005E64' }}
                            >
                                Request ID:{' '}
                            </h3>
                            <ul className="list-disc ml-6 mb-3 mt-1">
                                <p>#{selectedRequest.request_id}</p>
                            </ul>
                        </div>
                    </nav>
                ) : (
                    <>
                        {/*No service selected yet*/}
                        <div className="flex-1" style={{ borderColor: '#005E64' }}>
                            <nav
                                className="border p-5 rounded-lg flex items-center"
                                style={{ borderColor: '#005E64' }}
                            >
                                <p className="text-gray-700 font-[Poppins]">
                                    Select a service request to view details.
                                </p>
                            </nav>
                        </div>
                    </>
                )}{' '}
            </div>
        </nav>
        </PageWrapper>
    );
}
