
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


                <div className="flex-1 absolute left-5 top-1/2 transform -translate-y-1/2 bg-blue-500 text-white text-white w-64 rounded-md p-5">
                    <ServiceFormSideBar/>
                </div>

                <div className="bg-white p-6 rounded-lg w-[900px] mx-auto shadow-lg">
                    {/*<SideNav>*/}
                    {/*    <h1 className="text-xl font-semibold">Profile</h1>*/}
                    {/*    <ul className="mt-4">*/}
                    {/*        <li className="py-2 hover:bg-gray-600 cursor-pointer">Username</li>*/}
                    {/*        <li className="py-2 hover:bg-gray-600 cursor-pointer">Position</li>*/}
                    {/*        <li className="py-2 hover:bg-gray-600 cursor-pointer">Settings</li>*/}
                    {/*    </ul>*/}
                    {/*</SideNav>*/}
                    <LanguageRequestForm/>
                </div>

            </div>




        </>
    )
}

export default ServiceRequestPage;