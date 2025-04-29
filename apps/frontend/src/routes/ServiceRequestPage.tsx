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
            <div className="border-r-2 border-b-2 border-t-2 rounded-tr-3xl rounded-br-3xl mt-5 mb-5 shadow-lg bg-[#F5F7FA] min-h-screen">
                <ServiceFormSideBar activeTab={activeTab} setActiveTab={setActiveTab} />
            </div>
        } scaling = {4} absolute={false} x={-50} y={30} >
            <div className="relative flex-1 border-2 shadow-lg rounded-3xl ml-5 mr-5 mt-5 mb-10 bg-[#F5F7FA] flex flex-col min-h-screen items-center justify-start p-5 pt-10 pb-12 ">
                <div className="mb-5">
                    <h1 className="text-3xl text-[#003a96] font-bold">{activeTab.title}</h1>
                </div>
                <div className="flex-1 w-full">
                    <RequestForm title={activeTab.title} type={activeTab.type} />
                </div>
            </div>
        </PageWrapper>
    );
}

export default ServiceRequestPage;
