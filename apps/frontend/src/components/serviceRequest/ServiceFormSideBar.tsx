import SideBarButton from "./sideBarButton.tsx";
import {serviceRequest} from "@/routes/ServiceRequestPage.tsx";

function ServiceFormSideBar({activeTab, setActiveTab}: {activeTab: serviceRequest, setActiveTab: (form: serviceRequest)=>void}) {
    const handleFormRequest = (form: serviceRequest) => {
        console.log(form + "requested");
        setActiveTab(form)
    };

    return (
            <div>
                <div className="flex items-center justify-between px-4 py-3 mb-4 rounded-lg bg-gray-200 border-b-2 border-gray-300 shadow-sm">
                    <span className="font-semibold text-gray-700 text-lg">Menu</span>

                    <svg className="w-5 h-5 text-gray-500" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h16M4 18h7"></path>
                    </svg>
                </div>
                        <SideBarButton
                            label={'Language Interpreter Service Form'}
                            onClick={() => handleFormRequest({
                                type:"Language",
                                title: "Language Interpreter Service Form"})}
                            type="Language"
                        />
                        <SideBarButton
                            label={'Sanitation Services Form'}
                            onClick={() => handleFormRequest({
                                type: "Sanitation",
                                title: 'Sanitation Service Form'})}
                            type="Sanitation"
                        />
                        <SideBarButton
                            label={'Security Request Form'}
                            onClick={() => handleFormRequest({
                                type: "Security",
                                title: "Security Request Form",
                            })}
                            type="Security"
                        />
                        <SideBarButton
                            label={'Transportation Request Form'}
                            onClick={() => handleFormRequest({
                                type: "Transportation",
                                title: "Transportation Request Form",
                            })}
                            type="Transportation"
                        />
                        <SideBarButton
                            label={'Audio/Visual Request Form'}
                            onClick={() => handleFormRequest({
                                type: "AudioVisual",
                                title: "Audio/Visual Request Form",
                            })}
                            type="AudioVisual"
                        />
            </div>
    );
}
export default ServiceFormSideBar;



