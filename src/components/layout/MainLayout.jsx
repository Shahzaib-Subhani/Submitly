
import AppHeader from './AppHeader';
import { Outlet } from 'react-router-dom';
import { SidebarProvider } from '../../context/SidebarContext';
import AppSideBar from './AppSideBar';

const MainLayout = () => {

    return (
        <>
            <SidebarProvider>

                <div className="flex h-screen">
                    <AppSideBar />

                    <div className="flex flex-col flex-1">
                        <AppHeader title={"Team Dashboard"} />
                        <main className="flex-1 p-6 bg-white">
                            <Outlet />
                        </main>

                    </div>
                </div>
            </SidebarProvider>
        </>
    );
}

export default MainLayout;
