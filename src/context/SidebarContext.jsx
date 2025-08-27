import { createContext, useEffect, useState } from "react";
import { useIsMobile } from "../hooks/use-mobile";

export const SidebarContext = createContext();


export const SidebarProvider = ({ children }) => {
    const [expanded, setExpanded] = useState(true);
    const isMobile = useIsMobile();

    useEffect(() => {
        if (isMobile) setExpanded(false);
        else setExpanded(true);
    }, [isMobile]);

    return (
        <SidebarContext.Provider value={{ expanded, setExpanded }}>
            {children}
        </SidebarContext.Provider>
    );
}