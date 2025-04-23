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
        <PageWrapper open={true} contents={
            <div className="border-r border-gray-300 h-full">
                <ServiceFormSideBar activeTab={activeTab} setActiveTab={setActiveTab} />
            </div>
        } scaling = {5} absolute={false}>
            <div className="relative flex-1 flex flex-col min-h-screen items-center justify-center p-10 pb-12 pt-12">
                <div>
                    <RequestForm title={activeTab.title} type={activeTab.type} />
                </div>
            </div>
        </PageWrapper>
    );
}

export default ServiceRequestPage;
