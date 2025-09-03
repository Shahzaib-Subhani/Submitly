import React, { useEffect, useMemo } from 'react';
import { useLocation } from 'react-router-dom';
import sidebarMenu from '../components/layout/SidebarMenu';

const extraMenu = {
    "edit-user": "Edit User",
    "edit-members": "Edit Team Members",
    "edit-evaluator": "Edit Evaluator",
    "evaluator-signin": "Evaluator Sign In",
    "evaluator-register": "Evaluator Registration",
    "team-signin": "Team Sign In",
    "team-register": "Team Registration",
}

const usePageTitle = () => {
    const { pathname } = useLocation();

    const segments = pathname.split("/").filter(Boolean);
    
    const roleSegment = segments[0];
    const lastSegment = segments[segments.length - 1];

    const title = useMemo(() => {
        const menuItems = sidebarMenu[roleSegment];
        if (!menuItems) return extraMenu[lastSegment] || "Submittly";

        const match = menuItems.find((item) => item.path === lastSegment);
        return match?.text || extraMenu[lastSegment] || "Submittly";
    }, [pathname, roleSegment]);

    useEffect(() => {
        document.title = title ? `${title} | Submittly` : "Submittly";
    }, [title]);

    return title;
}

export default usePageTitle;
