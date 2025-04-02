import React from 'react';

type formRequestButton = {
    label: string;
    onClick: () => void;
};

function RequestButton({ label, onClick }: formRequestButton) {
    return (
        <>
        <button
            className={`text-white bg-[#0D448C] rounded-lg py-2 px-4 w-full text-left mb-2 hover:bg-gray-200 focus:bg-gray-200`}
            onClick={onClick}>

            <label> {label} </label>
        </button>
        </>

    );
};

export default RequestButton;