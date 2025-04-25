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
    const translateButton = isOpen ? width-68 : 20;


    return (
        <>
            <motion.div
                className="bg-[#F4F4F4] z-20"
                animate={{x: translateButton, y: 25}}
                initial={{x: translateButton, y: 25}}
                transition={{ type: 'tween', ease: 'easeOut', duration: 0.35}}>

                {/*sidebar toggle button*/}
                <div className={`${absolute ? `absolute` : `fixed`} z-40`}>
                    <div className="relative">
                        {/* Pulsing background effect*/}
                        <motion.div
                            className="absolute inset-0 rounded-full bg-[#009ca6]"
                            animate={{
                                scale: [1, 1.2, 1],
                                opacity: [0.7, 0.4, 0.7]
                            }}
                            transition={{
                                duration: 2,
                                repeat: Infinity,
                                repeatType: "loop",
                                ease: "easeInOut"
                            }}
                        />

                        <button
                            onClick={toggleSidebar}
                            aria-label={isOpen ? "Close sidebar" : "Open sidebar"}
                            aria-expanded={isOpen}
                            className="relative flex items-center justify-center w-9 h-9 rounded-full
                        bg-gradient-to-r from-[#003a96] to-[#003a96]
                        shadow-lg hover:shadow-xl transition-all duration-200
                        focus:outline-none focus:ring-2 focus:ring-[#b1e3e4] focus:ring-offset-2"
                        >
                            {/* Arrow icon  */}
                            <div className="flex items-center justify-center text-white">
                                <svg
                                    xmlns="http://www.w3.org/2000/svg"
                                    viewBox="0 0 25 24"
                                    fill="none"
                                    stroke="currentColor"
                                    strokeWidth="3"
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                    className="w-5 h-5 transition-all duration-300"
                                >
                                    {isOpen ? (
                                        // When sidebar is open arrow pointing left
                                        <polyline points="15 18 9 12 15 6" />
                                    ) : (
                                        // When sidebar is closed arrow pointing right
                                        <polyline points="9 18 15 12 9 6" />
                                    )}
                                </svg>
                            </div>
                        </button>
                    </div>
                </div>
            </motion.div>

                {/* Sidebar*/}
                <motion.div
                    style={{width}}
                    animate={{x: translateX}}
                    initial={{x: translateX}}
                    transition={{ type: 'tween', ease: 'easeOut', duration: 0.35}}>
                    {children}
                </motion.div>
        </>
    );
};

export default SideNav;