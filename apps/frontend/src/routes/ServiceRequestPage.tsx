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
            <div className="border-r-2 border-b-2 border-t-2 rounded-tr-3xl rounded-br-3xl mt-5 mb-5 shadow-lg bg-white min-h-200 min-w-90">
                <ServiceFormSideBar activeTab={activeTab} setActiveTab={setActiveTab} />
            </div>
        } scaling = {5} absolute={false} x={-60} y={50} xOut={10} >
            <div className="relative flex-1  rounded-3xl ml-2 mr-5 mt-10 mb-5  flex flex-col h-150 items-center justify-start p-5 pt-10 pb-12 ">
                <h2 className="text-center py-5 text-[20px] font-[Poppins] border-b-5 border-b-[#44A6A6] text-lg min-w-250 font-semibold bg-[#003a96] text-white rounded-lg">
                    {activeTab.title}
                </h2>
                <div className="flex-1">
                    <RequestForm title={activeTab.title} type={activeTab.type} />
                </div>
            </div>
        </PageWrapper>
    );
}

export default ServiceRequestPage;
