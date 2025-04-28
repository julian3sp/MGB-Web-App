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

    // Step 3 fields (varies by type, 1-2 fields = 12.5-25% total)
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

        // Step 3: Type-specific fields (12.5% each)
        switch (props.type) {
            case "Language":
                if (props.sourceLanguage) progress += 12.5;
                if (props.targetLanguage) progress += 12.5;
                break;
            case "Sanitation":
                if (props.cleaningType) progress += 25; // Only mandatory field
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
                if (props.accommodationType) progress += 25; // Only mandatory field
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

        const roundedProgress = Math.round(Math.min(progress, 100));
        setTotalPercent(roundedProgress);
        setIsComplete(roundedProgress === 100);
    }, [props]);

    // Calculate visual completion for each step
    const step1Complete = props.name && props.employeeID;
    const step1Progress = (props.name ? 12.5 : 0) + (props.employeeID ? 12.5 : 0);

    const step2Complete = step1Complete && props.location && props.department && props.priority && props.status;
    const step2Progress = step1Complete
        ? (props.location ? 12.5 : 0) +
        (props.department ? 12.5 : 0) +
        (props.priority ? 12.5 : 0) +
        (props.status ? 12.5 : 0)
        : 0;

    const step3Complete = step2Complete && (
        (props.type === "Language" && props.sourceLanguage && props.targetLanguage) ||
        (props.type === "Sanitation" && props.cleaningType) ||
        (props.type === "Security" && props.accessZones && props.securityIssue) ||
        (props.type === "Transportation" && props.transportationType && props.transportationDestination) ||
        (props.type === "AudioVisual" && props.accommodationType) ||
        (props.type === "MedicalDevice" && props.device && props.operatorRequired) ||
        (props.type === "Facilities" && props.maintenanceType && props.equipmentType)
    );
    const step3Progress = step2Complete ? (
        (props.type === "Language" ?
            (props.sourceLanguage ? 12.5 : 0) + (props.targetLanguage ? 12.5 : 0) :
            props.type === "Sanitation" ?
                (props.cleaningType ? 25 : 0) :
                props.type === "Security" ?
                    (props.accessZones ? 12.5 : 0) + (props.securityIssue ? 12.5 : 0) :
                    props.type === "Transportation" ?
                        (props.transportationType ? 12.5 : 0) + (props.transportationDestination ? 12.5 : 0) :
                        props.type === "AudioVisual" ?
                            (props.accommodationType ? 25 : 0) :
                            props.type === "MedicalDevice" ?
                                (props.device ? 12.5 : 0) + (props.operatorRequired ? 12.5 : 0) :
                                props.type === "Facilities" ?
                                    (props.maintenanceType ? 12.5 : 0) + (props.equipmentType ? 12.5 : 0) :
                                    0)
    ) : 0;

    // Animation variants
    const percentVariants = {
        initial: { opacity: 0, y: -10 },
        animate: { opacity: 1, y: 0, transition: { duration: 0.5 } }
    };

    const progressVariants = {
        initial: { width: 0 },
        animate: { 
            width: `${(step1Progress / 25) * 25}%`,
            transition: { duration: 0.5, ease: "easeOut" }
        }
    };

    const step2ProgressVariants = {
        initial: { width: 0 },
        animate: { 
            width: `${(step2Progress / 50) * 50}%`,
            transition: { duration: 0.5, ease: "easeOut" }
        }
    };

    const step3ProgressVariants = {
        initial: { width: 0 },
        animate: { 
            width: `${(step3Progress / 25) * 25}%`,
            transition: { duration: 0.5, ease: "easeOut" }
        }
    };

    // Step indicator animations
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

    return (
        <div className="w-full px-6 py-3">
            <div className="flex justify-between mb-1">
                <motion.p 
                    className="text-sm font-medium text-gray-700"
                    key={totalPercent}
                    variants={percentVariants}
                    initial="initial"
                    animate="animate"
                >
                    {totalPercent}% Complete
                </motion.p>
            </div>

            {/* Progress Bar */}
            <div className="relative h-2 w-full mt-5 bg-gray-200 rounded-full">
                {/* Background line */}
                <div className="absolute top-0 left-0 h-2 w-full bg-gray-200 rounded-full"></div>

                {/* Step 1 Progress (25% width) */}
                <motion.div
                    className="absolute top-0 left-0 h-2 bg-[#003a96]"
                    variants={progressVariants}
                    initial="initial"
                    animate="animate"
                    style={{
                        borderTopLeftRadius: '4px',
                        borderBottomLeftRadius: step1Complete ? '0' : '4px'
                    }}
                ></motion.div>

                {step1Complete && (
                    <motion.div
                        className="absolute top-0 h-2 bg-[#003a96]"
                        variants={step2ProgressVariants}
                        initial="initial"
                        animate="animate"
                        style={{
                            left: '25%',
                            borderBottomLeftRadius: step2Complete ? '0' : '4px'
                        }}
                    ></motion.div>
                )}

                {step2Complete && (
                    <motion.div
                        className="absolute top-0 h-2 bg-[#003a96]"
                        variants={step3ProgressVariants}
                        initial="initial"
                        animate="animate"
                        style={{
                            left: '75%',
                            borderTopRightRadius: isComplete ? '4px' : '0',
                            borderBottomRightRadius: isComplete ? '4px' : '0'
                        }}
                    ></motion.div>
                )}

                {/* Step Indicators */}
                <div className="absolute top-0 left-0 w-[98%] h-2">
                    {/* Step 1 at 0% */}
                    <motion.div
                        className="absolute w-6 h-6 rounded-full flex items-center justify-center -mt-2 -ml-3"
                        style={{ left: '0%' }}
                        variants={stepIndicatorVariants}
                        initial="inactive"
                        animate={step1Progress > 0 ? (step1Complete ? "complete" : "active") : "inactive"}
                    >
                        1
                    </motion.div>

                    {/* Step 2 at 25% */}
                    <motion.div
                        className="absolute w-6 h-6 rounded-full flex items-center justify-center -mt-2 -ml-3"
                        style={{ left: '25%' }}
                        variants={stepIndicatorVariants}
                        initial="inactive"
                        animate={step2Progress > 0 ? (step2Complete ? "complete" : "active") : "inactive"}
                    >
                        2
                    </motion.div>

                    {/* Step 3 at 75% */}
                    <motion.div
                        className="absolute w-6 h-6 rounded-full flex items-center justify-center -mt-2 -ml-3"
                        style={{ left: '75%' }}
                        variants={stepIndicatorVariants}
                        initial="inactive"
                        animate={step3Progress > 0 ? (step3Complete ? "complete" : "active") : "inactive"}
                    >
                        3
                    </motion.div>

                    {/* Complete (✓) at 100% */}
                    <motion.div
                        className="absolute w-6 h-6 rounded-full flex items-center justify-center -mt-2 -mr-3"
                        style={{ left: '100%', transform: 'translateX(-50%)' }}
                        variants={stepIndicatorVariants}
                        initial="inactive"
                        animate={isComplete ? "complete" : "inactive"}
                        whileHover={isComplete ? { scale: 1.1 } : {}}
                    >
                        ✓
                    </motion.div>
                </div>
            </div>

            {isComplete && totalPercent > prevPercent && (
                <motion.div 
                    className="absolute top-0 left-0 w-full h-full pointer-events-none"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: [0, 1, 0] }}
                    transition={{ duration: 1.5 }}
                >
                    <div className="flex justify-center items-center h-full">
                        <motion.div
                            className="text-4xl"
                            initial={{ scale: 0, rotate: 0 }}
                            animate={{ 
                                scale: [0, 1.5, 1], 
                                rotate: [0, 15, -15, 0],
                                y: [0, -20, 0]
                            }}
                            transition={{ duration: 1 }}
                        >
                            🎉
                        </motion.div>
                    </div>
                </motion.div>
            )}
        </div>
    );
}