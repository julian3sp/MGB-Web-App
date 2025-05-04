import { useEffect, useState } from 'react';
import { motion } from "framer-motion";

type ProgressBarProps = {
    currentStep: number;
    // Step 1 fields (2 fields = 25% total)
    name: string;
    employeeID: string;

    // Step 2 fields (4 fields = 50% total)
    location: string;
    department: string;
    priority: string;
    status: string;
    type: string;
    sourceLanguage?: string;
    targetLanguage?: string;
    cleaningType?: string;
    accessZones?: string;
    securityIssue?: string;
    transportationType?: string;
    transportationDestination?: string;
    accommodationType?: string;
    device?: string;
    operatorRequired?: string;
    maintenanceType?: string;
    equipmentType?: string;

    // Step 3 fields (varies by type, 1-2 fields = 12.5-25% total)

};

export function ProgressBar(props: ProgressBarProps) {
    const [totalPercent, setTotalPercent] = useState(0);
    const [isComplete, setIsComplete] = useState(false);
    const [prevPercent, setPrevPercent] = useState(0);

    useEffect(() => {
        // Store previous percent for animation
        setPrevPercent(totalPercent);

        let progress = 0;

        // Step 1: 2 fields (12.5% each, total 25%)
        if (props.name) progress += 12.5;
        if (props.employeeID) progress += 12.5;

        // Step 2: 4 fields (12.5% each, total 50%)
        if (props.location) progress += 12.5;
        if (props.department) progress += 12.5;
        if (props.priority) progress += 12.5;
        if (props.status) progress += 12.5;

        switch (props.type) {
            case "Language":
                if (props.sourceLanguage) progress += 12.5;
                if (props.targetLanguage) progress += 12.5;
                break;
            case "Sanitation":
                if (props.cleaningType) progress += 25;
                break;
            case "Security":
                if (props.accessZones) progress += 12.5;
                if (props.securityIssue) progress += 12.5;
                break;
            case "Transportation":
                if (props.transportationType) progress += 12.5;
                if (props.transportationDestination) progress += 12.5;
                break;
            case "AudioVisual":
                if (props.accommodationType) progress += 25;
                break;
            case "MedicalDevice":
                if (props.device) progress += 12.5;
                if (props.operatorRequired) progress += 12.5;
                break;
            case "Facilities":
                if (props.maintenanceType) progress += 12.5;
                if (props.equipmentType) progress += 12.5;
                break;
        }

        // Step 3: Type-specific fields (12.5% each)


        const roundedProgress = Math.round(Math.min(progress, 100));
        setTotalPercent(roundedProgress);
        setIsComplete(roundedProgress === 100);
    }, [props]);

    const percentVariants = {
        initial: { opacity: 0, y: -10 },
        animate: { opacity: 1, y: 0, transition: { duration: 0.5 } }
    };

    const progressVariants = {
        initial: { height: 0 },
        animate: {
            height: `${totalPercent}%`,
            transition: { duration: 0.5, ease: "easeOut" }
        }
    };

    const stepIndicatorVariants = {
        inactive: {
            scale: 1,
            backgroundColor: "#FFFFFF",
            color: "#6B7280",
            border: "2px solid #D1D5DB"
        },
        active: {
            scale: [1, 1.2, 1],
            backgroundColor: "#003a96",
            color: "#FFFFFF",
            border: "2px solid #003a96",
            transition: { duration: 0.5 }
        },
        complete: {
            scale: [1, 1.2, 1],
            backgroundColor: "#003a96",
            color: "#FFFFFF",
            border: "2px solid #003a96",
            transition: { duration: 0.3 }
        }
    };

    const fieldVariants = {
        incomplete: { color: "#6B7280" },
        complete: { color: "#003a96", transition: { duration: 0.3 } }
    };

    const getStep3Fields = () => {
        switch (props.type) {
            case "Language":
                return [
                    { name: "Source Language", value: props.sourceLanguage },
                    { name: "Target Language", value: props.targetLanguage }
                ];
            case "Sanitation":
                return [{ name: "Cleaning Type", value: props.cleaningType }];
            case "Security":
                return [
                    { name: "Access Zones", value: props.accessZones },
                    { name: "Security Issue", value: props.securityIssue }
                ];
            case "Transportation":
                return [
                    { name: "Transportation Type", value: props.transportationType },
                    { name: "Destination", value: props.transportationDestination }
                ];
            case "AudioVisual":
                return [{ name: "Accommodation Type", value: props.accommodationType }];
            case "MedicalDevice":
                return [
                    { name: "Device", value: props.device },
                    { name: "Operator Required", value: props.operatorRequired }
                ];
            case "Facilities":
                return [
                    { name: "Maintenance Type", value: props.maintenanceType },
                    { name: "Equipment Type", value: props.equipmentType }
                ];
            default:
                return [];
        }
    };

    return (
        <div className="flex items-start gap-10 h-104 w-80 border-1 rounded-lg shadow-lg bg-white p-5 pl-2  ">
            {/* Vertical Progress Bar */}
            <div className='flex flex-col items-center translate-x-5'>
                <div className="relative h-90 mt-2 w-10 bg-gray-200 rounded-full">
                    <motion.div
                        className="absolute  w-full bg-[#003a96] rounded-full"
                        variants={progressVariants}
                        initial="initial"
                        animate="animate"
                    ></motion.div>
                </div>
            </div>

            {/* Fields List */}
            <div className="flex-1 space-y-8 transform translate-x-1 transition-transform duration-300">
            {/* Step 1 Fields */}
                <div className="space-y-2">
                    <h3 className="font-semibold text-[13pt]">Step 1: Basic Information</h3>
                    <ul className="space-y-1">
                        <motion.li
                            variants={fieldVariants}
                            animate={props.name ? "complete" : "incomplete"}
                        >
                            {props.name ? "✓" : "•"} Name
                        </motion.li>
                        <motion.li
                            variants={fieldVariants}
                            animate={props.employeeID ? "complete" : "incomplete"}
                        >
                            {props.employeeID ? "✓" : "•"} Employee ID
                        </motion.li>
                    </ul>
                </div>

                {/* Step 2 Fields */}
                {(props.name && props.employeeID) && (
                    <div className="space-y-2">
                        <h3 className="font-semibold text-[13pt]">Step 2: Request Details</h3>
                        <ul className="space-y-1">
                            <motion.li
                                variants={fieldVariants}
                                animate={props.location ? "complete" : "incomplete"}
                            >
                                {props.location ? "✓" : "•"} Location
                            </motion.li>
                            <motion.li
                                variants={fieldVariants}
                                animate={props.department ? "complete" : "incomplete"}
                            >
                                {props.department ? "✓" : "•"} Department
                            </motion.li>
                            <motion.li
                                variants={fieldVariants}
                                animate={props.priority ? "complete" : "incomplete"}
                            >
                                {props.priority ? "✓" : "•"} Priority
                            </motion.li>
                            <motion.li
                                variants={fieldVariants}
                                animate={props.status ? "complete" : "incomplete"}
                            >
                                {props.status ? "✓" : "•"} Status
                            </motion.li>
                            {getStep3Fields().map((field, index) => (
                                <motion.li
                                    key={index}
                                    variants={fieldVariants}
                                    animate={field.value ? "complete" : "incomplete"}
                                >
                                    {field.value ? "✓" : "•"} {field.name}
                                </motion.li>
                            ))}
                        </ul>
                    </div>
                )}

                {/* Step 3 Fields */}
                {(props.location && props.department && props.priority && props.status) && ((props.sourceLanguage && props.targetLanguage) || (props.cleaningType) || (props.accessZones && props.securityIssue) ||  (props.transportationType && props.transportationDestination) ||  (props.accommodationType) ||  (props.device && props.operatorRequired) ||  (props.maintenanceType && props.equipmentType)) && (

                    <div className="space-y-2">
                        <h3 className="font-semibold text-[13pt]">Step 3: Additional Information (Optional)</h3>
                    </div>
                )}
            </div>
        </div>
    );
}   