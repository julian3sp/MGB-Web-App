import { FormEvent, useState } from 'react';
import { AuthenticationError } from '@auth0/auth0-react';
import {ServiceComponentDropdown} from "./inputFields/ServiceComponentDropdown.tsx";
import TextArea from '../TextArea.tsx';
import SubmitButton from '../SubmitButton.tsx';
import { ServiceComponentInputBox } from './inputFields/ServiceComponentInputBox.tsx';
import { InputHeader } from '../signIn/InputHeader.tsx';
import ResetButton from '../ResetButton.tsx';
import { trpc } from '../../lib/trpc.ts';
import Modal from './modal.tsx';

type requestFormProps = {
    title: string;
    type: string;
};

type errorProps =
    {
    name: string,
    comments: string,
    department: string,
    priority: string,
    location: string,
    status: string,
    cleaningType: string,
    language: string,
}

function RequestForm({ title, type }: requestFormProps) {
    const [response, setResponse] = useState('');
    const [name, setName] = useState('');
    const [comments, setComments] = useState('');
    const [priority, setPriority] = useState<string>("");
    const [location, setLocation] = useState<string>("");
    const [department, setDepartment] = useState<string>("");
    const [cleaningType, setCleaningType] = useState<string>("");
    const [language, setLanguage] = useState<string>("");
    const [status, setStatus] = useState<string>("");
    const mutation = trpc.createRequest.useMutation()
    const [open, setOpen] = useState<boolean>(false);
    const [errors, setErrors] = useState({
        name: '',
        priority: '',
        location: '',
        department: '',
        status: '',
        comments: '',
        cleaningType: '',
        language: '',
    });

    const Validate = (): boolean => {
        const errors: errorProps = {
            name: '',
            priority: '',
            location: '',
            department: '',
            status: '',
            comments: '',
            cleaningType: '',
            language: '',
        }

        if (!name) {
            errors.name = "Name is required";
            console.log('name-r');
        } else if (name.length < 2) {
            errors.name = `Name must be at least two characters`;
            console.log('name-l');

        } else if (!/^[a-zA-Z\s'-]+$/.test(name)) {
            errors.name = "Name contains invalid characters";
            console.log('name-t');

        }

        if (!language && type === 'language') {
            errors.language = "Please select a language";
            console.log('language error');
        }

        if (!department) {
            errors.department = 'Please set a department';
            console.log('department error');
        }

        if (!location) {
            errors.location = 'Please set a location';
            console.log('location error');
        }

        if (!status) {
            errors.status = 'Please set a status';
            console.log('status error');
        }

        if (!priority) {
            errors.priority = 'Please set a priority';
            console.log('priority error');
        }

        if (!cleaningType && type ==='sanitation') {
            errors.priority = 'Please set a cleaning type';
            console.log('cleaningType error');
        }

        setErrors(errors);
        return Object.values(errors).some(value => value.length > 0);
    };

    const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        const form = e.currentTarget; // This is the actual HTMLFormElement
        const isValid = form.checkValidity(); // Now

        if (Validate()) {
            console.log('submission error')
            return;
        }
        else{setOpen(true);}

        mutation.mutate({
            name: name,
            priority: priority,
            location: location,
            department: department,
            status: status,
            request_type: type,
            ...(type === 'Language' && {
                language: {
                    language: language,
                },
            }),
            ...(type === 'Sanitation' && {
                sanitation: {
                    cleaningType: cleaningType,
                },
            }),
        });

        handleReset(e);
    };
    const handleReset = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        setName('');
        setComments('');
        setLocation('');
        setDepartment('');
        setStatus('');
        setPriority('');
        setLanguage('');
        setCleaningType('');

        setErrors({
            name: '',
            priority: '',
            location: '',
            department: '',
            status: '',
            comments: '',
            cleaningType: '',
            language: '',
        });
    };



    return (
        <>
            <div>
                <form
                    className="justify-center  text-sm"
                    onSubmit={handleSubmit}
                    onReset={handleReset}
                >
                    <div className=" rounded-lg shadow-lg overflow-hidden w-200 bg-white flex flex-col gap-5">

                        <h2 className="text-center py-5 text-[20px] font-[Poppins] text-lg font-semibold bg-[#003a96] text-white rounded-tr-md rounded-tl-md">
                            {title}
                        </h2>

                        {/* Employee Information (Two-Column Grid) */}
                        <div className="grid grid-cols-2 gap-x-6 gap-y-4 px-6">
                            <div>
                                <InputHeader>Name:</InputHeader>
                                <ServiceComponentInputBox
                                    value={name}
                                    setState={setName}
                                    placeholder="Name"
                                    width="w-full"
                                    error={errors.name}/>
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

                                {type === "Language" ?
                                    <>
                                        <InputHeader>Language</InputHeader>
                                        <ServiceComponentInputBox
                                        value={language}
                                        setState={setLanguage}
                                        placeholder={"Language"}
                                        width="w-full"
                                        error={errors.language}/>
                                    </>
                                    : null}

                                {type === "Sanitation" ?
                                    <>
                                        <InputHeader>Cleaning Needed</InputHeader>
                                        <ServiceComponentDropdown
                                        value={cleaningType}
                                        setState={setCleaningType}
                                        placeholder={"Select Cleaning"}
                                        width={"w-full"}
                                        error={errors.cleaningType}
                                        options={["General Disinfecting", "Special Cleaning", "PPE", "Janitorial Services"]}/>
                                    </>
                                    : null}
                            </div>
                        </div>
                        <div className={'mr-5 ml-5'}>
                            <InputHeader children={'Additional Comments:'} />
                            <TextArea
                                placeholder="Additional Comments..."
                                value={comments}
                                setState={setComments}
                            />
                        </div>

                        {/* Buttons */}
                        <div className=" flex  gap-5 justify-center">
                            <ResetButton label={'Reset'} type={"reset"}/>
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
    );
}


export default RequestForm;