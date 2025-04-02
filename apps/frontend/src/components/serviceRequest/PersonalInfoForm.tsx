import './serviceForm.css'
import {useState} from "react";

type personalInfoType = {
    fullName: string;
    email: string;
    phoneNumber: string;
    employeeID: string;
}

type personalInfoFormProps = {
    formData: personalInfoType;
    setFormData: (formData: personalInfoType) => void;}

function PersonalInformationForm({formData, setFormData}: personalInfoFormProps) {

    return (
        <>
            <h2 className={"service-form-section"}> Section 1: Employee Information </h2>
            <div className="form-container">

                <form className="service-form">
                    <input
                        required={true}
                        value = {formData.email}
                        onChange ={(e) =>  setFormData({... formData, email: e.target.value}) }
                        className = {"service-request"}
                        placeholder={"insert email . . ."}
                />
                    {!formData.email.includes("@") && <p>error message</p>}
                <input
                    id = "email"
                    name = "email"
                    value = "email"
                    className = {"service-request"}
                    placeholder={"insert full name . . ."}
                />

                </form>
                <form className="service-form">
                    <input
                        value = "phoneNumber"
                    className = {"service-request"}
                    placeholder={"insert phone number . . ."}
                />
                <input
                    value = "employeeID"
                    className = {"service-request"}
                    placeholder={"insert employee ID . . ."}
                />
            </form>
        </div></>
    )
}

export default PersonalInformationForm;