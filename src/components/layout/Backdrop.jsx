import { useContext } from "react";
import { SidebarContext } from "../../context/SidebarContext";

const Backdrop = () => {
    const {  toggleSidebar, isMobile, expanded } = useContext(SidebarContext);

    if (!isMobile && expanded === false) return null;
    return (
        <>
            <div
                className="fixed inset-0 z-40 bg-gray-900/50 lg:hidden"
                onClick={toggleSidebar}
            />

        </>
    );
}

export default Backdrop;
