import './serviceForm.css'

function PersonalInformationForm() {
    return (
        <>
            <h2 className={"service-form-section"}> Section 1: Employee Information </h2>
            <div className="form-container">
                <form className="service-form">
                    <input
                        className = {"service-request"}
                        placeholder={"insert email ..."}
                    />
                    <input
                        className = {"service-request"}
                        placeholder={"insert full name ..."}
                    />

                </form>
                <form className="service-form">
                    <input
                        className = {"service-request"}
                        placeholder={"insert phone number ..."}
                    />
                    <input
                        className = {"service-request"}
                        placeholder={"insert employee ID ..."}
                    />
                </form>
            </div>
        </>

    )
}

export default PersonalInformationForm;