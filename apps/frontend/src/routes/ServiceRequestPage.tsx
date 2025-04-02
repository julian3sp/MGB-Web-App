import PersonalInfoForm from "../components/serviceRequest/PersonalInfoForm.tsx";
import ServiceRequestForm from "../components/serviceRequest/ServiceRequestForm.tsx";


function ServiceRequestPage(){
    return(
        <>
        <h1>Service Request page</h1>
            <div className="bg-gray-500/35 p-6 rounded-md w-250 mx-auto">
                <PersonalInfoForm />
                <ServiceRequestForm />
            </div>



        </>
    )
}

export default ServiceRequestPage;