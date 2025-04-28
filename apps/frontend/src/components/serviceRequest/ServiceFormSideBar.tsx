import SideBarButton from "./sideBarButton.tsx";
import {serviceRequest} from "@/routes/ServiceRequestPage.tsx";

export default function ServiceFormSideBar({activeTab, setActiveTab}: {activeTab: serviceRequest, setActiveTab: (form: serviceRequest)=>void}) {
    const handleFormRequest = (form: serviceRequest) => {
        console.log(form + "requested");
        setActiveTab(form)
    };

    return (
        <div className=" p-5 ">

            <h3 className="text-2xl font-bold mb-4 pt-2 font-[Poppins]"
                style={{ color: '#003A96' }}>Menu:</h3>

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
            <SideBarButton
                label={'Medical Device Request Form'}
                onClick={() => handleFormRequest({
                    type: "MedicalDevice",
                    title: "Medical Device Request Form",
                })}
                type="MedicalDevice"
            />
            <SideBarButton
                label={'Facilities Request Form'}
                onClick={() => handleFormRequest({
                    type: "Facilities",
                    title: "Facilities Request Form",
                })}
                type="Facilities"
            />
        </div>
    );
}



