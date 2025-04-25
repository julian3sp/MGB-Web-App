import React, { useEffect, useRef, useState } from 'react';



export default function Popup({ message }: {message:string}) {
    const [showPopup, setShowPopup] = useState(false);
    const useClickOutside = (handler: () => void) => {
        const reference = useRef();

        useEffect(() => {
            const newHandler = (event: MouseEvent) => {
                if (!reference.current?.contains(event.target)) handler();
            };

            document.addEventListener('mousedown', newHandler);

            return () => {
                document.removeEventListener('mousedown', newHandler);
            };
        }, [handler]);
        return reference;
    };
    useEffect(() => {
        const hasSeenPopup = localStorage.getItem("showPopup");
        if (!hasSeenPopup) {
            setShowPopup(true);
        }
    }, [])

    const handleClosePopup = () => {
        setShowPopup(false);
        localStorage.setItem("showPopup", 'true');
    }

    const [isOpen, setIsOpen] = useState(true);
    const popupRef = useClickOutside(() => {
        setIsOpen(false);
        localStorage.setItem('popupShown', "true");
    });
    if (!showPopup) return null;

    return (
        <>
            {isOpen && (
            <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
        <div ref={popupRef} className="relative bg-[#003A96] rounded-md shadow-xl p-6 pb-6 max-w-md w-full text-center">
            <button onClick={handleClosePopup} className="absolute top-1 right-3 text-[#b8d9d9] hover:text-[#44a6a6] text-2xl font-bold font-[Poppins]">&times;</button>
            <p className="font-[Poppins] text-white text-m">{message}</p>
        </div>
        </div>
                )}
            </>
    )
}