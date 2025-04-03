
import RequestForm from "../components/serviceRequest/RequestForm.tsx";
import {useState} from "react";
import SideNav from "../components/serviceRequest/sideNavigation.tsx";
import RequestButton from "../components/serviceRequest/formTypeButton.tsx";
import TextInput from "../components/TextInput.tsx";
import ServiceFormSideBar from "../components/serviceRequest/serviceFormSideBar.tsx"


function ServiceRequestPage(){


    return(
        <>
            <div className="bg-gray-200 min-h-screen flex flex-col items-center justify-center">
                <h1 className="text-2xl font-bold mb-6">Service Request Forms</h1>
                    <ServiceFormSideBar/>
                <div className="bg-white p-8 rounded-lg w-[900px] mx-auto shadow-lg">
                    <RequestForm title={"Language Interpreter Request Form"} item={"Language"}/>
                </div>
            </div>




        </>
    )
}

export default ServiceRequestPage;