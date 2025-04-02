import './serviceForm.css'

function ServiceRequestForm() {
    return (
        <>
            <div >

                <form className="flex justify-center gap-2 mb-3 ">
                    <div className={"border-2 rounded-lg shadow-lg overflow-hidden w-[800px]"}>
                    <table className="w-[800px] mx-auto text-sm text-center border-black rounded-md border-collapse">
                        <tr>
                            <th colSpan={2} className="text-center py-4 text-xl font-semibold bg-[#003a96] text-white">
                                Section 2: Service Request Form
                            </th>
                        </tr>
                        <tr>
                            <td className="p-6 bg-white text-left">
                                <label htmlFor={"device"}>Device:</label>
                                <input
                                    className="bg-white border border-gray-300 p-5 h-10 w-full rounded-md hover:border-[#a2caff] focus:outline-none"
                                    placeholder="Medical Device..." id={"device"}
                                />
                            </td>
                            <td className="p-6 bg-white text-left">
                                    <label htmlFor={"room"}>Room:</label>
                                <input
                                    className="bg-white border border-gray-300 p-5 h-10 w-full rounded-md hover:border-[#a2caff] focus:outline-none"
                                    placeholder="Room Number..." id={"room"}
                                />
                            </td>
                        </tr>
                        <tr>
                            <td colSpan={2} className="p-6 bg-white text-left">
                                <label htmlFor={"comments"}>Additional Comments:</label>
                    <textarea
                className="bg-white border border-gray-300 p-5 w-full rounded-md hover:border-[#a2caff] focus:outline-none"
                placeholder="Additional notes..."
                rows={4} id={"comments"}
                    ></textarea>
                            </td>
                        </tr>
                    </table>
                </div>
                </form>



            </div>
        </>


    )
}

export default ServiceRequestForm;