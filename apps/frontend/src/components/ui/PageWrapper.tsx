import { motion } from 'framer-motion';
import SideNav from "@/components/serviceRequest/sideNavigation.tsx";
import React, {useState} from "react";


type PageWrapperProps ={
    children: React.ReactNode;
    contents?: React.ReactNode;
    width?: number;
    open?: boolean;
    absolute?: boolean;
}

const PageWrapper: React.FC<PageWrapperProps> = ({ children, contents, width, open = false, absolute = true}) => {
    const [widthFrac, setWidthFrac] = useState(6);
    const [isSidebarOpen, setSidebarOpen] = useState(open);
    const translateMargin = isSidebarOpen ? 0 : -1*(width ?? 256);

    return (
        <div className="flex flex-1">
        <SideNav isOpen={isSidebarOpen} setIsOpen={setSidebarOpen} width={width} absolute={absolute}>

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