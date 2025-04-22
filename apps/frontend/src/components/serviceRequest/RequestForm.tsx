import { FormEvent, useState } from 'react';
import { AuthenticationError } from '@auth0/auth0-react';
import {ServiceComponentDropdown} from "./inputFields/ServiceComponentDropdown.tsx";
import {ErrorPopUp} from "./inputFields/ErrorPopUp.tsx";
import {SRQDropdown} from "./inputFields/SRQDropdown.tsx";
import {Combobox} from "./inputFields/Combobox.tsx";
import TextArea from '../TextArea.tsx';
import SubmitButton from '../SubmitButton.tsx';
import { InputHeader } from '../signIn/InputHeader.tsx';
import ResetButton from '../ResetButton.tsx';
import { trpc } from '../../lib/trpc.ts';
import Modal from './modal.tsx';
import {languages} from "./data/languages.ts";

type requestFormProps = {
    title: string;
    type: string;
};

type errorProps =
    {
    name: string,
    employeeID: string,
    department: string,
    priority: string,
    location: string,
    status: string,
    cleaningType: string,
    accommodationType: string,
    sourceLanguage: string,
    targetLanguage: string,
    accessZones: string,
    securityIssue: string,
    transportationType: string,
    transportationDestination: string,
    device: string,
    operatorRequired: string,
    maintenanceType: string,
    equipmentType: string,
}

