import RequestButton from "./formTypeButton.tsx";
import TextInput from "../TextInput.tsx";
import React, { useState } from 'react';

function ServiceFormSideBar() {
    const [searchData, setSearch] = useState('')
    const handleFormRequest = (form: string) => {
        console.log(form + "requested");
    };

    return(
    <>
        <h2 className="text-gray-800 text-lg mb-4">Mass General</h2>
        {/* Menu */}
        <div className="w-full">
            <div className="text-gray-700 font-semibold mb-2">Menu</div>
            <div className="text-gray-700 flex items-center justify-between bg-gray-100 rounded-lg py-2 px-4 w-full">
                <TextInput label={"Search Form:"} placeholder={"Search Form ..."} value={searchData}
                           onChange={(e) => setSearch(e.target.value)} />
            </div> <br />

            <RequestButton label={"Language Interpreter Service Form"} onClick={() => handleFormRequest("Language Interpreter Service Form")}/>

        </div>
    </>
    )
}
export default ServiceFormSideBar;



