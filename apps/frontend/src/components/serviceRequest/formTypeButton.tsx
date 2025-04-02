import React from 'react';

type formRequestButton = {
    label: string;
    onClick: () => void;
};

function RequestButton({ label, onClick }: formRequestButton) {
    return (
        <>
        <button
            className={`text-gray-800 bg-gray-100 rounded-lg py-2 px-4 w-full text-left mb-2 hover:bg-gray-200`}
            onClick={onClick}>

            <label> {label} </label>
        </button>
        </>

    );
};

export default RequestButton;