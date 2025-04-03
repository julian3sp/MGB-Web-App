import {useState} from "react";
import TextInput from "../TextInput.tsx";
import {AuthenticationError} from "@auth0/auth0-react";
import TextArea from "../TextArea.tsx";
import SubmitButton from "../SubmitButton.tsx";

type requestFormProps = {
    title: string, 
    item: string
}

function RequestForm({title, item} : requestFormProps) {
    const [response, setResponse] = useState('')
    const [formData, setFormData] = useState(
        {
            fullName: '',
            email: '',
            phoneNumber: '',
            employeeID: '',
            device: '',
            roomNumber: '',
            comments: ''
        });
    const handleSubmit = (e) => {
        e.preventDefault();
        setResponse("Name: " + formData.fullName + " Email: " + formData.email + " Phone Number: " + formData.phoneNumber + " Employee ID: " + formData.employeeID
       + " Device: " + formData.device + " Room Number: " + formData.roomNumber + " Comments: " + formData.comments)
    }

    return (
        <>
            <div>
                <form className="flex justify-center mb-3 mt-3 text-sm " onSubmit={handleSubmit}>
                    <div className="border-1 rounded-lg shadow-lg overflow-hidden w-[800px]  bg-white flex flex-col gap-7">
                        {/* Header */}
                        <h2 className="text-center py-5 text-lg font-semibold bg-[#003a96] text-white rounded-tr-md rounded-tl-md">
                            {title}
                        </h2>

                        {/* Employee Information */}
                        <div className="grid grid-cols-2 w-full gap-6 px-6 ">
                            <TextInput
                                label="Email:"
                                placeholder="Insert email..."
                                value={formData.email}
                                onChange={(e) =>
                                    setFormData({ ...formData, email: e.target.value })
                                }
                            />
                            <TextInput
                                label="Full Name:"
                                placeholder="Insert full name..."
                                value={formData.fullName}
                                onChange={(e) =>
                                    setFormData({ ...formData, fullName: e.target.value })
                                }
                            />
                            <TextInput
                                label="Phone Number:"
                                placeholder="Insert phone number..."
                                value={formData.phoneNumber}
                                onChange={(e) =>
                                    setFormData({ ...formData, phoneNumber: e.target.value })
                                }
                            />
                            <TextInput
                                label="Employee ID:"
                                placeholder="Insert employee ID..."
                                value={formData.employeeID}
                                onChange={(e) =>
                                    setFormData({ ...formData, employeeID: e.target.value })
                                }
                            />
                            <TextInput
                                label={item + ":"}
                                placeholder={"Enter " + item + "..."}
                                value={formData.device}
                                onChange={(e) =>
                                    setFormData({ ...formData, device: e.target.value })
                                }
                            />
                            <TextInput
                                label="Room:"
                                placeholder="Enter Room Number..."
                                value={formData.roomNumber}
                                onChange={(e) =>
                                    setFormData({ ...formData, roomNumber: e.target.value })
                                }
                            />
                        </div>

                        <TextArea
                            label="Additional Instructions:"
                            placeholder="Additional Comments..."
                            value={formData.comments}
                            onChange={(e) => setFormData({ ...formData, comments: e.target.value })}
                        />

                        {/* Buttons */}
                        <div className="flex justify-center mb-2 gap-10">
                            <div className={'p-3'}>
                                <button
                                    type="reset"
                                    className="bg-[#FFFFFF] text-black px-10 p-2 border-1 rounded-md hover:bg-[#C70039] hover:text-white hover:border-black focus:outline-none"
                                    onClick={() =>
                                        setFormData({
                                            email: '',
                                            fullName: '',
                                            phoneNumber: '',
                                            employeeID: '',
                                            device: '',
                                            roomNumber: '',
                                            comments: '',
                                        })
                                    }
                                >
                                    Reset
                                </button>
                            </div>
                            <SubmitButton label="Submit" type="submit" />
                        </div>
                    </div>
                </form>
            </div>
            <div>{response}</div>
        </>
    );
}


export default RequestForm;