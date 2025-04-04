import {useState} from "react";
import {AuthenticationError} from "@auth0/auth0-react";
import TextArea from "../TextArea.tsx";
import SubmitButton from "../SubmitButton.tsx";
import {InputBox} from "../signIn/InputBox.tsx";
import {InputHeader} from "../signIn/InputHeader.tsx";
import ResetButton from "../ResetButton.tsx";

type requestFormProps = {
    title: string, 
    item: string
}

function RequestForm({title, item} : requestFormProps) {
    const [response, setResponse] = useState('')
    const [fullName, setFullName] = useState('');
    const [email, setEmail] = useState('');
    const [phoneNumber, setPhoneNumber] = useState('');
    const [employeeID, setEmployeeID] = useState('');
    const [device, setDevice] = useState('');
    const [roomNumber, setRoomNumber] = useState('');
    const [comments, setComments] = useState('');

    const handleSubmit = (e) => {
        e.preventDefault();
        setResponse("Name: " + fullName + " Email: " + email + " Phone Number: " + phoneNumber + " Employee ID: " + employeeID
       + " Device: " + device + " Room Number: " + roomNumber + " Comments: " + comments)
    }
    const handleReset = (e) => {
        e.preventDefault();
        setEmail('');
        setFullName('');
        setPhoneNumber('');
        setEmployeeID('');
        setDevice('');
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
                                <InputBox value={fullName} setState={setFullName} placeholder="Enter your Full Name" width="w-full" />
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
                                <InputHeader>Device:</InputHeader>
                                <InputBox value={device} setState={setDevice} placeholder="Enter your Device" width="w-full" />
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
                            <SubmitButton label="Submit" />
                        </div>
                    </div>
                </form>

            </div>
            <div>{response}</div>
        </>
    );
}


export default RequestForm;