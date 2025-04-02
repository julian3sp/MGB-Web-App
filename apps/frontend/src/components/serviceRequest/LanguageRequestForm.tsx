import './serviceForm.css'
import {useState} from "react";
import TextInput from "../TextInput.tsx";
import {AuthenticationError} from "@auth0/auth0-react";
import TextArea from "../TextArea.tsx";


function LanguageRequestForm() {
    const [formData, setFormData] = useState(
        {
            fullName: '',
            email: '',
            phoneNumber: '',
            employeeID: '',
            device: '',
            roomNumber: '',
            comments: ''
        })
    return (
        <>
            <div>
                <form className="flex justify-center gap-2 mb-3">
                    <div className="border-2 rounded-lg shadow-lg overflow-hidden w-[800px]">
                        <table className="w-[800px] mx-auto text-sm text-center border-black rounded-md border-collapse">
                            {/* Section 1: Employee Information */}
                            <tr>
                                <th colSpan={2} className="text-center py-4 text-lg font-semibold bg-[#003a96] text-white">
                                    Section 1: Employee Information
                                </th>
                            </tr>
                            <tr>
                                <td className="p-6 bg-white text-left">
                                    <TextInput label={"Email:"} placeholder={"Insert email..."} value={formData.email}
                                               onChange={(e) => setFormData({ ...formData, email: e.target.value })} />
                                    {!formData.email.includes("@") && formData.email.length > 0 && (
                                        <p className="text-red-500 text-sm mt-1">Please enter a valid email.</p>
                                    )}
                                </td>
                                <td className="p-6 bg-white text-left">
                                    <TextInput label={"Full Name:"} placeholder={"Insert full name..."} value={formData.fullName}
                                               onChange={(e) => setFormData({ ...formData, fullName: e.target.value })} />
                                </td>
                            </tr>
                            <tr>
                                <td className="p-6 bg-white text-left">
                                    <TextInput label={"Phone Number:"} placeholder={"Insert phone number..."} value={formData.phoneNumber}
                                               onChange={(e) => setFormData({ ...formData, phoneNumber: e.target.value })} />
                                </td>
                                <td className="p-6 bg-white text-left">
                                    <TextInput label={"Employee ID:"} placeholder={"Insert employee ID..."} value={formData.employeeID}
                                               onChange={(e) => setFormData({ ...formData, employeeID: e.target.value })} />
                                </td>
                            </tr>

                            {/* Section 2: Service Request Form */}
                            <tr>
                                <th colSpan={2} className="text-center py-4 text-lg font-semibold bg-[#003a96] text-white">
                                    Section 2: Service Request Form
                                </th>
                            </tr>
                            <tr>
                                <td className="p-6 bg-white text-left">
                                    <TextInput label={"Device:"} placeholder={"Enter Device..."} value={formData.device}
                                               onChange={(e) => setFormData({ ...formData, device: e.target.value })} />
                                </td>
                                <td className="p-6 bg-white text-left">
                                    <TextInput label={"Room:"} placeholder={"Enter Room Number..."} value={formData.roomNumber}
                                               onChange={(e) => setFormData({ ...formData, roomNumber: e.target.value })} />
                                </td>
                            </tr>
                            <tr>
                                <td colSpan={2} className="p-6 bg-white text-left">
                                    <TextArea label={"Additional Instructions"} value={formData.comments} placeholder={'Additional Comments...'}
                                              onChange={(e) => setFormData({ ...formData, comments: e.target.value })} />
                                </td>
                            </tr>
                        </table>
                    </div>
                </form>
            </div>
        </>


    )
}

export default LanguageRequestForm;