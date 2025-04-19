import React, { useState } from 'react';

interface SideNavProps {
    children: React.ReactNode;
}

const SideNav: React.FC<SideNavProps> = ({ children }) => {
    const [isOpen, setIsOpen] = useState(true);

    const toggleSidebar = () => {
        setIsOpen(!isOpen);
    };

    return (
        <>
            {/*toggle button*/}
            <div className="fixed top-18 left-2 z-40">
                <button
                    onClick={toggleSidebar}
                    aria-label={isOpen ? "Close sidebar" : "Open sidebar"}
                    aria-expanded={isOpen}
                    className="flex items-center justify-center w-10 h-10 rounded-full
                              bg-gradient-to-r from-blue-500 to-blue-700
                              shadow-lg hover:shadow-xl transition-all duration-200
                              focus:outline-none focus:ring-2 focus:ring-blue-300 focus:ring-offset-2"
                >
                    {/*indicator*/}
                    <div className={`w-5 h-5 rounded-full border-2 border-white transition-all duration-300 ${
                        isOpen ? 'bg-white' : 'bg-transparent'
                    }`}/>
                </button>
            </div>

            <div className="absolute top-0 left-0 h-full">
                {/* Sidebar*/}
                <div
                    className={`pt-10 h-full bg-[#F4F4F4] shadow-xl text-white w-64 transform transition-transform duration-300 ease-in-out ${
                        isOpen ? 'translate-x-0' : '-translate-x-full'}`}
                >

                    <div className="p-5 overflow-y-auto h-full">
                        {children}
                    </div>
                </div>
            </div>
        </>
    );
};

export default SideNav;