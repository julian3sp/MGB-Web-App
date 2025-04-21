import SideBarButton from "./sideBarButton.tsx";
import {serviceRequest} from "@/routes/ServiceRequestPage.tsx";

export default function ServiceFormSideBar({activeTab, setActiveTab}: {activeTab: serviceRequest, setActiveTab: (form: serviceRequest)=>void}) {
    const handleFormRequest = (form: serviceRequest) => {
        console.log(form + "requested");
        setActiveTab(form)
    };

    return (
        <div>
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



