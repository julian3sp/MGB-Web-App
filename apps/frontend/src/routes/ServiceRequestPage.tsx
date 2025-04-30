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
            <div className="border-r-2 border-b-2 border-t-2 rounded-tr-3xl  rounded-br-3xl mx-auto shadow-lg bg-white min-h-200 min-w-90 ">
                <ServiceFormSideBar activeTab={activeTab} setActiveTab={setActiveTab} />
            </div>
        } scaling = {4} absolute={false} x={-50} y={30} xOut={10} >
            <div className=" rounded-3xl mr-5 mt-20 mb-5 flex flex-col w-270 h-150 items-center ">
                <div className={'w-full '}>
                <h2 className="text-center py-5 text-[20px]   font-[Poppins] border-b-4 border-[#44A6A6] font-semibold bg-[#003a96] text-white rounded-lg mx-9">
                    {activeTab.title}
                </h2>
                </div>



                    <RequestForm title={activeTab.title} type={activeTab.type} />

            </div>

        </PageWrapper>
    );
}

export default ServiceRequestPage;
