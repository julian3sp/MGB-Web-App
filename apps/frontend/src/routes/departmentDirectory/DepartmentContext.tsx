import { createContext, ReactNode, useContext } from 'react';

type FlipCard = {
    category: string;
    title: string;
    src: string;
    content: ReactNode;
};

type DepartmentContext = {
    filteredDeps: FlipCard[];
}

export const DepartmentContext = createContext<DepartmentContext | null>(null);

export const useRequestData = () => {
    const context = useContext(DepartmentContext);
    if (context === null) {
        throw new Error("useContextData null");
    }
    return context;
}