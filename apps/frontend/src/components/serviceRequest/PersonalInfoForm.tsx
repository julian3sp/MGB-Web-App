import './serviceForm.css'
import {useState} from "react";

function PersonalInformationForm() {
    const [text, setText] = useState("")
    return (
        <div className="form-container">
            <form className="service-form">
                <input
                    value = "fullName"
                    className = {"service-request"}
                    placeholder={"insert email . . ."}
                />
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
        </div>
    )
}

export default PersonalInformationForm;