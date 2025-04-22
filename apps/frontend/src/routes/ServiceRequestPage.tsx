import RequestForm from '../components/serviceRequest/RequestForm.tsx';
import { useState } from 'react';
import { trpc } from '../lib/trpc.ts';
import { getRequests } from '../../../backend/src/server/procedures/requests.ts';
import PageWrapper from "@/components/ui/PageWrapper.tsx";
import ServiceFormSideBar from "@/components/serviceRequest/ServiceFormSideBar.tsx";

export type serviceRequest = {
    type: "Security" | "Language" | "Sanitation" | "AudioVisual" | "Transportation" | "MedicalDevice" | "Facilities";
    title: string;
}
function ServiceRequestPage() {
    const [activeTab, setActiveTab] = useState<serviceRequest>({
        type: "Language",
        title: "Language Interpreter Request Form",
    });

    return (
        <PageWrapper open={true} contents={<ServiceFormSideBar activeTab ={activeTab} setActiveTab={setActiveTab} />} scaling = {5} absolute={false}>
            <div className="relative flex-1 bg-gray-200 min-h-screen flex flex-col items-center justify-center p-10">
                <div>
                    <RequestForm title={activeTab.title} type={activeTab.type} />
                </div>
            </div>
        </PageWrapper>
    );
}

export default ServiceRequestPage;
