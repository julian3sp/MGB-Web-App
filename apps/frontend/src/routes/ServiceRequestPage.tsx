import RequestForm from '../components/serviceRequest/RequestForm.tsx';
import { useState } from 'react';
import SideNav from '../components/serviceRequest/sideNavigation.tsx';
import RequestButton from '../components/serviceRequest/formTypeButton.tsx';
import TextInput from '../components/TextInput.tsx';
import ServiceFormSideBar from '../components/serviceRequest/serviceFormSideBar.tsx';
import { trpc } from '../lib/trpc.ts';
import { getRequests } from '../../../backend/src/server/procedures/requests.ts';

export type serviceRequest = {
    type: "Security" | "Language" | "Sanitation" | "AudioVisual" | "Transportation"
    title: string;
}
function ServiceRequestPage() {
    const [activeTab, setActiveTab] = useState<serviceRequest>({
        type: "Security",
        title: "Security Request Form",
    });

    return (
        <>
            <div className="bg-gray-200 min-h-screen flex flex-col items-center justify-center">
                <ServiceFormSideBar activeTab = {activeTab} setActiveTab={setActiveTab} />
                <div>
                    <RequestForm title={activeTab.title} type={activeTab.type} />
                </div>
            </div>
        </>
    );
}

export default ServiceRequestPage;
