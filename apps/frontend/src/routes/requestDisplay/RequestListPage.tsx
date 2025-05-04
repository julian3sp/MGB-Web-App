import { trpc } from '../../lib/trpc.ts';
import DepartmentRoutes from '../departmentDirectory/DepartmentRoutes.tsx';
import DepartmentList from '../../components/DepartmentList.ts';
import { NavLink } from 'react-router-dom';
import {useEffect, useRef, useState} from 'react';
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
import SendIcon from '../../../assets/SendIcon.png';
import EditIcon from '../../../assets/EditIcon.png';
import EditIconWhite from '../../../assets/EditIconWhite.png';

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

type RequestListPageProps = {
    userRole: string;
    userName: string;
}

export default function RequestListPage({userRole, userName}: RequestListPageProps) {
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
    const [text, setText] = useState("");
    const[response, setResponse] = useState("")

    const [isChatOpen, setIsChatOpen] = useState(false);
    const [chatText, setChatText] = useState("");
    const [chatMessages, setChatMessages] = useState<{ sender: string; text: string }[]>([]);

    const deleteRequest = trpc.deleteRequest.useMutation();
    const updateRequest = trpc.updateRequest.useMutation();

    const [openChat, setOpenChat] = useState(false);
    const exampleMessages = [
        {
            name: 'Alice',
            message:
                "This is message one and I'm going to make the message a bit longer than this so I can see how the message wrapping works",
            timestamp: new Date('2025-05-02T23:56:12'),
        },
        {
            name: 'Bob',
            message: 'Message 2',
            timestamp: new Date('2025-05-02T23:58:45'),
        },
        {
            name: 'Charlie',
            message: 'Message on a new day',
            timestamp: new Date('2025-05-03T00:02:04'),
        },
        {
            name: 'Diana',
            message: 'Follow-up on May 3rd',
            timestamp: new Date('2025-05-03T13:24:10'),
        },
        {
            name: 'Elliot',
            message: 'First message for May 4th',
            timestamp: new Date('2025-05-04T09:10:02'),
        },
        {
            name: 'Fiona',
            message: 'another.',
            timestamp: new Date('2025-05-04T13:37:44'),
        },
        {
            name: 'George',
            message: 'again.',
            timestamp: new Date('2025-05-04T17:55:22'),
        },
        {
            name: 'Hannah',
            message: 'new day.',
            timestamp: new Date('2025-05-05T08:01:11'),
        },
    ];

    const groupByDate = (messages: typeof exampleMessages) => {
        const grouped: Record<string, typeof exampleMessages> = {};

        messages.forEach((msg) => {
            const dateKey = msg.timestamp.toLocaleDateString(undefined, {
                year: 'numeric',
                month: 'long',
                day: 'numeric',
            });

            if (!grouped[dateKey]) grouped[dateKey] = [];
            grouped[dateKey].push(msg);
        });

        return grouped;
    };
    const groupedMessages = groupByDate(exampleMessages);

    const chatRef = useClickOutside(() => {
        setOpenChat(false);
    });

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
    const handleChat = () => {
        if(text){
            setResponse("Currently all our operators are ocupated please reach out later. Meanwhile you could either go to a phisical location or chat with out AI assistant")
        }
    }

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

    const handleChatSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        if (!chatText.trim()) return;

        setChatMessages((prev) => [...prev, { sender: "user", text: chatText }]);
        setChatText("");

        // Add response message
        setChatMessages((prev) => [...prev, { 
            sender: "ai", 
            text: "Currently all our operators are occupied. Please reach out later or use our AI assistant." 
        }]);
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

    const sortedData = filteredData
        ?.slice()
        .sort((a, b) => new Date(b.request_date).getTime() - new Date(a.request_date).getTime());

    return (
        <div className={'flex gap-x-10 font-[Poppins]'}>
            <PageWrapper
                contents={
                    <nav className="rounded-4xl ml-5 m-5 shadow-lg">
                        <div
                            className={
                                'bg-[#003A96] pt-3 pl-3 pr-3 pb-3 border-1 border-b-5   border-[#44A6A6] border-b-[#44A6A6] rounded-tr-3xl rounded-tl-3xl    '
                            }
                        >
                            <h3 className="text-[14pt]  p-[8px]  font-[Poppins] text-white text-center">
                                Select a Request:
                            </h3>
                        </div>
                        <div
                            className={
                                'overflow-y-auto  bg-blue-100  rounded-br-3xl rounded-bl-3xl pl-5 pr-5 pt-3 min-h-200  scrollbar-thin scrollbar-thumb-[#bbbbbb] scrollbar-track-blue-100 '
                            }
                        >
                            {/*Header for list of departments on page*/}
                            {sortedData && sortedData.length > 0 ? (
                                sortedData.map((res) => (
                                    <ul key={res.request_id} className="mb-4 text-[12pt] group">
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
                                                        allowSwap(
                                                            editPriority,
                                                            editStatus,
                                                            selectedRequest
                                                        )
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
                                            className={`w-full text-left block p-5 rounded-lg ${
                                                selectedRequest?.request_id == res.request_id
                                                    ? 'text-white bg-[#003a96] font-[Poppins] border-b-5 border-[#44A6A6] shadow-md'
                                                    : 'text-gray-700 hover:text-gray-700 bg-white hover:border-b-5 border-[#44A6A6] transition-all font-[Poppins] shadow-lg'
                                            }`}
                                        >
                                            {res.request_type === 'Sanitation'
                                                ? 'Sanitation Request'
                                                : res.request_type === 'Transportation'
                                                  ? 'Transportation Request'
                                                  : res.request_type === 'Security'
                                                    ? 'Security Request'
                                                    : res.request_type === 'AudioVisual'
                                                      ? 'Audio/Visual Request'
                                                      : res.request_type === 'Language'
                                                        ? 'Language Interpreter Request'
                                                        : res.request_type === 'MedicalDevice'
                                                          ? 'Medical Device Request'
                                                          : res.request_type === 'Facilities'
                                                            ? 'Facilities Request'
                                                            : 'N/A'}{' '}
                                            <span>
                                                (
                                                {new Date(res.request_date).toLocaleDateString(
                                                    'en-US',
                                                    {
                                                        year: 'numeric',
                                                        month: '2-digit',
                                                        day: '2-digit',
                                                    }
                                                )}
                                                )
                                            </span>
                                        </button>
                                    </ul>
                                ))
                            ) : (
                                <nav
                                    className="border p-5 flex items-center"
                                    style={{ borderColor: '#003A96' }}
                                >
                                    <p className="text-gray-700 font-[Poppins]">
                                        No active service requests.
                                    </p>
                                </nav>
                            )}
                        </div>
                    </nav>
                }
                scaling={3}
                open={true}
                absolute={true}
                x={-70}
                y={35}
                xOut={10}
            ></PageWrapper>
            <nav className="min-h-screen flex flex-1 m-5 font-[Poppins]">
                {swapMenu && pendingRequest && (
                    <div className="fixed top-1/2 left-1/2 z-50 transform -translate-x-1/2 -translate-y-1/2 bg-white border rounded-lg shadow-lg p-6 w-[450px] border-[#003A96] border-1">
                        <h3 className="font-bold text-[14pt] text-center text-[#003A96]">
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
                        <h3 className="font-bold text-[14pt] text-center text-[#003A96]">
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
                {openChat && (
                    <div className="fixed inset-0 bg-black/60 flex items-center justify-center z-100 font-[Poppins]">
                        <div ref={chatRef} className="relative w-full max-w-2xl h-[70vh] bg-white rounded-lg shadow-lg flex flex-col overflow-scroll">
                            <button
                                onClick={() => setOpenChat(false)}
                                className="absolute top-2 right-2 text-white text-2xl font-semibold cursor-pointer"
                            >
                                &times;
                            </button>

                            <div className="bg-[#003a96] text-white text-lg font-semibold px-4 py-2 rounded-t-lg border-b-5 border-[#44a6a6]">
                                Terminal Chat
                            </div>

                            {/* Messages */}
                            <div className="flex-1 overflow-y-auto px-4 py-2 text-sm text-gray-800">
                                {Object.entries(groupedMessages).map(([date, messages]) => (
                                    <div key={date} className="mb-2">
                                        <div className="flex items-center text-[#003a96] text-sm font-semibold my-2">
                                            <div className="flex-grow border-t border-[#003a96]" />
                                            <span className="px-3 whitespace-nowrap">{date}</span>
                                            <div className="flex-grow border-t border-[#003a96]" />
                                        </div>
                                        <div className="space-y-2 font-mono">
                                            {messages.map((msg, index) => {
                                                const isLast = index === messages.length - 1;

                                                return (
                                                    <div
                                                        key={index}
                                                        className={`pb-2 ${!isLast ? 'border-b border-gray-200' : ''}`}
                                                    >
                                                        <div className="flex items-center gap-4 text-sm text-[#003a96] font-bold">
                                                            <span>{msg.name}</span>
                                                            <span className="text-xs text-gray-500 font-normal">
                                                                {msg.timestamp.toLocaleTimeString(
                                                                    undefined,
                                                                    {
                                                                        hour: 'numeric',
                                                                        minute: '2-digit',
                                                                    }
                                                                )}
                                                            </span>
                                                        </div>
                                                        <div className="pl-1">{msg.message}</div>
                                                    </div>
                                                );
                                            })}
                                        </div>
                                    </div>
                                ))}
                            </div>
                            <form
                                // onSubmit={handleSend}
                                className="px-4 py-2 border-t-2 flex gap-2 bg-white border-[#003a96]"
                            >
                                <input
                                    type="text"
                                    className="flex-1 px-3 py-2 border rounded-md text-sm outline-none font-mono"
                                    placeholder="Type a message..."
                                    // value={input}
                                    // onChange={(e) => setInput(e.target.value)}
                                />
                                <button className="bg-[#003a96] text-white px-4 py-2 rounded-md hover:bg-[#0050d6] text-sm">
                                    <span className="flex items-center gap-2">
                                        <img src={SendIcon} alt="Send" style={{ maxWidth: 20 }} />
                                        Send
                                    </span>
                                </button>
                            </form>
                        </div>
                    </div>
                )}
                {selectedRequest ? (
                    <nav className="shadow-xl rounded-[26px] bg-blue-100 flex-1 text-blue-gray-900">
                        <div className={''}>
                            <div className="flex justify-between border-b-5 border-b-[#44A6A6] bg-[#003A96] rounded-tl-3xl rounded-tr-3xl border-[#d9d9d9] mb-3">
                                <h2 className="text-[14pt]  p-5 " style={{ color: 'white' }}>
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
                                                : selectedRequest.request_type === 'MedicalDevice'
                                                  ? 'Medical Device'
                                                  : selectedRequest.request_type === 'Facilities'
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
                                                    successMessage={'Status successfully changed'}
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
                                                            setEditId(selectedRequest?.request_id);
                                                            setEditPriority(
                                                                selectedRequest.priority
                                                            );
                                                            setEditStatus(selectedRequest.status);
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
                                            if (userRole === 'Admin') {
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
                            <div className="grid grid-cols-2 flex-1 pl-5 pr-5">
                                <div
                                    className={
                                        'border-1 border-[#D$D$D$] h-140 bg-white shadow-sm rounded-lg p-3 m-1 '
                                    }
                                >
                                    <div className={'p-1 '}>
                                        {/*Request Type*/}
                                        <h3
                                            className="text-[14pt] font-semibold font-[Poppins] py-1 "
                                            style={{ color: '#003A96' }}
                                        >
                                            Request Type:{' '}
                                        </h3>
                                        <ul className="list-disc  mt-3 mb-3 text-blue-gray-900">
                                            <p>
                                                <p className={'text-[12pt]'}>
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
                                    <hr />
                                    <div className={'p-1 pt-2  '}>
                                        {/*Request ID*/}
                                        <h3
                                            className="text-[14pt] font-semibold font-[Poppins] py-1 "
                                            style={{ color: '#003A96' }}
                                        >
                                            Request ID:{' '}
                                        </h3>
                                        <ul className="list-disc  mb-3 mt-3">
                                            <p className={'text-[12pt]'}>
                                                #{selectedRequest.request_id}
                                            </p>
                                        </ul>
                                    </div>
                                    <hr />
                                    <div className={'p-1 pt-4   '}>
                                        {/*MONTH DAY, YEAR at HOUR:MINUTE:SECOND AM/PM (Request ID: #)*/}
                                        <h3
                                            className="text-[14pt] font-semibold font-[Poppins] py-1 "
                                            style={{ color: '#003A96' }}
                                        >
                                            Request Date:{' '}
                                        </h3>
                                        <ul className="list-disc  mb-3 mt-3">
                                            <p className={'text-[12pt]'}>
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
                                    <hr />
                                    {editMode ? (
                                        <div className={'pt-2'}>
                                            {/* Priority Edit */}
                                            <div>
                                                <h3
                                                    className="text-[14pt] font-semibold font-[Poppins]  ml-2 pt-3  "
                                                    style={{ color: '#003A96' }}
                                                >
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
                                                            {
                                                                value: 'Emergency',
                                                                label: 'Emergency',
                                                            },
                                                        ]}
                                                        placeholder={selectedRequest.priority}
                                                        originalValue={selectedRequest.priority}
                                                    />
                                                </div>
                                            </div>

                                            {/* Status Edit */}
                                            <div className={'py-3'}>
                                                <h3
                                                    className="text-[14pt] font-semibold font-[Poppins] ml-2 pt-1"
                                                    style={{ color: '#003A96' }}
                                                >
                                                    Status:
                                                </h3>
                                                <div className="flex flex-row gap-4 items-center  mb-3">
                                                    <ServiceComponentDropdown
                                                        value={editStatus}
                                                        setState={setEditStatus}
                                                        width={'w-[175px]'}
                                                        options={[
                                                            'Unassigned',
                                                            'Assigned',
                                                            'Working',
                                                            'Done',
                                                        ]}
                                                        placeholder={selectedRequest.status}
                                                        originalValue={selectedRequest.status}
                                                    />
                                                </div>
                                            </div>
                                        </div>
                                    ) : (
                                        <>
                                            {/* Priority Display */}
                                            <div className={'py-4'}>
                                                <h3
                                                    className="text-[14pt] font-semibold font-[Poppins] py-1 pl-2"
                                                    style={{ color: '#003A96' }}
                                                >
                                                    Priority:
                                                </h3>
                                                <ul className="list-disc ml-2 mb-3 mt-3 ">
                                                    <p className="text-[12pt]">
                                                        {selectedRequest.priority}
                                                    </p>
                                                </ul>
                                            </div>
                                            <hr />
                                            {/* Status Display */}
                                            <div className={'py-3'}>
                                                <h3
                                                    className="text-[14pt] font-semibold font-[Poppins]  pl-2"
                                                    style={{ color: '#003A96' }}
                                                >
                                                    Status:
                                                </h3>
                                                <ul className="list-disc ml-2 mb-3 mt-3 ">
                                                    <p className="text-[12pt]">{selectedRequest.status}</p>
                                                    
                                                    {/* Add Progress Bar */}
                                                    <div className="w-full bg-gray-200 rounded-full h-2.5 mt-2">
                                                        <div 
                                                            className="bg-[#003A96] h-2.5 rounded-full transition-all duration-500"
                                                            style={{ 
                                                                width: selectedRequest.status === 'Unassigned' ? '25%' :
                                                                       selectedRequest.status === 'Assigned' ? '50%' :
                                                                       selectedRequest.status === 'Working' ? '75%' :
                                                                       selectedRequest.status === 'Done' ? '100%' : '0%'
                                                            }}
                                                        ></div>
                                                    </div>
                                                    
                                                    {/* Status Steps */}
                                                    <div className="flex justify-between text-xs mt-1 text-gray-600">
                                                        <span className={selectedRequest.status === 'Unassigned' ? 'text-[#003A96] font-semibold' : ''}>
                                                            Unassigned
                                                        </span>
                                                        <span className={selectedRequest.status === 'Assigned' ? 'text-[#003A96] font-semibold' : ''}>
                                                            Assigned
                                                        </span>
                                                        <span className={selectedRequest.status === 'Working' ? 'text-[#003A96] font-semibold' : ''}>
                                                            Working
                                                        </span>
                                                        <span className={selectedRequest.status === 'Done' ? 'text-[#003A96] font-semibold' : ''}>
                                                            Done
                                                        </span>
                                                    </div>
                                                </ul>
                                            </div>
                                        </>
                                    )}
                                </div>
                                <div>
                                    <div
                                        className={
                                            'border-1 border-[#D$D$D$] bg-white shadow-sm rounded-lg p-1 ml-4 mr-2 mt-1'
                                        }
                                    >
                                        <div className={'p-2'}>
                                            {/*Name (Employee ID: #)*/}
                                            <h3
                                                className="text-[14pt]  font-semibold font-[Poppins] py-1  "
                                                style={{ color: '#003A96' }}
                                            >
                                                Name:{' '}
                                            </h3>
                                            <ul className="list-disc  mb-3 mt-3">
                                                <p className={'text-[12pt]'}>
                                                    {selectedRequest.name} (Employee ID:{' '}
                                                    {selectedRequest.employee_id})
                                                </p>
                                            </ul>
                                        </div>
                                        <hr />
                                        <div className={'p-2   '}>
                                            {/*Location*/}
                                            <h3
                                                className="text-[14pt] font-semibold font-[Poppins] py-1 "
                                                style={{ color: '#003A96' }}
                                            >
                                                Location:{' '}
                                            </h3>

                                            <ul className="list-disc mb-3 mt-3 ">
                                                <p className={'text-[12pt]'}>
                                                    {selectedRequest.location}
                                                </p>
                                            </ul>
                                        </div>
                                        <hr />
                                        <div className={'p-2   '}>
                                            {/*Department*/}
                                            <h3
                                                className="text-[14pt] font-semibold font-[Poppins] py-1 "
                                                style={{ color: '#003A96' }}
                                            >
                                                Department:{' '}
                                            </h3>

                                            <ul className="list-disc mb-3 mt-3 ">
                                                <p className={'text-[12pt]'}>
                                                    {selectedRequest.department}
                                                </p>
                                            </ul>
                                        </div>
                                    </div>
                                    <div
                                        className={
                                            'border-1 border-[#D$D$D$] bg-white shadow-sm rounded-lg p-1 m-1 ml-4 mt-6 mr-2'
                                        }
                                    >
                                        <div className={'p-2   '}>
                                            {/*Request Details*/}
                                            <h3
                                                className="text-[14pt] font-semibold font-[Poppins] py-1 "
                                                style={{ color: '#003A96' }}
                                            >
                                                Request Details:{' '}
                                            </h3>
                                            <ul className="list-disc  mb-3 mt-1">
                                                <p className={'text-[12pt]'}>
                                                    {selectedRequest.sanitation?.cleaningType && (
                                                        <div>
                                                            <div className={' '}>
                                                                <span className="">
                                                                    Cleaning Type:
                                                                </span>{' '}
                                                                {
                                                                    selectedRequest.sanitation
                                                                        .cleaningType
                                                                }{' '}
                                                            </div>
                                                            <hr className={'mt-7'} />
                                                        </div>
                                                    )}
                                                    {selectedRequest.language?.targetLanguage && (
                                                        <div>
                                                            <div className={'   mr-2  p-3  '}>
                                                                <span className="">
                                                                    Target Language:
                                                                </span>{' '}
                                                                {
                                                                    selectedRequest.language
                                                                        .targetLanguage
                                                                }{' '}
                                                            </div>
                                                            <hr className={'mt-7'} />
                                                        </div>
                                                    )}
                                                    {selectedRequest.audioVisual
                                                        ?.accommodationType && (
                                                        <div>
                                                            <div className={'mr-2 p-3  '}>
                                                                <span className="">
                                                                    Accommodation Type:
                                                                </span>{' '}
                                                                {
                                                                    selectedRequest.audioVisual
                                                                        .accommodationType
                                                                }{' '}
                                                            </div>
                                                            <hr className={'mt-7'} />
                                                        </div>
                                                    )}
                                                    {selectedRequest.transportation
                                                        ?.transportationType && (
                                                        <div>
                                                            <div className={'mr-2 p-3  '}>
                                                                <span className="">
                                                                    Transportation Type:
                                                                </span>{' '}
                                                                {
                                                                    selectedRequest.transportation
                                                                        .transportationType
                                                                }{' '}
                                                            </div>
                                                            <hr className={'mt-7'} />
                                                        </div>
                                                    )}
                                                    {selectedRequest.security?.accessZones && (
                                                        <div>
                                                            <div className={'mr-2 p-3  '}>
                                                                <span className="">
                                                                    Access Zones:
                                                                </span>{' '}
                                                                {
                                                                    selectedRequest.security
                                                                        .accessZones
                                                                }{' '}
                                                            </div>
                                                            <hr className={'mt-7'} />
                                                        </div>
                                                    )}
                                                    {selectedRequest.medicalDevice?.device && (
                                                        <div>
                                                            <div className={'mr-2 p-3  '}>
                                                                <span className="">
                                                                    Medical Device:
                                                                </span>{' '}
                                                                {
                                                                    selectedRequest.medicalDevice
                                                                        .device
                                                                }
                                                            </div>
                                                            <hr className={'mt-7'} />
                                                        </div>
                                                    )}
                                                    {selectedRequest.facilities
                                                        ?.maintenanceType && (
                                                        <div>
                                                            <div className={' mr-2 p-3  '}>
                                                                <span className="">
                                                                    Maintenance Type:
                                                                </span>{' '}
                                                                {
                                                                    selectedRequest.facilities
                                                                        .maintenanceType
                                                                }
                                                            </div>
                                                            <hr className={'mt-7'} />
                                                        </div>
                                                    )}
                                                    <br />
                                                    {selectedRequest.request_type ===
                                                        'Sanitation' && (
                                                        <div>
                                                            <div className={'mr-2 p-3  '}>
                                                                <span className="">
                                                                    Contaminant:
                                                                </span>{' '}
                                                                {selectedRequest.sanitation?.contaminant?.trim()
                                                                    ? selectedRequest.sanitation
                                                                          .contaminant
                                                                    : 'N/A'}
                                                            </div>
                                                        </div>
                                                    )}
                                                    {selectedRequest.language?.sourceLanguage && (
                                                        <div>
                                                            <div className={'  mr-2 p-3  '}>
                                                                <span className="">
                                                                    Source Language:
                                                                </span>{' '}
                                                                {
                                                                    selectedRequest.language
                                                                        .sourceLanguage
                                                                }
                                                            </div>
                                                        </div>
                                                    )}
                                                    {selectedRequest.request_type ===
                                                        'AudioVisual' && (
                                                        <div>
                                                            <div className={'mr-2 p-3  '}>
                                                                <span className="">
                                                                    Accommodation Details:
                                                                </span>{' '}
                                                                {selectedRequest.audioVisual?.accommodationDetails?.trim()
                                                                    ? selectedRequest.audioVisual
                                                                          .accommodationDetails
                                                                    : 'N/A'}
                                                            </div>
                                                        </div>
                                                    )}
                                                    {selectedRequest.transportation
                                                        ?.transportationDestination && (
                                                        <div>
                                                            <div className={'mr-2 p-3  '}>
                                                                <span className="">
                                                                    Transportation Destination:
                                                                </span>{' '}
                                                                {
                                                                    selectedRequest.transportation
                                                                        .transportationDestination
                                                                }{' '}
                                                            </div>
                                                        </div>
                                                    )}
                                                    {selectedRequest.security?.securityIssue && (
                                                        <div>
                                                            <div className={'mr-2 p-3  '}>
                                                                <span className="">
                                                                    Security Issue:
                                                                </span>{' '}
                                                                {
                                                                    selectedRequest.security
                                                                        .securityIssue
                                                                }{' '}
                                                            </div>
                                                        </div>
                                                    )}
                                                    {selectedRequest.medicalDevice
                                                        ?.operatorRequired && (
                                                        <div>
                                                            <div
                                                                className={
                                                                    'border-1 rounded-lg border-[#D$D$D$]  shadow-sm bg-white  mr-2 p-3  '
                                                                }
                                                            >
                                                                <span className="">
                                                                    Operator Required?
                                                                </span>{' '}
                                                                {
                                                                    selectedRequest.medicalDevice
                                                                        .operatorRequired
                                                                }
                                                            </div>
                                                        </div>
                                                    )}
                                                    {selectedRequest.facilities?.equipmentType && (
                                                        <div>
                                                            <div className={'mr-2 p-3  '}>
                                                                <span className="">
                                                                    Equipment Type:
                                                                </span>{' '}
                                                                {
                                                                    selectedRequest.facilities
                                                                        .equipmentType
                                                                }
                                                            </div>
                                                        </div>
                                                    )}
                                                </p>
                                            </ul>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <div
                                className={
                                    'border-1 border-[#D$D$D$] bg-white  shadow-sm rounded-lg ml-6 mr-6 mt-5 p-3 m-5'
                                }
                            >
                                {/*Additional comments*/}
                                <h3
                                    className="text-[14pt] font-semibold p-3 font-[Poppins] py-1 "
                                    style={{ color: '#003A96' }}
                                >
                                    Additional Comments:{' '}
                                </h3>
                                <div>
                                    <ul className="list-disc ml-2 ">
                                        <div className={' mr-2 p-3  '}>
                                            <p className={'text-[12pt] ml-1'}>
                                                {selectedRequest.additional_comments?.trim() ? (
                                                    <p>{userName} : {selectedRequest.additional_comments}</p>
                                                ) : (
                                                    'N/A'
                                                )}
                                            </p>
                                        </div>
                                    </ul>
                                    <div className="flex justify-center mt-2 mb-3">
                                    <button
                                        className="flex justify-center mb-5 cursor-pointer border-black px-3 py-1 text-[#003a96] rounded"
                                        onClick={() => setOpenChat(true)}
                                    >
                                        View All
                                    </button>
                                    </div>
                                </div>
                            </div>
                            <div className="bg-white shadow-sm rounded-lg ml-6 mr-6 mb-10 mt-4 p-3">
                                <h3
                                    className="text-[14pt] font-semibold p-3 pb-0 font-[Poppins]"
                                    style={{ color: '#003A96' }}
                                >
                                    Uploaded Image:
                                </h3>
                                {selectedRequest.image_upload ? (
                                    <div className="flex justify-center p-4">
                                        <a
                                            href={`http://localhost:3001/uploads/${selectedRequest.image_upload}`}
                                            target="_blank"
                                            rel="noopener noreferrer"
                                            className="text-blue-600 underline"
                                        >
                                            View Image
                                        </a>
                                    </div>
                                ) : (
                                    <div className="flex justify-center p-3">
                                        <span>No uploaded image</span>
                                    </div>
                                )}
                            </div>
                        </div>
                    </nav>
                ) : (
                    <>
                        {/*No service selected yet*/}
                        <nav className="border p-5 py-[22px] border-1 border-[#44A6A6] h-20 w-full bg-white rounded-3xl flex items-center shadow-md">
                            <p className="text-gray-700 text-[12pt] font-[Poppins]">
                                Select a service request to view details.
                            </p>
                        </nav>
                    </>
                )}{' '}
            </nav>
        </div>
    );
}