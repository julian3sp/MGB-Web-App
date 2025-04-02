import './serviceForm.css'

function PersonalInformationForm() {
    return (
        <>
            <div >

                <form className="flex justify-center  gap-2 mb-3 ">
                    <div className={"border-2 rounded-lg shadow-lg overflow-hidden w-[800px]"}>
                    <table className="w-[801px] mx-auto text-center  border-black text-sm rounded-lg ">
                        <tr>
                            <th colSpan={2} className="text-center py-4 text-xl  font-semibold bg-[#003a96] text-white rounded-tr-sm rounded-tl-sm ">
                                Section 1: Employee Information
                            </th>
                        </tr>
                        <tr>
                            <td className="p-6 bg-white text-left">
                                <label htmlFor={"email"} >Email:</label>
                                <input
                                    className="bg-white  border border-gray-300 p-5 h-10 w-full rounded-md hover:border-[#a2caff] focus:outline-none"
                                    placeholder="Insert email..." id={"email"}
                                />
                            </td>
                            <td className="p-6 bg-white text-left">
                                <label htmlFor={"name"} >Enter Name:</label>
                                <input
                                    className="bg-white border border-gray-300 p-5 h-10 w-full rounded-md hover:border-[#a2caff] focus:outline-none"
                                    placeholder="Insert full name..." id={"name"}
                                />
                            </td>
                        </tr>
                        <tr>
                            <td className="p-6 bg-white text-left">
                                <label htmlFor={"phone"} >Phone:</label>
                                <input
                                    className="bg-white border border-gray-300 p-5 h-10 w-full rounded-md hover:border-[#a2caff] focus:outline-none"
                                    placeholder="Insert phone number..." id={"phone"}
                                />
                            </td>
                            <td className="p-6 bg-white text-left">
                                <label className={"p-1"} htmlFor={"empID"} >Employee ID:</label>
                                <input
                                    className="bg-white border border-gray-300 p-5 h-10 w-full rounded-md hover:border-[#a2caff] focus:outline-none"
                                    placeholder="Insert employee ID..." id={"empID"}
                                />
                            </td>
                        </tr>
                    </table>
                    </div>
                </form>



            </div>
        </>


    )
}

export default PersonalInformationForm;