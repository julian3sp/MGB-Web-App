import { motion } from 'framer-motion';
import React, { useState } from 'react';

interface SideNavProps {
    isOpen: boolean;
    setIsOpen: (open: boolean) => void;
    children: React.ReactNode;
    width?: number;
    absolute?: boolean;
}

const SideNav: React.FC<SideNavProps> = ({ children, isOpen, setIsOpen, width = 256, absolute}) => {

    const toggleSidebar = () => {
        setIsOpen(!isOpen);
    };
    const translateX = isOpen ? 0 : -width;
    const translateButton = isOpen ? width-50 : 18;


    return (
        <>
            <motion.div
                className="h-screen bg-[#F4F4F4] shadow-xl z-20"
                animate={{x: translateButton, y: 16}}
                initial={{x: translateButton, y: 16}}
                transition={{ type: 'tween', ease: 'easeOut', duration: 0.35}}>
            {/*toggle button*/}
            <div className={`${absolute ? `absolute` : `fixed`} z-40`}>
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
            </motion.div>

                {/* Sidebar*/}
                <motion.div
                    className="h-screen bg-[#F4F4F4] shadow-xl"
                    style={{width}}
                    animate={{x: translateX}}
                    initial={{x: translateX}}
                    transition={{ type: 'tween', ease: 'easeOut', duration: 0.35}}>

                    <div className="overflow-y-auto h-full">
                        {children}
                    </div>
                </motion.div>
        </>
    );
};

export default SideNav;