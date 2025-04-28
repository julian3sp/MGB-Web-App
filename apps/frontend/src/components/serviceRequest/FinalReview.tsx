import { InputHeader } from "../signIn/InputHeader";
import { ErrorPopUp } from "./inputFields/ErrorPopUp";
import { SRQDropdown } from "./inputFields/SRQDropdown";
import { Combobox } from "./inputFields/Combobox";
import TextArea from "../TextArea";
import { languages } from "./data/languages";

type FinalReviewProps = {
    name: string;
    setName: (value: string) => void;
    employeeID: string;
    setEmployeeID: (value: string) => void;
    location: string;
    setLocation: (value: string) => void;
    department: string;
    setDepartment: (value: string) => void;
    priority: string;
    setPriority: (value: string) => void;
    status: string;
    setStatus: (value: string) => void;
    sourceLanguage: string;
    setSourceLanguage: (value: string) => void;
    targetLanguage: string;
    setTargetLanguage: (value: string) => void;
    cleaningType: string;
    setCleaningType: (value: string) => void;
    contaminant: string;
    setContaminant: (value: string) => void;
    accessZones: string;
    setAccessZones: (value: string) => void;
    securityIssue: string;
    setSecurityIssue: (value: string) => void;
    transportationType: string;
    setTransportationType: (value: string) => void;
    transportationDestination: string;
    setTransportationDestination: (value: string) => void;
    accommodationType: string;
    setAccommodationType: (value: string) => void;
    accommodationDetails: string;
    setAccommodationDetails: (value: string) => void;
    device: string;
    setDevice: (value: string) => void;
    operatorRequired: string;
    setOperatorRequired: (value: string) => void;
    maintenanceType: string;
    setMaintenanceType: (value: string) => void;
    equipmentType: string;
    setEquipmentType: (value: string) => void;
    comments: string;
    setComments: (value: string) => void;
    type: string;
    errors: any;
    clearError: (field: string) => void;
};

export function FinalReview({
    name, setName,
    employeeID, setEmployeeID,
    location, setLocation,
    department, setDepartment,
    priority, setPriority,
    status, setStatus,
    sourceLanguage, setSourceLanguage,
    targetLanguage, setTargetLanguage,
    cleaningType, setCleaningType,
    contaminant, setContaminant,
    accessZones, setAccessZones,
    securityIssue, setSecurityIssue,
    transportationType, setTransportationType,
    transportationDestination, setTransportationDestination,
    accommodationType, setAccommodationType,
    accommodationDetails, setAccommodationDetails,
    device, setDevice,
    operatorRequired, setOperatorRequired,
    maintenanceType, setMaintenanceType,
    equipmentType, setEquipmentType,
    comments, setComments,
    type, errors, clearError
}: FinalReviewProps) {
    return (
        <>
            <div className="grid grid-cols-2 gap-x-6 gap-y-4 px-6">
                {/* General Info */}
                <div>
                    <InputHeader>Name</InputHeader>
                    <ErrorPopUp
                        value={name}
                        setState={setName}
                        placeholder="Name"
                        width="w-full"
                        error={errors.name}
                        clearError={() => clearError('name')}
                    />
                </div>

                <div>
                    <InputHeader>Employee ID</InputHeader>
                    <ErrorPopUp
                        value={employeeID}
                        setState={(value) => {
                            if (/^\d*$/.test(value)) {
                                setEmployeeID(value);
                            }
                        }}
                        placeholder="Employee ID"
                        width="w-full"
                        maxLength={9}
                        error={errors.employeeID}
                        clearError={() => clearError('employeeID')}
                    />
                </div>

                <div>
                    <InputHeader>Location</InputHeader>
                    <SRQDropdown
                        value={location}
                        setValue={setLocation}
                        placeholder="Select Location"
                        width="w-full"
                        options={["Brigham & Women's Hospital Main Campus", "Chestnut Hill", "Faulkner Hospital", "Patriot Place"]}
                        error={errors.location}
                        clearError={() => clearError('location')}
                    />
                </div>

                <div>
                    <InputHeader>Department</InputHeader>
                    <SRQDropdown
                        value={department}
                        setValue={setDepartment}
                        placeholder="Select Department"
                        width="w-full"
                        options={["Laboratory", "Multi-Specialty Clinic", "Radiology", "Radiology, MRI/CT Scan"]}
                        error={errors.department}
                        clearError={() => clearError('department')}
                    />
                </div>

                <div>
                    <InputHeader>Priority</InputHeader>
                    <SRQDropdown
                        value={priority}
                        setValue={setPriority}
                        placeholder="Select Priority"
                        width="w-full"
                        options={["Low", "Medium", "High", "Emergency"]}
                        error={errors.priority}
                        clearError={() => clearError('priority')}
                    />
                </div>

                <div>
                    <InputHeader>Status</InputHeader>
                    <SRQDropdown
                        value={status}
                        setValue={setStatus}
                        placeholder="Select Status"
                        width="w-full"
                        options={["Unassigned", "Assigned", "Working", "Done"]}
                        error={errors.status}
                        clearError={() => clearError('status')}
                    />
                </div>

                {/* Type-Specific Fields */}
                {type === "Language" && (
                    <>
                        <div>
                            <InputHeader>Source Language (Patient)</InputHeader>
                            <Combobox
                                value={sourceLanguage}
                                setValue={setSourceLanguage}
                                placeholder="Source Language"
                                options={languages}
                                error={errors.sourceLanguage}
                                clearError={() => clearError('sourceLanguage')}
                            />
                        </div>
                        <div>
                            <InputHeader>Target Language (Doctor/Staff)</InputHeader>
                            <Combobox
                                value={targetLanguage}
                                setValue={setTargetLanguage}
                                placeholder="Target Language"
                                options={languages}
                                error={errors.targetLanguage}
                                clearError={() => clearError('targetLanguage')}
                            />
                        </div>
                    </>
                )}

                {type === "Sanitation" && (
                    <>
                        <div>
                            <InputHeader>Cleaning Needed</InputHeader>
                            <SRQDropdown
                                value={cleaningType}
                                setValue={setCleaningType}
                                placeholder="Select Cleaning"
                                width="w-full"
                                options={["Daily/General Cleaning", "Post-Patient Cleaning", "Spill Response", "Restroom Sanitization", "PPE Restock"]}
                                error={errors.cleaningType}
                                clearError={() => clearError('cleaningType')}
                            />
                        </div>
                        <div>
                            <InputHeader>Contaminant (Optional)</InputHeader>
                            <ErrorPopUp
                                value={contaminant}
                                setState={setContaminant}
                                placeholder="Contaminant"
                                width="w-full"
                            />
                        </div>
                    </>
                )}

                {/* Add your other types similarly: "Security", "Transportation", "AudioVisual", "MedicalDevice", "Facilities" */}

            </div>

            {/* Additional Comments */}
            <div className="mr-5 ml-5">
                <InputHeader>Additional Comments</InputHeader>
                <TextArea
                    placeholder="Additional Comments..."
                    value={comments}
                    setState={setComments}
                />
            </div>
        </>
    );
}
