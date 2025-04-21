import { motion } from 'framer-motion';
import SideNav from "@/components/serviceRequest/sideNavigation.tsx";
import React, {useState} from "react";


type PageWrapperProps ={
    children: React.ReactNode;
    contents?: React.ReactNode;
    width?: number;
    open?: boolean;
}

const PageWrapper: React.FC<PageWrapperProps> = ({ children, contents, width, open = false}) => {
    const [isSidebarOpen, setSidebarOpen] = useState(open);
    const translateMargin = isSidebarOpen ? 0 : -1*(width ?? 256);

    return (
        <div className="flex flex-1">
        <SideNav isOpen={isSidebarOpen} setIsOpen={setSidebarOpen} width={width}>
            <div className="flex items-center justify-between px-4 py-3 mb-4 rounded-lg bg-gray-200 border-b-2 border-gray-300 shadow-sm">
                <span className="font-semibold text-gray-700 text-lg">Menu</span>
                <svg className="w-5 h-5 text-gray-500" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h16M4 18h7"></path>
                </svg>
            </div>
            {contents}
        </SideNav>
        <motion.main
            animate={{ marginLeft: translateMargin}}
            initial={{marginLeft: translateMargin}}
            transition={{ type: 'tween', ease: 'easeOut', duration: 0.35}}
            className="flex-1 min-h-screen"
        >
            {children}
        </motion.main>
            </div>
    );
};

export default PageWrapper;