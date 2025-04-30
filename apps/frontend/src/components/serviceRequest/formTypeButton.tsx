import React from 'react';

type formRequestButton = {
    label: string;
    onClick: () => void;
};

function RequestButton({ label, onClick }: formRequestButton) {
    return (
        <>
        <button
            className={`text-white bg-[#003a96] rounded-lg py-2 px-4 w-full text-left mb-2 hover:bg-blue-950 focus:bg-blue-950`}
            onClick={onClick}>

            <label> {label} </label>
        </button>
        </>

    );
};

export default RequestButton;