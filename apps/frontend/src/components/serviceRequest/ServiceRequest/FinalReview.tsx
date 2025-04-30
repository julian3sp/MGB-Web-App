import { InputHeader } from "../../signIn/InputHeader";
import { ErrorPopUp } from "../inputFields/ErrorPopUp";
import { SRQDropdown } from "../inputFields/SRQDropdown";
import { Combobox } from "../inputFields/Combobox";
import TextArea from "../../TextArea";
import { languages } from "../data/languages";

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
};

export function FinalReview({
    type,
    name,
    setName,
    employeeID,
    setEmployeeID,
    location,
    setLocation,
    department,
    setDepartment,
    priority,
    setPriority,
    status,
    setStatus,
    sourceLanguage,
    setSourceLanguage,
    targetLanguage,
    setTargetLanguage,
    cleaningType,
    setCleaningType,
    contaminant,
    setContaminant,
    accessZones,
    setAccessZones,
    securityIssue,
    setSecurityIssue,
    transportationType,
    setTransportationType,
    transportationDestination,
    setTransportationDestination,
    accommodationType,
    setAccommodationType,
    accommodationDetails,
    setAccommodationDetails,
    device,
    setDevice,
    operatorRequired,
    setOperatorRequired,
    maintenanceType,
    setMaintenanceType,
    equipmentType,
    setEquipmentType,
    comments,
    setComments,

}: FinalReviewProps) {
    return (
        <div className={'border-1 shadow-lg rounded-lg  ml-5 py-5 '}>
            <div className="grid  grid-cols-2 gap-x-4 gap-y-4 px-6">
                {/* General Info */}
                <div>
                    <InputHeader>Name</InputHeader>
                    <ErrorPopUp
                        value={name}
                        setState={setName}
                        placeholder="Name"
                        width="w-full"
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
                                placeholder={"Source Language"} />
                        </div>
                        <div>
                            <InputHeader>Target Language (Doctor/Staff)</InputHeader>
                            <Combobox
                                options={languages}
                                value={targetLanguage}
                                setValue={setTargetLanguage}
                                placeholder={"Select a Language"} />
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
                                width={"w-full"}
                                options={["Daily/General Cleaning", "Post-Patient Cleaning", "Spill Response", "Restroom Sanitization", "PPE Restock"]}
                            />
                        </div>
                        <div>
                            <InputHeader>Contaminant (Optional)</InputHeader>
                            <ErrorPopUp
                                value={contaminant}
                                setState={setContaminant}
                                placeholder={"Contaminant"}
                                width="w-full" />
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
                                width={"w-full"}
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
                            />
                        </div>
                        <div>
                            <InputHeader>Security Issue</InputHeader>
                            <ErrorPopUp
                                value={securityIssue}
                                setState={setSecurityIssue}
                                placeholder={"Security Issue"}
                                width="w-full" />
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
                                width={"w-full"}
                                options={["Ambulance", "Helicopter", "Other (Please Specify Below)"]}
                            />
                        </div>
                        <div>
                            <InputHeader>Destination</InputHeader>
                            <SRQDropdown
                                value={transportationDestination}
                                setValue={setTransportationDestination}
                                width={"w-full"}
                                placeholder={"Select Destination"}
                                options={["Brigham & Women's Hospital Main Campus",
                                    "Chestnut Hill",
                                    "Faulkner Hospital",
                                    "Patriot Place"]} />
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
                                width={"w-full"}
                                options={["ASL Interpreter", "Live Captioning", "Braille Materials", "Tactile Interpreter", "Other (Please Specify Below)"]}
                            />
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
                                width={"w-full"}
                                placeholder={"Select a Device"}
                                options={["EKG", "X-Ray", "Ventilator", "CT Scan", "Defibrillator"]}
                            />
                        </div>
                        <div>
                            <InputHeader>Operator Required</InputHeader>
                            <SRQDropdown
                                value={operatorRequired}
                                setValue={setOperatorRequired}
                                placeholder={"Do You Require an Operator?"}
                                width={"w-full"}
                                options={["Yes", "No"]} />
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
                                width={"w-full"}
                                options={["Elevator", "Plumbing", "HVAC/R", "Power", "Electrical", "Other (Please Specify Below)"]}
                            />
                        </div>
                        <div>
                            <InputHeader>Equipment Type</InputHeader>
                            <ErrorPopUp
                                value={equipmentType}
                                setState={setEquipmentType}
                                placeholder={"Specify any Equipment Needed"}
                                width={"w-full"}
                            />
                        </div>
                    </>
                    : null}
            </div>

            {/* Additional Comments */}
            <div className="mr-5 mt-5 ml-5">
                <InputHeader>Additional Comments</InputHeader>
                <TextArea
                    placeholder="Additional Comments..."
                    value={comments}
                    setState={setComments}
                />
            </div>
        </div>
    );
}
