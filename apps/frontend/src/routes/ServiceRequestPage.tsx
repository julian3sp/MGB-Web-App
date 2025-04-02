import PersonalInfoForm from "../components/serviceRequest/PersonalInfoForm.tsx";
import {useState} from "react";


function ServiceRequestPage(){
    const [form, setFormData] = useState(
        {
            fullName: '',
            email: '',
            phoneNumber: '',
            employeeID: ''
        })

    return(
        <>
        <h1>ServiceRequest page</h1>
        <PersonalInfoForm formData={form} setFormData={setFormData}/>
        </>
    )
}

export default ServiceRequestPage;