function RequestForm({ title, type }: requestFormProps) {
    const [response, setResponse] = useState('');
    const [name, setName] = useState('');
    const [comments, setComments] = useState('');
    const [employeeID, setEmployeeID] = useState('');
    const [priority, setPriority] = useState<string>("");
    const [location, setLocation] = useState<string>("");
    const [department, setDepartment] = useState<string>("");
    const [cleaningType, setCleaningType] = useState<string>("");
    const [contaminant, setContaminant] = useState<string>("");
    const [sourceLanguage, setSourceLanguage] = useState<string>("");
    const [targetLanguage, setTargetLanguage] = useState<string>("");
    const [accommodationType, setAccommodationType] = useState<string>("");
    const [accommodationDetails, setAccommodationDetails] = useState<string>("");
    const [accessZones, setAccessZones] = useState<string>("");
    const [securityIssue, setSecurityIssue] = useState<string>("");
    const [transportationType, setTransportationType] = useState<string>("");
    const [transportationDestination, setTransportationDestination] = useState<string>("");
    const [device, setDevice] = useState<string>("");
    const [operatorRequired, setOperatorRequired] = useState<string>("");
    const [maintenanceType, setMaintenanceType] = useState<string>("");
    const [equipmentType, setEquipmentType] = useState<string>("");
    const [status, setStatus] = useState<string>("");
    const mutation = trpc.createRequest.useMutation()
    const [open, setOpen] = useState<boolean>(false);
    const [errors, setErrors] = useState({
        name: '',
        employeeID: '',
        priority: '',
        location: '',
        department: '',
        status: '',
        cleaningType: '',
        sourceLanguage: '',
        targetLanguage: '',
        accommodationType: '',
        accessZones: '',
        securityIssue: '',
        transportationType: '',
        transportationDestination: '',
        device: '',
        operatorRequired: '',
        maintenanceType: '',
        equipmentType: '',
    });

    const Validate = (): boolean => {
        const errors: errorProps = {
            name: '',
            employeeID: '',
            priority: '',
            location: '',
            department: '',
            status: '',
            cleaningType: '',
            sourceLanguage: '',
            targetLanguage: '',
            accommodationType: '',
            accessZones: '',
            securityIssue: '',
            transportationType: '',
            transportationDestination: '',
            device: '',
            operatorRequired: '',
            maintenanceType: '',
            equipmentType: '',
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

        if (!sourceLanguage && type === 'Language') {
            errors.sourceLanguage = "Please select a source language";
            console.log('sourceLanguage error');
        }

        if (!targetLanguage && type === 'Language') {
            errors.targetLanguage = "Please select a target language";
            console.log('targetLanguage error');
        }

        if(!accommodationType && type === 'AudioVisual') {
            errors.accommodationType = "Please select an accommodation type";
            console.log('accommodationType error');
        }

        if (!employeeID) {
            errors.employeeID = "Employee ID is required";
        } else if (employeeID.length < 9) {
            errors.employeeID = `Employee ID must be at least 9 characters`;
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

        if (!cleaningType && type ==='Sanitation') {
            errors.cleaningType = 'Please set a cleaning type';
            console.log('cleaningType error');
        }

        if (!accessZones && type ==='Security') {
            errors.accessZones = 'Please set a access zone';
            console.log('accessZone error');
        }

        if (!securityIssue && type ==='Security') {
            errors.securityIssue = 'Please set a security issue';
            console.log('accessZone error');
        }

        if (!transportationType && type==='Transportation') {
            errors.transportationType = 'Please set a transportation type';
            console.log('transportationType error');
        }

        if (!transportationDestination && type==='Transportation') {
            errors.transportationDestination = 'Please set a transportation destination';
            console.log('transportationDestination error');
        }

        if (!device && type==='MedicalDevice') {
            errors.device = 'Please select a device';
            console.log('medicalDevice error');
        }

        if (!operatorRequired && type==='MedicalDevice') {
            errors.operatorRequired = 'Please select an option';
            console.log('operatorRequired error');
        }

        if(!maintenanceType && type==='MaintenanceType') {
            errors.maintenanceType = 'Please select a maintenance type';
            console.log('maintenance error');
        }

        if(!equipmentType && type==='EquipmentType') {
            errors.maintenanceType = 'Please select an equipment type';
            console.log('equipment error');
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
            employee_id: employeeID,
            priority: priority,
            location: location,
            department: department,
            status: status,
            request_type: type,
            additional_comments: comments,
            ...(type === 'Language' && {
                language: {
                    sourceLanguage: sourceLanguage,
                    targetLanguage: targetLanguage,
                },
            }),
            ...(type === 'Sanitation' && {
                sanitation: {
                    cleaningType: cleaningType,
                    contaminant: contaminant,
                },
            }),
            ...(type === 'Security' && {
                security: {
                    accessZones: accessZones,
                    securityIssue: securityIssue,
                },
            }),
            ...(type === 'Transportation' && {
                transportation: {
                    transportationType: transportationType,
                    transportationDestination: transportationDestination,
                },
            }),
            ...(type === 'AudioVisual' && {
                audioVisual: {
                    accommodationType: accommodationType,
                    accommodationDetails: accommodationDetails,
                },
            }),
            ...(type === 'MedicalDevice' && {
                medicalDevice: {
                    device: device,
                    operatorRequired: operatorRequired,
                },
            }),
            ...(type === 'Facilities' && {
                facilities: {
                    maintenanceType: maintenanceType,
                    equipmentType: equipmentType,
                },
            }),
        });

        handleReset(e);
    };
    const handleReset = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        setName('');
        setEmployeeID('');
        setComments('');
        setLocation('');
        setDepartment('');
        setStatus('');
        setPriority('');
        setSourceLanguage('');
        setTargetLanguage('');
        setCleaningType('');
        setAccessZones('');
        setSecurityIssue('');
        setTransportationType('');
        setTransportationDestination('');
        setAccommodationType('');
        setAccommodationDetails('');
        setDevice('');
        setOperatorRequired('');
        setMaintenanceType('');
        setEquipmentType('');

        setErrors({
            name: '',
            employeeID: '',
            priority: '',
            location: '',
            department: '',
            status: '',
            cleaningType: '',
            sourceLanguage: '',
            targetLanguage: '',
            accommodationType: '',
            accessZones: '',
            securityIssue: '',
            transportationType: '',
            transportationDestination: '',
            device: '',
            operatorRequired: '',
            maintenanceType: '',
            equipmentType: '',
        });
    };

    const clearError = (field: string) => {
        setErrors(prev => ({ ...prev, [field]: undefined }));
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

                        {type === "Sanitation" ? <h6 className="font-[Poppins] text-[12px] text-center">Created by Bryan and D</h6> : null}
                        {type === "AudioVisual" ? <h6 className="font-[Poppins] text-[12px] text-center">Created by Ayush and Conor</h6> : null}
                        {type === "Security" ? <h6 className="font-[Poppins] text-[12px] text-center">Jackson and Brendon</h6> : null}

                        {/* Employee Information (Two-Column Grid) */}
                        <div className="grid grid-cols-2 gap-x-6 gap-y-4 px-6">
                            <div>
                                <InputHeader>Name:</InputHeader>
                                <ErrorPopUp
                                    value={name}
                                    setState={setName}
                                    placeholder="Name"
                                    width="w-full"
                                    error={errors.name}
                                    clearError={() => clearError('name')}/>
                            </div>

                            <div>
                                <InputHeader>Employee ID:</InputHeader>
                                <ErrorPopUp
                                    value={employeeID}
                                    setState={(value) => {
                                        if (/^\d*$/.test(value)) {
                                            setEmployeeID(value);}
                                    }}
                                    maxLength={9}
                                    placeholder="Employee ID"
                                    width="w-full"
                                    error={errors.employeeID}
                                    clearError={() => clearError('employeeID')}/>
                            </div>

                            <div>
                                <InputHeader>Location</InputHeader>
                                <SRQDropdown
                                    value={location}
                                    setValue={setLocation}
                                    placeholder={"Select Location"}
                                    error={errors.location}
                                    options={["Brigham & Women's Hospital Main Campus",
                                        "Chestnut Hill",
                                        "Faulkner Hospital",
                                        "Patriot Place"]}
                                    clearError={() => clearError('location')}
                                />
                            </div>

                            <div>
                                <InputHeader>Department</InputHeader>
                                <SRQDropdown
                                    value={department}
                                    setValue={setDepartment}
                                    placeholder={"Select Department"}
                                    error={errors.department}
                                    options={["Laboratory", "Multi-Specialty Clinic", "Radiology", "Radiology, MRI/CT Scan"]}
                                    clearError={() => clearError('department')}
                                />
                            </div>

                            <div>
                                <InputHeader>Priority</InputHeader>
                                <SRQDropdown
                                    value={priority}
                                    setValue={setPriority}
                                    options={["Low", "Medium", "High", "Emergency"]}
                                    placeholder={"Select Priority"}
                                    error={errors.priority}
                                    clearError={() => clearError('priority')}
                                />
                            </div>

                            <div>
                                <InputHeader>Status</InputHeader>
                                <SRQDropdown
                                    value={status}
                                    setValue={setStatus}
                                    placeholder={"Select Status"}
                                    error={errors.status}
                                    options={["Unassigned", "Assigned", "Working", "Done"]}
                                    clearError={() => clearError('status')}
                                />
                            </div>

                            {type === "Language" ?
                                <>
                                    <div>
                                        <InputHeader>Source Language (Patient)</InputHeader>
                                        <Combobox
                                            options={languages}
                                            value={sourceLanguage}
                                            setValue={setSourceLanguage}
                                            placeholder={"Source Language"}
                                            error={errors.sourceLanguage}
                                            clearError={() => clearError('sourceLanguage')}/>
                                    </div>
                                    <div>
                                        <InputHeader>Target Language (Doctor/Staff)</InputHeader>
                                        <Combobox
                                            options={languages}
                                            value={targetLanguage}
                                            setValue={setTargetLanguage}
                                            error={errors.targetLanguage}
                                            clearError={() => clearError('targetLanguage')}
                                            placeholder={"Select a Language"}/>
                                    </div>
                                </>
                                : null}

                            {type === "Sanitation" ?
                                <>
                                    <div>
                                        <InputHeader>Cleaning Needed</InputHeader>
                                        <SRQDropdown
                                        value={cleaningType}
                                        setValue={setCleaningType}
                                        placeholder={"Select Cleaning Needed"}
                                        error={errors.cleaningType}
                                        options={["Daily/General Cleaning", "Post-Patient Cleaning", "Spill Response", "Restroom Sanitization", "PPE Restock"]}
                                        clearError={() => clearError('cleaningType')}/>
                                    </div>
                                    <div>
                                        <InputHeader>Contaminant (Optional)</InputHeader>
                                        <ErrorPopUp
                                            value={contaminant}
                                            setState={setContaminant}
                                            placeholder={"Contaminant"}
                                            width="w-full"/>
                                    </div>
                                </>
                                : null}

                            {type === "Security" ?
                                <>
                                    <div>
                                        <InputHeader>Security Needed</InputHeader>
                                        <SRQDropdown
                                            value={accessZones}
                                            setValue={setAccessZones}
                                            placeholder={"Select Access Zones Needed"}
                                            error={errors.accessZones}
                                            options={[
                                                "",
                                                "ICU",
                                                "Operating Room",
                                                "Pharmacy",
                                                "Medical Records",
                                                "Pediatric Ward",
                                                "Emergency Department",
                                                "Laboratory",
                                                "Server Room (IT)",
                                                "Supply Closet",
                                                "Radiology",
                                                "Morgue"
                                            ]}
                                            clearError={() => clearError('accessZones')}
                                        />
                                    </div>
                                    <div>
                                        <InputHeader>Security Issue</InputHeader>
                                        <ErrorPopUp
                                            value={securityIssue}
                                            setState={setSecurityIssue}
                                            placeholder={"Security Issue"}
                                            width="w-full"
                                            error={errors.securityIssue}
                                            clearError={() => clearError('securityIssue')}/>
                                    </div>
                                </>
                                : null}

                            {type === "Transportation" ?
                                <>
                                    <div>
                                        <InputHeader>Transportation Type</InputHeader>
                                        <SRQDropdown
                                            value={transportationType}
                                            setValue={setTransportationType}
                                            placeholder={"Select Transportation Type"}
                                            error={errors.transportationType}
                                            options={["Ambulance", "Helicopter", "Other (Please Specify Below)"]}
                                            clearError={() => clearError('transportationType')}/>
                                    </div>
                                    <div>
                                        <InputHeader>Destination</InputHeader>
                                        <SRQDropdown
                                            value={transportationDestination}
                                            setValue={setTransportationDestination}
                                            placeholder={"Select Destination"}
                                            error={errors.transportationDestination}
                                            options={["Brigham & Women's Hospital Main Campus",
                                                "Chestnut Hill",
                                                "Faulkner Hospital",
                                                "Patriot Place"]}
                                            clearError={() => clearError('transportationDestination')}/>
                                    </div>
                                </>
                                : null}

                            {type === "AudioVisual" ?
                                <>
                                    <div>
                                        <InputHeader>Accommodation Type</InputHeader>
                                        <SRQDropdown
                                            value={accommodationType}
                                            setValue={setAccommodationType}
                                            placeholder={"Select Accommodation Type"}
                                            error={errors.accommodationType}
                                            options={["ASL Interpreter", "Live Captioning", "Braille Materials", "Tactile Interpreter", "Other (Please Specify Below)"]}
                                            clearError={() => clearError('accommodationType')}/>
                                    </div>
                                    <div>
                                        <InputHeader>Accommodation Details (Optional)</InputHeader>
                                        <ErrorPopUp
                                            value={accommodationDetails}
                                            setState={setAccommodationDetails}
                                            placeholder={"Enter Accommodation Details"}
                                            width="w-full"
                                            />
                                    </div>
                                </>
                                : null}
                            {type === "MedicalDevice" ?
                                <>
                                    <div>
                                        <InputHeader>Medical Device</InputHeader>
                                        <SRQDropdown
                                            value={device}
                                            setValue={setDevice}
                                            placeholder={"Select a Device"}
                                            error={errors.device}
                                            options={["EKG", "X-Ray", "Ventilator", "CT Scan", "Defibrillator"]}
                                            clearError={() => clearError('device')}/>
                                    </div>
                                    <div>
                                        <InputHeader>Operator Required</InputHeader>
                                        <SRQDropdown
                                            value={operatorRequired}
                                            setValue={setOperatorRequired}
                                            placeholder={"Do You Require an Operator?"}
                                            error={errors.operatorRequired}
                                            options={["Yes", "No"]}
                                            clearError={() => clearError('operatorRequired')}/>
                                    </div>
                                </>
                                : null}
                            {type === "Facilities" ?
                                <>
                                    <div>
                                        <InputHeader>Maintenance Type</InputHeader>
                                        <SRQDropdown
                                            value={maintenanceType}
                                            setValue={setMaintenanceType}
                                            placeholder={"Select Maintenance Type"}
                                            error={errors.maintenanceType}
                                            options={["Elevator", "Plumbing", "HVAC/R", "Power", "Electrical", "Other (Please Specify Below)"]}
                                            clearError={() => clearError('maintenanceType')}/>
                                    </div>
                                    <div>
                                        <InputHeader>Equipment Type</InputHeader>
                                        <ErrorPopUp
                                            value={equipmentType}
                                            setState={setEquipmentType}
                                            placeholder={"Specify any Equipment Needed"}
                                            width={"w-full"}
                                            error={errors.equipmentType}
                                            clearError={() => clearError('equipmentType')}/>
                                    </div>
                                </>
                                : null}

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