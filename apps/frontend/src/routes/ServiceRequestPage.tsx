
import RequestForm from "../components/serviceRequest/RequestForm.tsx";
import {useState} from "react";
import SideNav from "../components/serviceRequest/sideNavigation.tsx";
import RequestButton from "../components/serviceRequest/formTypeButton.tsx";
import TextInput from "../components/TextInput.tsx";
import ServiceFormSideBar from "../components/serviceRequest/serviceFormSideBar.tsx"
import trpc from "../lib/utils.ts";
import {getRequests} from "../../../backend/src/server/procedures/requests.ts";


function ServiceRequestPage(){

    const requestData = trpc.query('getRequests');

    return(
        <>
            <div className="bg-gray-200 min-h-screen flex flex-col items-center justify-center">
                <h1 className="text-2xl font-bold mb-6 font-[poppins]">Service Request Forms</h1>
                    <ServiceFormSideBar/>
                <div>
                    <RequestForm title={"Language Interpreter Request Form"} item={"Language"}/>
                </div>
                <div>
                    {requestData.data}
                </div>
            </div>




        </>
    )
}

export default ServiceRequestPage;