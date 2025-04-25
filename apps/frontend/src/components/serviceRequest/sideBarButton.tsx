import React from 'react';
import AmbulanceIcon from "@/components/SVGIcons/AmbulanceIcon.tsx";
import AudioIcon from "@/components/SVGIcons/AudioIcon.tsx";
import CleaningIcon from "@/components/SVGIcons/CleaningIcon.tsx";
import LanguageIcon from "@/components/SVGIcons/LanguageIcon.tsx";
import LockIcon from "@/components/SVGIcons/LockIcon.tsx";
import MedicalIcon from "@/components/SVGIcons/MedicalIcon.tsx";
import ElevatorIcon from "@/components/SVGIcons/ElevatorIcon.tsx";

type formRequestButton = {
    label: string;
    onClick: () => void;
    type: string;
};

function RequestButton({ label, onClick, type }: formRequestButton) {
    return (
        <button
            onClick={onClick}
            className={`
        group relative flex items-center w-full text-left mb-3 py-2.5 px-5 rounded-xl
        font-poppins font-semibold transition-all duration-300 ease-in-out

        /* Gray base with subtle gradient */
        bg-gradient-to-br from-gray-200 to-gray-300
        text-[#003a96] shadow-md

        /* Subtle hover effect - slightly darker gray */
        hover:bg-gradient-to-br hover:from-gray-300 hover:to-gray-400
        hover:shadow-lg hover:translate-y-[-1px]

        /* Focus state - transforms to blue with inset shadow for indented look */
        focus:outline-none focus:ring-2 focus:ring-[#b1e3e4]/60
        focus:bg-gradient-to-br focus:from-[#003a96] focus:to-[#003a96]
        focus:text-[#e4eaf3] focus:shadow-inner focus:shadow-[#001e4d]/50
        active:shadow-inner active:shadow-[#001e4d]/50 active:translate-y-[1px]
      `}
        >
            {/* Overlay effect for hover state */}
            <div className="absolute inset-0
                            opacity-0 group-hover:opacity-10
                            bg-[#003a96] mix-blend-overlay rounded-xl transition-opacity duration-300" />

            {type === "AudioVisual" && (
                <AudioIcon
                    size={40}
                    stroke="currentColor"
                    fill="currentColor"
                    className="mr-[16px] ml-[1px] text-[#003a96] group-hover:text-[#002d78] group-focus:text-white"
                />
            )}
            {type === "Transportation" && (
                <AmbulanceIcon
                    size={40}
                    stroke="currentColor"
                    fill="currentColor"
                    className="mr-[16px] ml-[1px] text-[#003a96] group-hover:text-[#002d78] group-focus:text-white"
                />
            )}
            {type === "Sanitation" && (
                <CleaningIcon
                    size={40}
                    stroke="currentColor"
                    fill="currentColor"
                    className="mr-[15px] ml-[0px] text-[#003a96] group-hover:text-[#002d78] group-focus:text-white"
                />
            )}
            {type === "Language" && (
                <LanguageIcon
                    size={40}
                    stroke="currentColor"
                    fill="currentColor"
                    className="mr-[21px] ml-[2px] text-[#003a96] group-hover:text-[#002d78] group-focus:text-white"
                />
            )}
            {type === "Security" && (
                <LockIcon
                    size={37}
                    stroke="currentColor"
                    fill="currentColor"
                    className="mr-[12px] ml-[0px] text-[#003a96] group-hover:text-[#002d78] group-focus:text-white"
                />
            )}
            {type === "MedicalDevice" && (
                <MedicalIcon
                    size={40}
                    stroke="currentColor"
                    fill="currentColor"
                    className="mr-[15px] ml-[2px] text-[#003a96] group-hover:text-[#002d78] group-focus:text-white"
                />
            )}
            {type === "Facilities" && (
                <ElevatorIcon
                    size={38}
                    stroke="currentColor"
                    fill="currentColor"
                    className="mr-[11px] ml-[0px] text-[#003a96] group-hover:text-[#002d78] group-focus:text-white"
                />
            )}
            <span className="ml-[0px] text-[#003a96] group-hover:text-[#002d78] group-focus:text-white">
                {label}
            </span>
        </button>
    );
}

export default RequestButton;