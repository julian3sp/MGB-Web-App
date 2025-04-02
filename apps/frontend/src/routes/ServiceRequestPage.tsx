
import LanguageRequestForm from "../components/serviceRequest/LanguageRequestForm.tsx";
import {useState} from "react";



function ServiceRequestPage(){

    return(
        <>
            <div className="bg-gray-200 min-h-screen flex flex-col items-center justify-center">
                <h1 className="text-2xl font-bold mb-6">Service Request Page</h1>
                <div className="bg-white p-8 rounded-lg w-[900px] mx-auto shadow-lg">
                    <LanguageRequestForm/>
                </div>
            </div>




        </>
    )
}

export default ServiceRequestPage;