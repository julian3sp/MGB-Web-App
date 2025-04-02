import './serviceForm.css'

function PersonalInformationForm() {
    return (
        <>
            <div >

                <form className="flex justify-center gap-2 mb-3 ">
                    <table className="w-[800px] mx-auto text-center border-1 border-black rounded-md  border-collapse">
                        <tr>
                            <th colSpan={2} className="text-center py-4 text-xl  font-semibold bg-[#003a96] text-white ">
                                Section 1: Employee Information
                            </th>
                        </tr>
                        <tr>
                            <td className="p-6 bg-white">
                                <input
                                    className="bg-white border border-gray-300 p-5 h-10 w-full rounded-md hover:border-[#a2caff] focus:outline-none"
                                    placeholder="Insert email..."
                                />
                            </td>
                            <td className="p-6 bg-white">
                                <input
                                    className="bg-white border border-gray-300 p-5 h-10 w-full rounded-md hover:border-[#a2caff] focus:outline-none"
                                    placeholder="Insert full name..."
                                />
                            </td>
                        </tr>
                        <tr>
                            <td className="p-6 bg-white">
                                <input
                                    className="bg-white border border-gray-300 p-5 h-10 w-full rounded-md hover:border-[#a2caff] focus:outline-none"
                                    placeholder="Insert phone number..."
                                />
                            </td>
                            <td className="p-6 bg-white">
                                <input
                                    className="bg-white border border-gray-300 p-5 h-10 w-full rounded-md hover:border-[#a2caff] focus:outline-none"
                                    placeholder="Insert employee ID..."
                                />
                            </td>
                        </tr>
                    </table>
                </form>



            </div>
        </>


    )
}

export default PersonalInformationForm;