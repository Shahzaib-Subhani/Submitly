import React, { useContext } from 'react';
import { SidebarContext } from '../../context/SidebarContext';
import { ChevronFirst, ChevronLast } from "lucide-react";

const SidebarToggle = () => {
    console.log("toggle");

        const { expanded, setExpanded } = useContext(SidebarContext);
    return (
        <>
            <button
                onClick={() => setExpanded((curr) => !curr)}
                className="flex items-center justify-center p-2 rounded-lg border border-indigo-300
             bg-white shadow-sm transition-all duration-200
             hover:bg-indigo-50 hover:shadow-md focus:outline-none  active:scale-95"
            >
                {expanded ? <ChevronFirst size={20} className="text-indigo-600" /> : <ChevronLast size={20} className="text-indigo-600" />}
            </button>
        </>
    );
}

export default SidebarToggle;
