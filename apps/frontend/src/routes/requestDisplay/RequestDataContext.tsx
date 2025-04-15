import {createContext, useContext} from 'react';
import type { ServiceRequest } from "@/types.tsx";

type RequestDataContext = {
    filteredData: ServiceRequest[];
    isLoading: boolean;
    error: Error | null;
}

export const RequestDataContext = createContext<RequestDataContext | null>(null);

export const useRequestData = () => {
    const context = useContext(RequestDataContext);
    if (context === null) {
        throw new Error("useContextData null");
    }
    return context;
}