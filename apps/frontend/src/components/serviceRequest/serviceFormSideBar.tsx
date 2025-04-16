import RequestButton from "./formTypeButton.tsx";
import TextInput from "../TextInput.tsx";
import React, { useState } from 'react';
import SideNav from "../serviceRequest/sideNavigation.tsx"
import accImage from './images/user.png'
import {serviceRequest} from "@/routes/ServiceRequestPage.tsx";

function ServiceFormSideBar({activeTab, setActiveTab}: {activeTab: serviceRequest, setActiveTab: (form: serviceRequest)=>void}) {
    const [searchData, setSearch] = useState('')
    const handleFormRequest = (form: serviceRequest) => {
        console.log(form + "requested");
        setActiveTab(form)
    };

    return (
        <>
            <SideNav>
                <h2 className="text-gray-800 text-lg mb-4">Mass General</h2>
                <div className="flex flex-wrap items-center justify-center">
                    <img
                        src={accImage}
                        alt="user"
                        width="50"
                        height="50"
                        className={"mr-1"}
                    />
                    <h2 className={'text-gray-700 font-bold text-2xl'}> Account</h2>
                </div>

                <div className="w-full">
                    <div className="text-gray-700 font-semibold mb-2">Menu</div>


                    <div className="p-2 bg-gray-300 rounded">
                        <div className="text-gray-700 flex justify-between  py-2">
                            <TextInput
                                label={'Search Form:'}
                                placeholder={'Search Form ...'}
                                value={searchData}
                                onChange={(e) => setSearch(e.target.value)}
                            />
                        </div>

                        <RequestButton
                            label={'Language Interpreter Service Form'}
                            onClick={() => handleFormRequest({
                                type:"Language",
                                title: "Language Interpreter Service Form"})}
                        />
                        <RequestButton
                            label={'Sanitation Services Form'}
                            onClick={() => handleFormRequest({
                                type: "Sanitation",
                                title: 'Sanitation Service Form'})}
                        />
                        <RequestButton
                            label={'Security Request Form'}
                            onClick={() => handleFormRequest({
                                type: "Security",
                                title: "Security Request Form",
                            })}
                        />
                        <RequestButton
                            label={'Transportation Request Form'}
                            onClick={() => handleFormRequest({
                                type: "Transportation",
                                title: "Transportation Request Form",
                            })}
                        />
                        <RequestButton
                            label={'Audio/Visual Request Form'}
                            onClick={() => handleFormRequest({
                                type: "AudioVisual",
                                title: "Audio/Visual Request Form",
                            })}
                        />
                    </div>

                </div>
            </SideNav>
        </>
    );
}
export default ServiceFormSideBar;



