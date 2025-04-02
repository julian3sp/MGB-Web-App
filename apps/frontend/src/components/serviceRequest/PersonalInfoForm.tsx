import './serviceForm.css';

type personalInfoType = {
    fullName: string;
    email: string;
    phoneNumber: string;
    employeeID: string;
};

type personalInfoFormProps = {
    formData: personalInfoType;
    setFormData: (formData: personalInfoType) => void;
};

function PersonalInfoForm({ formData, setFormData }: personalInfoFormProps) {
    return (
        <div>
            <form className="flex justify-center gap-2 mb-3">
                <div className="border-2 rounded-lg shadow-lg overflow-hidden w-[800px]">
                    <table className="w-[801px] mx-auto text-center border-black text-sm rounded-lg">
                        {/* Table Header */}
                        <tr>
                            <th colSpan={2} className="text-center py-4 text-xl font-semibold bg-[#003a96] text-white rounded-tr-sm rounded-tl-sm">
                                Section 1: Employee Information
                            </th>
                        </tr>

                        {/* Email & Name Fields */}
                        <tr>
                            <td className="p-6 bg-white text-left">
                                <label htmlFor="email">Email:</label>
                                <input
                                    type="email"
                                    id="email"
                                    className="bg-white border border-gray-300 p-5 h-10 w-full rounded-md hover:border-[#a2caff] focus:outline-none"
                                    placeholder="Insert email..."
                                    required
                                    value={formData.email}
                                    onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                                />
                                {/* Email validation error message */}
                                {!formData.email.includes("@") && formData.email.length > 0 && (
                                    <p className="text-red-500 text-sm mt-1">Please enter a valid email.</p>
                                )}
                            </td>

                            <td className="p-6 bg-white text-left">
                                <label htmlFor="fullName">Full Name:</label>
                                <input
                                    type="text"
                                    id="fullName"
                                    className="bg-white border border-gray-300 p-5 h-10 w-full rounded-md hover:border-[#a2caff] focus:outline-none"
                                    placeholder="Insert full name..."
                                    required
                                    value={formData.fullName}
                                    onChange={(e) => setFormData({ ...formData, fullName: e.target.value })}
                                />
                            </td>
                        </tr>

                        {/* Phone & Employee ID Fields */}
                        <tr>
                            <td className="p-6 bg-white text-left">
                                <label htmlFor="phone">Phone Number:</label>
                                <input
                                    type="tel"
                                    id="phone"
                                    className="bg-white border border-gray-300 p-5 h-10 w-full rounded-md hover:border-[#a2caff] focus:outline-none"
                                    placeholder="Insert phone number..."
                                    required
                                    value={formData.phoneNumber}
                                    onChange={(e) => setFormData({ ...formData, phoneNumber: e.target.value })}
                                />
                            </td>

                            <td className="p-6 bg-white text-left">
                                <label htmlFor="employeeID">Employee ID:</label>
                                <input
                                    type="text"
                                    id="employeeID"
                                    className="bg-white border border-gray-300 p-5 h-10 w-full rounded-md hover:border-[#a2caff] focus:outline-none"
                                    placeholder="Insert employee ID..."
                                    required
                                    value={formData.employeeID}
                                    onChange={(e) => setFormData({ ...formData, employeeID: e.target.value })}
                                />
                            </td>
                        </tr>
                    </table>
                </div>
            </form>
        </div>
    );
}

export default PersonalInfoForm;
