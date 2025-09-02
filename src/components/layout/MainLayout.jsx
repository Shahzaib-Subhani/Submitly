
import AppHeader from './AppHeader';
import { Outlet } from 'react-router-dom';
import AppSideBar from './AppSideBar';
import Backdrop from './Backdrop';
import { useContext } from 'react';
import { SidebarContext, SidebarProvider } from '../../context/SidebarContext';
import TopLoader from './TopLoader';

const MainLayout = () => {

    return (
        <>
            <TopLoader />
            <SidebarProvider>

                <div className="min-h-screen xl:flex">
                    <div>
                        <AppSideBar />
                        <Backdrop />
                    </div>
                    <LayoutContent />
                </div>
            </SidebarProvider>
        </>
    );
}

const LayoutContent = () => {
    const { expanded, isMobile } = useContext(SidebarContext);
    return (
        <>
            <div
                className={`flex-1 transition-all duration-300 ease-in-out ${expanded ? "lg:ml-[290px]" : "lg:ml-[0px]"
                    } `}
            >
                <AppHeader />
                <div className="p-2 mx-auto max-w-(--breakpoint-2xl) md:p-6">
                    <Outlet />
                </div>
            </div>
        </>
    );
}

export default MainLayout;
