import { InputHeader } from '../../signIn/InputHeader';
import { ErrorPopUp } from '../inputFields/ErrorPopUp';
import { SRQDropdown } from '../inputFields/SRQDropdown';
import { Combobox } from '../inputFields/Combobox';
import TextArea from '../../TextArea';
import { languages } from '../data/languages';
import { trpc } from '@/lib/trpc.ts';

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
    errors,
    clearError,
}: FinalReviewProps) {
    const { data: departmentsRaw } = trpc.getDirectories.useQuery();
    //CSV handles location names differently
    const locationMap: Record<string, string[]> = {
        'Chestnut Hill': ['MGB (Chestnut Hill)'],
        'Patriot Place': ['20 Patriot Place', '22 Patriot Place'],
        'Faulkner Hospital': ['Faulkner'],
        "Brigham & Women's Hospital Main Campus": ['Main Campus'], //None in CSV yet, assuming this would be format used
    };

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
                        setValue={(loc) => {
                            setLocation(loc);
                            setDepartment(''); // Clear previous department
                            clearError("department");
                        }}
                        placeholder="Select Location"
                        width="w-full"
                        error={errors.location}
                        options={[
                            "Brigham & Women's Hospital Main Campus",
                            'Chestnut Hill',
                            'Faulkner Hospital',
                            'Patriot Place',
                        ]}
                        clearError={() => clearError('location')}
                    />
                </div>

                <div>
                    <InputHeader>Department</InputHeader>
                    <SRQDropdown
                        value={department}
                        setValue={setDepartment}
                        width="w-full"
                        placeholder={location ? 'Select Department' : 'Select a location first'}
                        error={errors.department}
                        options={
                            location
                                ? departmentsRaw
                                      ?.filter((dept) =>
                                          locationMap[location]?.includes(dept.location)
                                      )
                                      .map((dept) => dept.name) || []
                                : []
                        }
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
                        options={['Low', 'Medium', 'High', 'Emergency']}
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
                        error={errors.status}
                        options={['Unassigned', 'Assigned', 'Working', 'Done']}
                        clearError={() => clearError('status')}
                    />
                </div>

                {type === 'Language' ? (
                    <>
                        <div>
                            <InputHeader>Source Language (Patient)</InputHeader>
                            <Combobox
                                options={languages}
                                value={sourceLanguage}
                                setValue={setSourceLanguage}
                                placeholder={'Source Language'}
                                error={errors.sourceLanguage}
                                clearError={() => clearError('sourceLanguage')}
                            />
                        </div>
                        <div>
                            <InputHeader>Target Language (Doctor/Staff)</InputHeader>
                            <Combobox
                                options={languages}
                                value={targetLanguage}
                                setValue={setTargetLanguage}
                                error={errors.targetLanguage}
                                clearError={() => clearError('targetLanguage')}
                                placeholder={'Select a Language'}
                            />
                        </div>
                    </>
                ) : null}

                {type === 'Sanitation' ? (
                    <>
                        <div>
                            <InputHeader>Cleaning Needed</InputHeader>
                            <SRQDropdown
                                value={cleaningType}
                                setValue={setCleaningType}
                                placeholder={'Select Cleaning Needed'}
                                width={'w-full'}
                                error={errors.cleaningType}
                                options={[
                                    'Daily/General Cleaning',
                                    'Post-Patient Cleaning',
                                    'Spill Response',
                                    'Restroom Sanitization',
                                    'PPE Restock',
                                ]}
                                clearError={() => clearError('cleaningType')}
                            />
                        </div>
                        <div>
                            <InputHeader>Contaminant (Optional)</InputHeader>
                            <ErrorPopUp
                                value={contaminant}
                                setState={setContaminant}
                                placeholder={'Contaminant'}
                                width="w-full"
                            />
                        </div>
                    </>
                ) : null}

                {type === 'Security' ? (
                    <>
                        <div>
                            <InputHeader>Security Needed</InputHeader>
                            <SRQDropdown
                                value={accessZones}
                                setValue={setAccessZones}
                                placeholder={'Select Access Zones Needed'}
                                width={'w-full'}
                                error={errors.accessZones}
                                options={[
                                    '',
                                    'ICU',
                                    'Operating Room',
                                    'Pharmacy',
                                    'Medical Records',
                                    'Pediatric Ward',
                                    'Emergency Department',
                                    'Laboratory',
                                    'Server Room (IT)',
                                    'Supply Closet',
                                    'Radiology',
                                    'Morgue',
                                ]}
                                clearError={() => clearError('accessZones')}
                            />
                        </div>
                        <div>
                            <InputHeader>Security Issue</InputHeader>
                            <ErrorPopUp
                                value={securityIssue}
                                setState={setSecurityIssue}
                                placeholder={'Security Issue'}
                                width="w-full"
                                error={errors.securityIssue}
                                clearError={() => clearError('securityIssue')}
                            />
                        </div>
                    </>
                ) : null}

                {type === 'Transportation' ? (
                    <>
                        <div>
                            <InputHeader>Transportation Type</InputHeader>
                            <SRQDropdown
                                value={transportationType}
                                setValue={setTransportationType}
                                placeholder={'Select Transportation Type'}
                                width={'w-full'}
                                error={errors.transportationType}
                                options={[
                                    'Ambulance',
                                    'Helicopter',
                                    'Other (Please Specify Below)',
                                ]}
                                clearError={() => clearError('transportationType')}
                            />
                        </div>
                        <div>
                            <InputHeader>Destination</InputHeader>
                            <SRQDropdown
                                value={transportationDestination}
                                setValue={setTransportationDestination}
                                width={'w-full'}
                                placeholder={'Select Destination'}
                                error={errors.transportationDestination}
                                options={[
                                    "Brigham & Women's Hospital Main Campus",
                                    'Chestnut Hill',
                                    'Faulkner Hospital',
                                    'Patriot Place',
                                ]}
                                clearError={() => clearError('transportationDestination')}
                            />
                        </div>
                    </>
                ) : null}

                {type === 'AudioVisual' ? (
                    <>
                        <div>
                            <InputHeader>Accommodation Type</InputHeader>
                            <SRQDropdown
                                value={accommodationType}
                                setValue={setAccommodationType}
                                placeholder={'Select Accommodation Type'}
                                width={'w-full'}
                                error={errors.accommodationType}
                                options={[
                                    'ASL Interpreter',
                                    'Live Captioning',
                                    'Braille Materials',
                                    'Tactile Interpreter',
                                    'Other (Please Specify Below)',
                                ]}
                                clearError={() => clearError('accommodationType')}
                            />
                        </div>
                        <div>
                            <InputHeader>Accommodation Details (Optional)</InputHeader>
                            <ErrorPopUp
                                value={accommodationDetails}
                                setState={setAccommodationDetails}
                                placeholder={'Enter Accommodation Details'}
                                width="w-full"
                            />
                        </div>
                    </>
                ) : null}
                {type === 'MedicalDevice' ? (
                    <>
                        <div>
                            <InputHeader>Medical Device</InputHeader>
                            <SRQDropdown
                                value={device}
                                setValue={setDevice}
                                width={'w-full'}
                                placeholder={'Select a Device'}
                                error={errors.device}
                                options={[
                                    'EKG',
                                    'X-Ray',
                                    'Ventilator',
                                    'CT Scan',
                                    'Defibrillator',
                                ]}
                                clearError={() => clearError('device')}
                            />
                        </div>
                        <div>
                            <InputHeader>Operator Required</InputHeader>
                            <SRQDropdown
                                value={operatorRequired}
                                setValue={setOperatorRequired}
                                placeholder={'Do You Require an Operator?'}
                                error={errors.operatorRequired}
                                width={'w-full'}
                                options={['Yes', 'No']}
                                clearError={() => clearError('operatorRequired')}
                            />
                        </div>
                    </>
                ) : null}
                {type === 'Facilities' ? (
                    <>
                        <div>
                            <InputHeader>Maintenance Type</InputHeader>
                            <SRQDropdown
                                value={maintenanceType}
                                setValue={setMaintenanceType}
                                placeholder={'Select Maintenance Type'}
                                width={'w-full'}
                                error={errors.maintenanceType}
                                options={[
                                    'Elevator',
                                    'Plumbing',
                                    'HVAC/R',
                                    'Power',
                                    'Electrical',
                                    'Other (Please Specify Below)',
                                ]}
                                clearError={() => clearError('maintenanceType')}
                            />
                        </div>
                        <div>
                            <InputHeader>Equipment Type</InputHeader>
                            <ErrorPopUp
                                value={equipmentType}
                                setState={setEquipmentType}
                                placeholder={'Specify any Equipment Needed'}
                                width={'w-full'}
                                error={errors.equipmentType}
                                clearError={() => clearError('equipmentType')}
                            />
                        </div>
                    </>
                ) : null}
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
