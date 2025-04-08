import {useState} from "react";
import {AuthenticationError} from "@auth0/auth0-react";
import TextArea from "../TextArea.tsx";
import SubmitButton from "../SubmitButton.tsx";
import {InputBox} from "../signIn/InputBox.tsx";
import {InputHeader} from "../signIn/InputHeader.tsx";
import ResetButton from "../ResetButton.tsx";
import {trpc} from "../../lib/trpc.ts";
import Modal from "./modal.tsx";

type requestFormProps = {
    title: string, 
    type: string
}

function RequestForm({title, type} : requestFormProps) {
    const [response, setResponse] = useState('')
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [phoneNumber, setPhoneNumber] = useState('');
    const [employeeID, setEmployeeID] = useState('');
    const [request, setRequest] = useState('');
    const [roomNumber, setRoomNumber] = useState('');
    const [comments, setComments] = useState('');
    const [open, setOpen] = useState<boolean>(false);
    const mutation = trpc.createRequest.useMutation()


    const handleSubmit = ( e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        mutation.mutate({
            name: name,
            email: email,
            phone_num: phoneNumber,
            room_num: Number(roomNumber),
            request_type: type,
            employee_id: employeeID,
            language: request
        })
        handleReset(e)
    }
    const handleReset = (e) => {
        e.preventDefault();
        setEmail('');
        setName('');
        setPhoneNumber('');
        setEmployeeID('');
        setRequest('');
        setRoomNumber('');
        setComments('');
    }

    return (
        <>
            <div>
                <form className="justify-center  text-sm" onSubmit={handleSubmit} onReset={handleReset}>
                    <div className=" rounded-lg shadow-lg overflow-hidden w-200 bg-white flex flex-col gap-5">

                        <h2 className="text-center py-5 text-[20px] font-[Poppins] text-lg font-semibold bg-[#003a96] text-white rounded-tr-md rounded-tl-md">
                            {title}
                        </h2>

                        {/* Employee Information (Two-Column Grid) */}
                        <div className="grid grid-cols-2 gap-x-6 gap-y-4 px-6">
                            <div>
                                <InputHeader>Email:</InputHeader>
                                <InputBox value={email} setState={setEmail} placeholder="Enter your Email" width="w-full" />
                            </div>

                            <div>
                                <InputHeader>Full Name:</InputHeader>
                                <InputBox value={name} setState={setName} placeholder="Enter your Full Name" width="w-full" />
                            </div>

                            <div>
                                <InputHeader>Phone Number:</InputHeader>
                                <InputBox value={phoneNumber} setState={setPhoneNumber} placeholder="Enter your Phone Number" width="w-full" />
                            </div>

                            <div>
                                <InputHeader>Employee ID:</InputHeader>
                                <InputBox value={employeeID} setState={setEmployeeID} placeholder="Enter your Employee ID" width="w-full" />
                            </div>

                            <div>
                                <InputHeader children={type + ':'}></InputHeader>
                                <InputBox value={request} setState={setRequest} placeholder={type} width="w-full" />
                            </div>

                            <div>
                                <InputHeader>Room Number:</InputHeader>
                                <InputBox value={roomNumber} setState={setRoomNumber} placeholder="Enter your Room Number" width="w-full" />
                            </div>
                        </div>
                        <div className={"mr-5 ml-5"}>
                        <InputHeader children={"Additional Comments:"}/>
                            <TextArea placeholder="Additional Comments..." value={comments} setState={setComments} />
                        </div>

                        {/* Buttons */}
                        <div className=" flex  gap-5 justify-center">
                            <ResetButton label={"Reset"} />
                            <SubmitButton label={"Submit"} type={"submit"} onClick={() => setOpen(true)}/>

                        </div>
                    </div>

                </form>
                <Modal isOpen={open} onClose={() => setOpen(false)}>
                    <div className="flex flex-col gap-4">
                        <h1 className="text-2xl font-[poppins]">Success!</h1>
                        <p className={"font-[poppins]"}>
                            The hospital has received your request, and we will assist you as soon as possible.
                        </p>
                        <p className={"font-[poppins]"}>
                            As always, thank you for coming to Mass General Brigham!
                        </p >
                        <hr className="border-t-solid border-1 border-grey" />
                        <div className="flex flex-row justify-center">
                            <ResetButton
                                label={"Close"}
                                onClick={() => setOpen(false)}>
                            </ResetButton>
                        </div>
                    </div>
                </Modal>

            </div>
        </>
    );
}


export default RequestForm;