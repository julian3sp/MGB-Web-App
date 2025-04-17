import React from 'react';
import AmbulanceIcon from "@/components/SVGIcons/AmbulanceIcon.tsx";

type formRequestButton = {
    label: string;
    onClick: () => void;
    type: string;
};

function RequestButton({ label, onClick, type }: formRequestButton) {
    return (
        <>
            <button
                className="group flex items-center text-white bg-[#0D448C] rounded-lg py-2 px-4 w-full text-left mb-2 hover:bg-gray-200 focus:bg-gray-200"
                onClick={onClick}
            >
                <AmbulanceIcon size={25} className="mr-2" />
                <span className="transition-colors group-hover:text-[#0D448C]">
    {label}
  </span>
            </button>
        </>

    );
};

export default RequestButton;