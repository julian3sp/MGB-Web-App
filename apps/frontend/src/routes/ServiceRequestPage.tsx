
import LanguageRequestForm from "../components/serviceRequest/LanguageRequestForm.tsx";
import {useState} from "react";
import SideNav from "../components/serviceRequest/sideNavigation.tsx";
import RequestButton from "../components/serviceRequest/formTypeButton.tsx";
import TextInput from "../components/TextInput.tsx";
import ServiceFormSideBar from "../components/serviceRequest/serviceFormSideBar.tsx"

function ServiceRequestPage(){


    return(
        <>
            <div className="bg-gray-200 min-h-screen flex flex-col items-center justify-center">
                <h1 className="text-2xl font-bold mb-6">Service Request Page</h1>
                    <ServiceFormSideBar/>

                <div className="bg-white p-6 rounded-lg w-[900px] mx-auto shadow-lg">
                    <LanguageRequestForm/>
                </div>

            </div>




        </>
    )
}

export default ServiceRequestPage;