import { useRef, useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { InputHeader } from '../../signIn/InputHeader';
import { ErrorPopUp } from '../inputFields/ErrorPopUp';
import { SRQDropdown } from '../inputFields/SRQDropdown';
import { Combobox } from '../inputFields/Combobox';
import { languages } from '../data/languages';
import TextArea from '../../TextArea';
import { trpc } from '@/lib/trpc.ts';
import FileUploadService from "../../ui/fileUploadService.tsx"

type FormStepsProps = {
    currentStep: number;
    type: string;
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
    errors: any;
    clearError: (field: string) => void;
    formValid: boolean;
};

export function FormSteps({
    currentStep,
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
    formValid,
}: FormStepsProps) {
    const scrollContainerRef = useRef<HTMLDivElement>(null);

    // Control scroll to the current step
    useEffect(() => {
        if (scrollContainerRef.current) {
            const children = scrollContainerRef.current.children;
            if (children[currentStep - 1]) {
                children[currentStep - 1].scrollIntoView({
                    behavior: 'smooth',
                    block: 'nearest',
                    inline: 'nearest',
                });
            }
        }
    }, [currentStep]);

    // Prevent scrolling when form is not valid
    const handleWheel = (e: WheelEvent) => {
        if (!formValid) {
            e.preventDefault();
        }
    };

    // Set up event listeners to prevent scrolling when form is invalid
    useEffect(() => {
        const scrollContainer = scrollContainerRef.current;
        if (scrollContainer) {
            scrollContainer.addEventListener('wheel', handleWheel, { passive: false });

            return () => {
                scrollContainer.removeEventListener('wheel', handleWheel);
            };
        }
    }, [formValid]);

    const { data: departmentsRaw } = trpc.getDirectories.useQuery();

    //CSV handles location names differently
    const locationMap: Record<string, string[]> = {
        'Chestnut Hill': ['MGB (Chestnut Hill)'],
        'Patriot Place': ['20 Patriot Place', '22 Patriot Place'],
        'Faulkner Hospital': ['Faulkner'],
        "Brigham & Women's Hospital Main Campus": ['Main Campus'], //None in CSV yet, assuming this would be format used
    };

    const [files, setFiles] = useState<File[]>([])
    return (
        <div className="flex flex-col border-1 p-3 rounded-lg shadow-lg">
            <div
                ref={scrollContainerRef}
                className={`snap-y snap-mandatory overflow-y-auto w-full scroll-smooth ${currentStep === 3 ? `h-116` : 'h-96'}`} // grow more for step 3 to allow file names to be visible
                style={{ scrollbarWidth: 'none', msOverflowStyle: 'none' }}
            >
                {/* Step 1 */}
                <div className="snap-start w-full h-full flex flex-col">
                    <motion.div
                        key="step1"
                        initial={{ y: 100, opacity: 0 }}
                        animate={{ y: 0, opacity: 1 }}
                        exit={{ y: -100, opacity: 0 }}
                        transition={{ duration: 0.5 }}
                        className="flex-grow"
                    >
                        <div className="grid grid-cols-2 gap-x-6 gap-y-4 px-6  mt-6">
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
                                    maxLength={9}
                                    placeholder="Employee ID"
                                    width="w-full"
                                    error={errors.employeeID}
                                    clearError={() => clearError('employeeID')}
                                />
                            </div>
                        </div>
                    </motion.div>
                </div>

                {/* Step 2 */}
                <div className="snap-start w-full h-full flex flex-col">
                    <motion.div
                        key="step2"
                        initial={{ y: 100, opacity: 0 }}
                        animate={{ y: 0, opacity: 1 }}
                        exit={{ y: -100, opacity: 0 }}
                        transition={{ duration: 0.5 }}
                        className="flex-grow"
                    >
                        <div className="grid grid-cols-2 gap-x-6 gap-y-4 px-6 mt-6">
                            <div>
                                <InputHeader>Location</InputHeader>
                                <SRQDropdown
                                    value={location}
                                    setValue={(loc) => {
                                        setLocation(loc);
                                        setDepartment(""); // Clear previous department
                                        clearError("department");
                                    }}
                                    placeholder={'Select Location'}
                                    width={'w-full'}
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
                                    width={'w-full'}
                                    placeholder={
                                        location ? 'Select Department' : 'Select a location first'
                                    }
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
                                    width={'w-full'}
                                    options={['Low', 'Medium', 'High', 'Emergency']}
                                    placeholder={'Select Priority'}
                                    error={errors.priority}
                                    clearError={() => clearError('priority')}
                                />
                            </div>

                            <div>
                                <InputHeader>Status</InputHeader>
                                <SRQDropdown
                                    value={status}
                                    setValue={setStatus}
                                    placeholder={'Select Status'}
                                    width={'w-full'}
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
                    </motion.div>
                </div>

                {/* Step 3 */}
                <div className="snap-start w-full flex flex-col overflow-y-auto h-screen">
                    <motion.div
                        key="step3"
                        initial={{ y: 100, opacity: 0 }}
                        animate={{ y: 0, opacity: 1 }}
                        exit={{ y: -100, opacity: 0 }}
                        transition={{ duration: 0.5 }}
                        className="flex-grow"
                    >

                        <div className="px-6 mt-4">
                            <InputHeader children={'Additional Comments:'} />
                            <TextArea
                                placeholder="Additional Comments..."
                                value={comments}
                                setState={setComments}
                            />
                        </div>
                        <div className="px-6 mt-4 h-auto">
                            <InputHeader children={'File Upload'} />
                            <FileUploadService files={files} onFilesChange={setFiles} />
                        </div>
                    </motion.div>
                </div>
            </div>

            {/* Navigation Buttons */}
            <div className="flex justify-center px-6 mt-4">
                <div className="flex space-x-2">
                    {Array.from({ length: 3 }).map((_, index) => (
                        <div
                            key={index}
                            className={`w-3 h-3 rounded-full ${currentStep === index + 1 ? 'bg-blue-500' : 'bg-gray-300'}`}
                        />
                    ))}
                </div>
            </div>
        </div>
    );
}
