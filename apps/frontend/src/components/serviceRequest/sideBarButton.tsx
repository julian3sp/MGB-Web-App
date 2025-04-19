import React from 'react';
import AmbulanceIcon from "@/components/SVGIcons/AmbulanceIcon.tsx";
import AudioIcon from "@/components/SVGIcons/AudioIcon.tsx";
import CleaningIcon from "@/components/SVGIcons/CleaningIcon.tsx";
import LanguageIcon from "@/components/SVGIcons/LanguageIcon.tsx";
import LockIcon from "@/components/SVGIcons/LockIcon.tsx";

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

        bg-gradient-to-br from-[#003a96] to-[#0053c7]
        text-[#e4eaf3] shadow-md

        hover:bg-gradient-to-br hover:from-[#0042ad] hover:to-[#2f7be3]
        hover:shadow-xl hover:translate-y-[-1px]

        focus:outline-none focus:ring-4 focus:ring-[#2970d8]/40
        focus:bg-gradient-to-br focus:from-[#002d78] focus:to-[#003a96]
        focus:shadow-inner focus:shadow-[#0b1a3a]/70
      `}
        >
            <div className="absolute top-0 left-0 w-full h-full bg-white opacity-0 group-hover:opacity-5 pointer-events-none mix-blend-overlay rounded-xl transition-opacity duration-300" />
            {type === "AudioVisual" && (
                <AudioIcon
                    size={40}
                    stroke="currentColor"
                    fill="currentColor"
                    className="mr-3 text-[#e4eaf3] group-hover:text-white group-focus:text-white"
                />
            )}
            {type === "Transportation" && (
                <AmbulanceIcon
                    size={40}
                    stroke="currentColor"
                    fill="currentColor"
                    className="mr-3 text-[#e4eaf3] group-hover:text-white group-focus:text-white"
                />
            )}
            {type === "Sanitation" && (
                <CleaningIcon
                    size={35}
                    stroke="currentColor"
                    fill="currentColor"
                    className="mr-3 text-[#e4eaf3] group-hover:text-white group-focus:text-white"
                />
            )}
            {type === "Language" && (
                <LanguageIcon
                    size={45}
                    stroke="currentColor"
                    fill="currentColor"
                    className="mr-3 text-[#e4eaf3] group-hover:text-white group-focus:text-white"
                />
            )}
            {type === "Security" && (
                <LockIcon
                    size={40}
                    stroke="currentColor"
                    fill="currentColor"
                    className="mr-3 text-[#e4eaf3] group-hover:text-white group-focus:text-white"
                />
            )}
            <span className="text-[#e4eaf3] group-hover:text-white group-focus:text-white">
        {label}
      </span>
        </button>
    );
}

export default RequestButton;