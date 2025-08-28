import React, { useEffect, useMemo } from 'react';
import { useLocation } from 'react-router-dom';
import sidebarMenu from '../components/layout/SidebarMenu';

const usePageTitle = () => {
    const { pathname } = useLocation();

    const pathRoleSegment = pathname.split("/")[1];

    const title = useMemo(() => {
        const menuItems = sidebarMenu[pathRoleSegment];
        if (!menuItems) return "Submittly";

        const match = menuItems.find((item) => {
            const fullPath = item.path.startsWith("/")
                ? item.path
                : `/${pathRoleSegment}/${item.path}`;
            return fullPath === pathname;
        });

        return match?.text || "Submittly";
    }, [pathname, pathRoleSegment]);

    useEffect(() => {
        document.title = title ? `${title} | Submittly` : "Submittly";
    }, [title]);

    return title;
}

export default usePageTitle;
