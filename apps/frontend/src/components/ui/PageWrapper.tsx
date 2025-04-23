import { motion } from 'framer-motion';
import SideNav from "@/components/serviceRequest/sideNavigation.tsx";
import React, {useEffect, useState} from "react";


type PageWrapperProps ={
    children: React.ReactNode;
    contents?: React.ReactNode;
    scaling?: 8|6|5|4|3;
    open?: boolean;
    absolute?: boolean;
}

const PageWrapper: React.FC<PageWrapperProps> = ({ children, contents, scaling = 3, open = false, absolute = true}) => {
    const [isSidebarOpen, setSidebarOpen] = useState(open);

    const useOneThirdWidth = () => {
        const [width, setWidth] = useState(window.innerWidth / scaling);
        useEffect(() => {
            const handleResize = () => {
                setWidth(window.innerWidth / scaling);
            };

            window.addEventListener('resize', handleResize);
            return () => window.removeEventListener('resize', handleResize);
        }, []);
        return width;
    };

    const width = useOneThirdWidth();
    const translateMargin = isSidebarOpen ? 0 : -1*(width ?? 256);

    return (
        <div className="flex">
        <SideNav isOpen={isSidebarOpen} setIsOpen={setSidebarOpen} width={width} absolute={absolute}>

            {contents}
        </SideNav>
        <motion.main
            animate={{ marginLeft: translateMargin}}
            initial={{marginLeft: translateMargin}}
            transition={{ type: 'tween', ease: 'easeOut', duration: 0.35}}
            className="flex-1"
        >
            {children}
        </motion.main>
            </div>
    );
};

export default PageWrapper;