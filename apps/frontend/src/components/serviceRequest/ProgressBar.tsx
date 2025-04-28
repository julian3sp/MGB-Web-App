import { useEffect, useState } from 'react';

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

    useEffect(() => {
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
                    // ... other type cases
                    0)
    ) : 0;

    return (
        <div className="w-full px-6 py-3">
            <div className="flex justify-between mb-1">
                <p className="text-sm font-medium text-gray-700">{totalPercent}% Complete</p>
            </div>

            {/* Progress Bar */}
            <div className="relative h-2 w-full mt-5 bg-gray-200 rounded-full">
                {/* Background line */}
                <div className="absolute top-0 left-0 h-2 w-full bg-gray-200 rounded-full"></div>

                {/* Step 1 Progress (25% width) */}
                <div
                    className="absolute top-0 left-0 h-2 bg-[#003a96]"
                    style={{
                        width: `${(step1Progress / 25) * 25}%`,
                        borderTopLeftRadius: '4px',
                        borderBottomLeftRadius: step1Complete ? '0' : '4px'
                    }}
                ></div>

                {/* Step 2 Progress (50% width) - only visible if step 1 complete */}
                {step1Complete && (
                    <div
                        className="absolute top-0 h-2 bg-[#003a96]"
                        style={{
                            width: `${(step2Progress / 50) * 50}%`,
                            left: '25%',
                            borderBottomLeftRadius: step2Complete ? '0' : '4px'
                        }}
                    ></div>
                )}

                {/* Step 3 Progress (25% width) - only visible if step 2 complete */}
                {step2Complete && (
                    <div
                        className="absolute top-0 h-2 bg-[#003a96]"
                        style={{
                            width: `${(step3Progress / 25) * 25}%`,
                            left: '75%',
                            borderTopRightRadius: isComplete ? '4px' : '0',
                            borderBottomRightRadius: isComplete ? '4px' : '0'
                        }}
                    ></div>
                )}

                {/* Step Indicators */}
                <div className="absolute top-0 left-0 w-full h-2">
                    {/* Step 1 at 0% */}
                    <div
                        className={`absolute w-6 h-6 rounded-full flex items-center justify-center -mt-2 -ml-3
                                    ${step1Complete ? 'bg-[#003a96] text-white' :
                                step1Progress > 0 ? 'bg-[#003a96] text-white' :
                                    'bg-white border-2 border-gray-300 text-gray-500'}`}
                        style={{ left: '0%' }}
                    >
                        1
                    </div>

                    {/* Step 2 at 25% */}
                    <div
                        className={`absolute w-6 h-6 rounded-full flex items-center justify-center -mt-2 -ml-3
                                    ${step2Complete ? 'bg-[#003a96] text-white' :
                                step2Progress > 0 ? 'bg-[#003a96] text-white' :
                                    'bg-white border-2 border-gray-300 text-gray-500'}`}
                        style={{ left: '25%' }}
                    >
                        2
                    </div>

                    {/* Step 3 at 75% */}
                    <div
                        className={`absolute w-6 h-6 rounded-full flex items-center justify-center -mt-2 -ml-3
                                    ${step3Complete ? 'bg-[#003a96] text-white' :
                                step3Progress > 0 ? 'bg-[#003a96] text-white' :
                                    'bg-white border-2 border-gray-300 text-gray-500'}`}
                        style={{ left: '75%' }}
                    >
                        3
                    </div>

                    {/* Complete (✓) at 100% */}
                    <div
                        className={`absolute w-6 h-6 rounded-full flex items-center justify-center -mt-2 -mr-3
                                    ${isComplete ? 'bg-[#003a96] text-white' :
                                'bg-white border-2 border-gray-300 text-gray-500'}`}
                        style={{ left: '100%', transform: 'translateX(-50%)' }}
                    >
                        ✓
                    </div>

                </div>
            </div>
        </div>
    );
}