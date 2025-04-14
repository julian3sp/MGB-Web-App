import ServiceFormSideBar from "../components/serviceRequest/serviceFormSideBar.tsx";
import {SanitationRequestForm} from "../components/sanitationRequest/SanitationRequestForm.tsx";


export function SanitationRequestPage() {
    return(
        <>
            <div className="bg-gray-200 min-h-screen flex flex-col items-center justify-center">
                <h1 className="text-2xl font-bold mb-6 font-[poppins]">Service Request Forms</h1>
                <ServiceFormSideBar />
                <div>
                    <SanitationRequestForm />
                </div>
            </div>
        </>
    )
}