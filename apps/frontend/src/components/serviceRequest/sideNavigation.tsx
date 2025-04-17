import React, { useState } from 'react';

interface SideNavProps {
    children: React.ReactNode; // Add other react components
}

const SideNav: React.FC<SideNavProps> = ({ children }) => {
    const [isOpen, setIsOpen] = useState(false);

    const toggleSidebar = () => {
        setIsOpen(!isOpen);
    };

    return (
        <div className={"items-start"}>
            {/* Toggle button */}
            <button
                onClick={toggleSidebar}
                className={`fixed top-1/2 left-0 z-30  shadow-md text-xl text-right text-darkgray p-3 h-25 w- rounded-r-lg bg-[#F4F4F4]  focus:outline-none transform transition-transform duration-300 ${
                    isOpen ? 'translate-x-80' : 'translate-x-0' // Move button 64px right when sidebar is open
                }`}
            >
                {isOpen ? '←': '→'}
            </button>

            {/* Sidebar */}
            <div
                className={`fixed top-15 left-0 h-full bg-[#F4F4F4] shadow-xl text-white w-80 transform transition-transform duration-300 rounded-r-lg ${
                    isOpen ? 'translate-x-0' : '-translate-x-full'
                }`}
            >
                <div className="p-5"> {/* Padding inside the sidebar */}
                    {children}
                </div>
            </div>
        </div>
    );
};

export default SideNav;
