import './serviceForm.css'

function PersonalInformationForm() {
    return (
        <div className="form-container">
            <form className="service-form">
                <input
                    className = {"service-request"}
                    placeholder={"Insert email"}
                />
                <input
                    className = {"service-request"}
                    placeholder={"Insert name"}
                />
            </form>
        </div>
    )
}

export default PersonalInformationForm;