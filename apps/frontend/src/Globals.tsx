import React, { createContext, useContext, useState, ReactNode } from "react";

interface AppContextType {
    isSignedIn: boolean;
    setSignedIn: React.Dispatch<React.SetStateAction<boolean>>;
    firstName: string;
    setFirstName: React.Dispatch<React.SetStateAction<string>>;
}

const AppContext = createContext<AppContextType | undefined>(undefined);


export const useAppContext = () => {
    const context = useContext(AppContext);
    if (!context) {
        throw new Error("useAppContext must be used within an AppProvider");
    }
    return context;
};

export const AppProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
    const [isSignedIn, setSignedIn] = useState(false);
    const [firstName, setFirstName] = useState(""); // Example with a number

    return (
        <AppContext.Provider value={{ isSignedIn, setSignedIn, firstName, setFirstName }}>
            {children}
        </AppContext.Provider>
    );
};