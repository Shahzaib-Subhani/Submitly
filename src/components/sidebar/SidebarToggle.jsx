import { useContext } from 'react';
import { SidebarContext } from '../../context/SidebarContext';
import { Menu } from "lucide-react";

const SidebarToggle = () => {

    const { toggleSidebar} = useContext(SidebarContext);

    return (
        <>
            <button
                onClick={toggleSidebar}
                className="items-center justify-center text-gray-500 border-gray-200 rounded-lg z-50 flex h-11 w-11 border cursor-pointer"
                aria-label="Toggle Sidebar"
            >

                <Menu />
            </button>
        </>
    );
}

export default SidebarToggle;
