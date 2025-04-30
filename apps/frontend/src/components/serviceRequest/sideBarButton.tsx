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
    isActive: boolean;
};

function RequestButton({ label, onClick, type, isActive }: formRequestButton) {
    return (
        <button
            onClick={onClick}
            className={`
    group relative flex items-center w-full text-left mb-3 py-3 px-5 rounded-xl
    font-poppins font-semibold ease-in-out
    text-[13pt] 

    ${isActive ? 'bg-accent text-[#003a96] border-2 ' :  'bg-[#003a96] hover:bg-blue-950 hover:text-white text-white shadow-lg'}

    
    
  `}
        >
            {/* Overlay effect */}
            <div className="absolute inset-0 opacity-0 group-hover:opacity-10 bg-[#003a96] mix-blend-overlay rounded-xl transition-opacity duration-300" />

            {/* Icon rendering */}
            {type === "AudioVisual" && (
                <AudioIcon size={30} stroke="currentColor" fill="currentColor" className="mr-[16px] ml-[1px] text-inherit" />
            )}
            {type === "Transportation" && (
                <AmbulanceIcon size={30} stroke="currentColor" fill="currentColor" className="mr-[16px] ml-[1px] text-inherit" />
            )}
            {type === "Sanitation" && (
                <CleaningIcon size={30} stroke="currentColor" fill="currentColor" className="mr-[15px] ml-[0px] text-inherit" />
            )}
            {type === "Language" && (
                <LanguageIcon size={30} stroke="currentColor" fill="currentColor" className="mr-[21px] ml-[2px] text-inherit" />
            )}
            {type === "Security" && (
                <LockIcon size={37} stroke="currentColor" fill="currentColor" className="mr-[12px] ml-[0px] text-inherit" />
            )}
            {type === "MedicalDevice" && (
                <MedicalIcon size={30} stroke="currentColor" fill="currentColor" className="mr-[15px] ml-[2px] text-inherit" />
            )}
            {type === "Facilities" && (
                <ElevatorIcon size={38} stroke="currentColor" fill="currentColor" className="mr-[11px] ml-[0px] text-inherit" />
            )}

            {/* Label */}
            <span className="ml-[0px] text-inherit">{label}</span>
        </button>
    );
}


export default RequestButton;