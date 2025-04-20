import {useState} from "react";

export default function SubmitFormEdit({
    label = "Submit",
    submitCondition,
    onSubmit,
    onDeny,
    errorMessage = "Error: Cannot submit form",
    successMessage = "Successfully submitted",
}: {
    label?: string;
    submitCondition: boolean;
    onSubmit: () => void;
    onDeny?: () => void;
    errorMessage?: string;
    successMessage?: string;
}) {
    const [showError, setShowError] = useState(false);
    const [showSuccess, setShowSuccess] = useState(false);
    return (
        <div className="relative inline-block">
            {showError && (
                <div className="absolute bottom-full left-4 mb-2">
                    <div className="bg-red-100 text-red-800 font-medium px-3 py-2 rounded text-sm relative border border-red-300 shadow-md">
                        {errorMessage}

                        {/* Triangle container div - for positioning */}
                        <div className="absolute top-full left-0 w-full h-0 flex justify-center items-start overflow-visible">
                            {/* border - slightly bigger triangle*/}
                            <div className="w-0 h-0 border-x-[10px] border-x-transparent border-t-[10px] border-t-red-300 absolute top-0 left-[20px] -translate-x-1/2 transform"></div>

                            {/* Inner triangle (background color) */}
                            <div className="w-0 h-0 border-x-[8px] border-x-transparent border-t-[8px] border-t-red-100 absolute top-0 left-[20px] -translate-x-1/2 transform"></div>
                        </div>
                    </div>
                </div>
                )}
            {showSuccess && (
                <div className="absolute bottom-full left-4 mb-2">
                    <div className="bg-green-100 text-green-800 font-medium px-3 py-2 rounded text-sm relative border border-green-300 shadow-md">
                        {successMessage}

                        {/* Triangle container div - for positioning */}
                        <div className="absolute top-full left-0 w-full h-0 flex justify-center items-start overflow-visible">
                            {/* border - slightly bigger triangle*/}
                            <div className="w-0 h-0 border-x-[10px] border-x-transparent border-t-[10px] border-t-green-300 absolute top-0 left-[20px] -translate-x-1/2 transform"></div>

                            {/* Inner triangle (background color) */}
                            <div className="w-0 h-0 border-x-[8px] border-x-transparent border-t-[8px] border-t-green-100 absolute top-0 left-[20px] -translate-x-1/2 transform"></div>
                        </div>
                    </div>
                </div>
            )}
            <button
                onClick={() => {
                    if (submitCondition) {
                        onSubmit();
                        setShowError(false);
                        setShowSuccess(true);

                        setTimeout(() => {
                            setShowSuccess(false);
                        }, 5000);
                    } else {
                        onDeny?.();
                        setShowSuccess(false);
                        setShowError(true);

                        setTimeout(() => {
                            setShowError(false);
                        }, 5000);
                    }
                }}
                className="px-4 py-2 border rounded text-white hover:bg-blue-950 bg-[#003A96] w-[auto]"
            >
                <p className="inline-flex ml-1">{label}</p>
            </button>
        </div>
    );
}
