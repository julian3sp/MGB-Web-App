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
        <div>
            {/* Toggle button */}
            <button
                onClick={toggleSidebar}
                className="fixed top-1/2 left-0 z-30 text-xl p-3 bg-gray-800 text-white rounded-md focus:outline-none"
            >
                {isOpen ? '←': '→'}
            </button>

            {/* Sidebar */}
            <div
                className={`fixed top-15 left-0 h-full bg-gray-700 text-white w-64 transform transition-transform duration-300 rounded-r-lg ${
                    isOpen ? 'translate-x-0' : '-translate-x-full'
                }`}
            >
                <div className="p-5"> {/* Padding inside the sidebar */}
                    {children}
                </div>
            </div>

            {/* Overlay */}
            {isOpen && (
                <div
                    className="fixed inset-0"
                    onClick={toggleSidebar}
                ></div>
            )}
        </div>
    );
};

export default SideNav;
