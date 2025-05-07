import { FormEvent, useState } from 'react';

import ResetButton from '../ResetButton.tsx';
import { trpc } from '../../lib/trpc.ts';
import Modal from './modal.tsx';
import { ProgressBar } from './ServiceRequest/ProgressBar.tsx';
import { FormSteps } from './ServiceRequest/FormSteps.tsx'
import { FinalReview } from './ServiceRequest/FinalReview.tsx';
import { motion } from 'framer-motion';

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
    const [files, setFiles] = useState<File[]>([]);
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
    const [currentStep, setCurrentStep] = useState(1);
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

        if (!accommodationType && type === 'AudioVisual') {
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

        if (!cleaningType && type === 'Sanitation') {
            errors.cleaningType = 'Please set a cleaning type';
            console.log('cleaningType error');
        }

        if (!accessZones && type === 'Security') {
            errors.accessZones = 'Please set a access zone';
            console.log('accessZone error');
        }

        if (!securityIssue && type === 'Security') {
            errors.securityIssue = 'Please set a security issue';
            console.log('accessZone error');
        }

        if (!transportationType && type === 'Transportation') {
            errors.transportationType = 'Please set a transportation type';
            console.log('transportationType error');
        }

        if (!transportationDestination && type === 'Transportation') {
            errors.transportationDestination = 'Please set a transportation destination';
            console.log('transportationDestination error');
        }

        if (!device && type === 'MedicalDevice') {
            errors.device = 'Please select a device';
            console.log('medicalDevice error');
        }

        if (!operatorRequired && type === 'MedicalDevice') {
            errors.operatorRequired = 'Please select an option';
            console.log('operatorRequired error');
        }

        if (!maintenanceType && type === 'MaintenanceType') {
            errors.maintenanceType = 'Please select a maintenance type';
            console.log('maintenance error');
        }

        if (!equipmentType && type === 'EquipmentType') {
            errors.maintenanceType = 'Please select an equipment type';
            console.log('equipment error');
        }

        setErrors(errors);
        return Object.values(errors).some(value => value.length > 0);
    };

    const validateCurrentStep = (): boolean => {
        if (currentStep === 1) {
            if (!name || !employeeID) {
                Validate();
                return false;
            }
        } else if (currentStep === 2) {
            if (!location || !department || !priority || !status) {
                Validate();
                return false;
            }
        } else if (currentStep === 3) {
            if (type === "Language" && (!sourceLanguage || !targetLanguage)) {
                Validate();
                return false;
            }
            if (type === "Sanitation" && !cleaningType) {
                Validate();
                return false;
            }
            if (type === "Security" && (!accessZones || !securityIssue)) {
                Validate();
                return false;
            }
            if (type === "Transportation" && (!transportationType || !transportationDestination)) {
                Validate();
                return false;
            }
            if (type === "AudioVisual" && !accommodationType) {
                Validate();
                return false;
            }
            if (type === "MedicalDevice" && (!device || !operatorRequired)) {
                Validate();
                return false;
            }
            if (type === "Facilities" && (!maintenanceType || !equipmentType)) {
                Validate();
                return false;
            }
        }
        return true;
    };

    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        const form = e.currentTarget;
        const isValid = form.checkValidity();

        if (Validate()) {
            console.log('submission error')
            return;
        } else {
            setOpen(true);
        }

        let uploadedFileName: string | undefined = undefined;

        if (files && files.length > 0) {
            const imageFormData = new FormData();
            imageFormData.append('image_upload', files[0]);

            const response = await fetch('http://localhost:3001/upload-image', {
                method: 'POST',
                body: imageFormData,
            });

            const result = await response.json();
            if (response.ok) {
                uploadedFileName = result.filename;
            } else {
                console.error('Image upload failed:', result.error);
                return;
            }
        }


        mutation.mutate({
            name: name,
            employee_id: employeeID,
            priority: priority,
            location: location,
            department: department,
            status: status,
            request_type: type,
            additional_comments: comments,
            image_upload: uploadedFileName ?? undefined,
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
        setCurrentStep(1);
    };
    const handleReset = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        setName('');
        setEmployeeID('');
        setComments('');
        setFiles([]);
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
        <div className={'w-full h-screen'}>
            <div className={""}>
                <form
                    className=" text-sm flex flex-row"
                    onSubmit={handleSubmit}
                    onReset={handleReset}
                >
                    <div className="w-full flex flex-col gap-5 gap-x-2">
                        <motion.div
                            key="step1"
                            initial={{ y: 100, opacity: 0 }}
                            animate={{ y: 0, opacity: 1 }}
                            exit={{ y: -100, opacity: 0 }}
                            transition={{ duration: 0.5 }}
                        >

                        </motion.div>

                        {/*{type === "Sanitation" ? <h6 className="font-[Poppins] text-[12px] text-center">Created by Bryan and D</h6> : null}*/}
                        {/*{type === "AudioVisual" ? <h6 className="font-[Poppins] text-[12px] text-center">Created by Ayush and Conor</h6> : null}*/}
                        {/*{type === "Security" ? <h6 className="font-[Poppins] text-[12px] text-center">Jackson and Brendon</h6> : null}*/}

                        {currentStep <= 3 ? (
                            <FormSteps
                                currentStep={currentStep}
                                type={type}
                                name={name} setName={setName}
                                employeeID={employeeID} setEmployeeID={setEmployeeID}
                                location={location} setLocation={setLocation}
                                department={department} setDepartment={setDepartment}
                                priority={priority} setPriority={setPriority}
                                status={status} setStatus={setStatus}
                                sourceLanguage={sourceLanguage} setSourceLanguage={setSourceLanguage}
                                targetLanguage={targetLanguage} setTargetLanguage={setTargetLanguage}
                                cleaningType={cleaningType} setCleaningType={setCleaningType}
                                contaminant={contaminant} setContaminant={setContaminant}
                                accessZones={accessZones} setAccessZones={setAccessZones}
                                securityIssue={securityIssue} setSecurityIssue={setSecurityIssue}
                                transportationType={transportationType} setTransportationType={setTransportationType}
                                transportationDestination={transportationDestination} setTransportationDestination={setTransportationDestination}
                                accommodationType={accommodationType} setAccommodationType={setAccommodationType}
                                accommodationDetails={accommodationDetails} setAccommodationDetails={setAccommodationDetails}
                                device={device} setDevice={setDevice}
                                operatorRequired={operatorRequired} setOperatorRequired={setOperatorRequired}
                                maintenanceType={maintenanceType} setMaintenanceType={setMaintenanceType}
                                equipmentType={equipmentType} setEquipmentType={setEquipmentType}
                                comments={comments} setComments={setComments}
                                files={files} setFiles={setFiles}
                                errors={errors}
                                clearError={clearError}
                            />
                        ) : (
                            <div className="max-h-[85vh] overflow-y-auto">
                            <FinalReview
                                type={type}
                                name={name} setName={setName}
                                employeeID={employeeID} setEmployeeID={setEmployeeID}
                                location={location} setLocation={setLocation}
                                department={department} setDepartment={setDepartment}
                                priority={priority} setPriority={setPriority}
                                status={status} setStatus={setStatus}
                                sourceLanguage={sourceLanguage} setSourceLanguage={setSourceLanguage}
                                targetLanguage={targetLanguage} setTargetLanguage={setTargetLanguage}
                                cleaningType={cleaningType} setCleaningType={setCleaningType}
                                contaminant={contaminant} setContaminant={setContaminant}
                                accessZones={accessZones} setAccessZones={setAccessZones}
                                securityIssue={securityIssue} setSecurityIssue={setSecurityIssue}
                                transportationType={transportationType} setTransportationType={setTransportationType}
                                transportationDestination={transportationDestination} setTransportationDestination={setTransportationDestination}
                                accommodationType={accommodationType} setAccommodationType={setAccommodationType}
                                accommodationDetails={accommodationDetails} setAccommodationDetails={setAccommodationDetails}
                                device={device} setDevice={setDevice}
                                operatorRequired={operatorRequired} setOperatorRequired={setOperatorRequired}
                                maintenanceType={maintenanceType} setMaintenanceType={setMaintenanceType}
                                equipmentType={equipmentType} setEquipmentType={setEquipmentType}
                                comments={comments} setComments={setComments}
                                files={files} setFiles={setFiles}
                                errors={errors}
                                clearError={clearError}
                            />
                            </div>

                        )}

                        <div className="flex justify-center gap-6 mt-3">
                            {currentStep > 1 && (
                                <button onClick={(e) => { e.preventDefault(); setCurrentStep(currentStep - 1); }}
                                    className='w-30 h-11 bg-[#003a96] hover:bg-blue-950 transition text-[11pt] p-5 rounded-lg  flex items-center justify-center cursor-pointer text-white font-bold'
                                >
                                    Back
                                </button>
                            )}
                            {currentStep < 4 && (
                                <button onClick={(e) => {
                                    e.preventDefault();
                                    if (!validateCurrentStep()) return;
                                    setCurrentStep(currentStep + 1);
                                }}
                                    className='w-30 h-11 bg-[#003a96] hover:bg-blue-950 text-[11pt] transition p-5 rounded-lg flex items-center justify-center cursor-pointer text-white font-bold'
                                >
                                    Next
                                </button>
                            )}
                            {currentStep === 4 && (
                                <button type="submit" className='w-30 h-11 bg-[#003a96] text-[11pt] hover:bg-blue-950 transition p-5 rounded-lg  flex items-center justify-center cursor-pointer text-white font-bold'>
                                    Submit
                                </button>
                            )}
                        </div>
                    </div>
                    <div className={'pl-5 pt-5 '}>
                    <ProgressBar
                        currentStep={currentStep}
                        name={name}
                        employeeID={employeeID}
                        location={location}
                        department={department}
                        priority={priority}
                        status={status}
                        type={type}
                        sourceLanguage={sourceLanguage}
                        targetLanguage={targetLanguage}
                        cleaningType={cleaningType}
                        accessZones={accessZones}
                        securityIssue={securityIssue}
                        transportationType={transportationType}
                        transportationDestination={transportationDestination}
                        accommodationType={accommodationType}
                        device={device}
                        operatorRequired={operatorRequired}
                        maintenanceType={maintenanceType}
                        equipmentType={equipmentType}
                    />
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
        </div>
    );
}


export default RequestForm;