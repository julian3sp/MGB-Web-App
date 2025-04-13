import {useState} from "react";
import { InputHeader } from '../signIn/InputHeader.tsx';
import { ServiceComponentInputBox } from '../serviceRequest/inputFields/ServiceComponentInputBox.tsx';
import {ServiceComponentDropdown} from "../serviceRequest/inputFields/ServiceComponentDropdown.tsx";
import ResetButton from "../ResetButton.tsx";
import SubmitButton from "../SubmitButton.tsx";
import Modal from "../serviceRequest/modal.tsx";
import {trpc} from "../../lib/trpc.ts";

type errorProps = {
    name: string,
    email: string,
    employeeID: string,
    priority: string,
    location: string,
    department: string,
    status: string,
    cleaningType: string,
}

export function SanitationRequestForm() {

    const [name, setName] = useState<string>("");
    const [priority, setPriority] = useState<string>("");
    const [location, setLocation] = useState<string>("");
    const [department, setDepartment] = useState<string>("");
    const [status, setStatus] = useState<string>("");
    const [employeeID, setEmployeeID] = useState<string>("");
    const [cleaningType, setCleaningType] = useState<string>("");
    const [email, setEmail] = useState<string>("");
    const mutation = trpc.createSanitationRequest.useMutation()
    const [open, setOpen] = useState<boolean>(false);
    const [errors, setErrors] = useState({
        name: "",
        priority: "",
        location: "",
        department: "",
        status: "",
        employeeID: "",
        cleaningType: "",
        email: "",
    });

    const Validate = (): boolean => {
        const errors: errorProps = {
            name: "",
            priority: "",
            location: "",
            department: "",
            status: "",
            employeeID: "",
            cleaningType: "",
            email: "",
        };

        if (!name) {
            errors.name = 'Name is required';
        } else if (name.length < 2) {
            errors.name = `Name must be at least two characters`;
        } else if (!/^[a-zA-Z\s'-]+$/.test(name)) {
            errors.name = 'Name contains invalid characters';
        }

        if (!location || location === 'Select An Option') {
            errors.location = 'Please select a location';
        }

        if (!priority || priority === 'Select An Option') {
            errors.priority = 'Please set a priority';
        }

        if (!status || status === 'Select An Option') {
            errors.status = 'Please set a status';
        }

        if (!cleaningType) {
            errors.cleaningType = 'Please set a cleaning type';
        }

        if (!department) {
            errors.department = 'Please set a department';
        }

        if (!email) {
            errors.email = 'Email is required';
        } else if (!/\S+@\S+\.\S+/.test(email)) {
            errors.email = 'Email is invalid';
        }

        if (!employeeID) {
            errors.employeeID = 'Employee ID is required';
        } else if (employeeID.length < 9) {
            errors.employeeID = `Employee ID must be at least 9 characters`;
        }

        setErrors(errors);
        return Object.values(errors).some((value) => value.length > 0);
    };

    const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        const form = e.currentTarget; // This is the actual HTMLFormElement
        const isValid = form.checkValidity(); // Now

        if (Validate()) {
            return;
        }
        else{setOpen(true);}



        mutation.mutate({
            name: name,
            priority: priority,
            location: location,
            department: department,
            status: status,
            employeeID: employeeID,
            cleaningType: cleaningType,
            email: email,
        });
        handleReset(e);
    };
    const handleReset = (e) => {
        e.preventDefault();
        setEmail('');
        setName('');
        setLocation('');
        setEmployeeID('');
        setCleaningType('');
        setEmployeeID('');
        setDepartment('');
    };


    return (
        <>
            <div>
                <form
                    className="justify-center text-sm"
                    onSubmit={handleSubmit}
                    onReset={handleReset}
                >
                    <div className="rounded-lg shadow-lg overflow-hidden w-200 bg-white flex flex-col gap-5">
                        <h2 className="text-center py-5 text-[20px] font-[Poppins] text-lg font-semibold bg-[#003a96] text-white rounded-tr-md rounded-tl-md">
                            Sanitation Services Request Form
                        </h2>
                        <div className="grid grid-cols-2 gap-x-6 gap-y-4 px-6">
                            <div>
                                <InputHeader>Name</InputHeader>
                                <ServiceComponentInputBox
                                    value={name}
                                    setState={setName}
                                    placeholder={"Name"}
                                    width={"w-full"}
                                    error={errors.name}
                                    />
                            </div>

                            <div>
                                <InputHeader>Priority</InputHeader>
                                <ServiceComponentDropdown
                                    value={priority}
                                    setState={setPriority}
                                    width={"w-full"}
                                    options={["Low", "Medium", "High", "Emergency"]}
                                    placeholder={"Select Priority"}
                                    error={errors.priority}
                                />
                            </div>

                            <div>
                                <InputHeader>Location</InputHeader>
                                <ServiceComponentDropdown
                                    value={location}
                                    setState={setLocation}
                                    placeholder={"Select Location"}
                                    width={"w-full"}
                                    error={errors.location}
                                    options={["Brigham & Women's Hospital Main Campus",
                                        "Chestnut Hill",
                                        "Faulkner Hospital",
                                        "Patriot Place"]}
                                />
                            </div>

                            <div>
                                <InputHeader>Department</InputHeader>
                                <ServiceComponentDropdown
                                    value={department}
                                    setState={setDepartment}
                                    placeholder={"Select Department"}
                                    width={"w-full"}
                                    error={errors.department}
                                    options={["Laboratory", "Multi-Specialty Clinic", "Radiology", "Radiology, MRI/CT Scan"]}
                                />
                            </div>

                            <div>
                                <InputHeader>Status</InputHeader>
                                <ServiceComponentDropdown
                                    value={status}
                                    setState={setStatus}
                                    placeholder={"Select Status"}
                                    width={"w-full"}
                                    error={errors.status}
                                    options={["Unassigned", "Assigned", "Working", "Done"]}
                                />
                            </div>

                            <div>
                                <InputHeader>Employee ID</InputHeader>
                                <ServiceComponentInputBox
                                    value={employeeID}
                                    setState={setEmployeeID}
                                    placeholder={"Employee ID"}
                                    width={"w-full"}
                                    error={errors.employeeID}
                                />
                            </div>

                            <div>
                                <InputHeader>Cleaning Required</InputHeader>
                                <ServiceComponentDropdown
                                    value={cleaningType}
                                    setState={setCleaningType}
                                    placeholder={"Select Cleaning"}
                                    width={"w-full"}
                                    error={errors.cleaningType}
                                    options={["General Disinfecting", "Special Cleaning", "PPE", "Janitorial Services"]}
                                />
                            </div>

                            <div>
                                <InputHeader>Email</InputHeader>
                                <ServiceComponentInputBox
                                    value={email}
                                    setState={setEmail}
                                    placeholder={"Email"}
                                    width={"w-full"}
                                    error={errors.email}
                                />
                            </div>
                        </div>
                        <div className=" flex  gap-5 justify-center">
                            <ResetButton label={'Reset'} />
                            <SubmitButton
                                label={'Submit'}
                                type={'submit'}/>
                        </div>
                    </div>

                </form>
                <Modal isOpen={open} onClose={() => setOpen(false)}>
                    <div className="flex flex-col gap-4">
                        <h1 className="text-2xl font-[poppins]">Success!</h1>
                        <p className={'font-[poppins]'}>
                            The hospital has received your request, and we will assist you as soon
                            as possible.
                        </p>
                        <p className={'font-[poppins]'}>
                            As always, thank you for coming to Mass General Brigham!
                        </p>
                        <hr className="border-t-solid border-1 border-grey" />
                        <div className="flex flex-row justify-center">
                            <ResetButton
                                label={'Close'}
                                onClick={() => setOpen(false)}
                            ></ResetButton>
                        </div>
                    </div>
                </Modal>
            </div>
        </>
    )
}