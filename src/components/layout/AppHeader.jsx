
import { Link } from "react-router-dom";
import SidebarToggle from "../sidebar/SidebarToggle";

const AppHeader = ({ title }) => {
    return (
        <>

            <header className="sticky top-0 flex w-full bg-white border-gray-200 z-99  lg:border-b">
                <div className="flex flex-col items-center justify-between grow lg:flex-row lg:px-6">
                    <div className="flex items-center justify-between w-full gap-2 px-3 py-3 border-b border-gray-200 sm:gap-4 lg:justify-normal lg:border-b-0 lg:px-0 lg:py-4">
                        <SidebarToggle />

                        <Link to="/" className="lg:hidden">
                            <img
                                className="dark:hidden"
                                src="./images/logo/logo.svg"
                                alt="Logo"
                            />
                            <img
                                className="hidden dark:block"
                                src="./images/logo/logo-dark.svg"
                                alt="Logo"
                            />
                        </Link>


                    </div>
                    {/* <div
                        className={`${isApplicationMenuOpen ? "flex" : "hidden"
                            } items-center justify-between w-full gap-4 px-5 py-4 lg:flex shadow-theme-md lg:justify-end lg:px-0 lg:shadow-none`}
                    >
                        <div className="flex items-center gap-2 2xsm:gap-3">
                        
                            <ThemeToggleButton />
                        
                            <NotificationDropdown />
                          
                        </div>
                      
                        <UserDropdown />
                    </div> */}
                </div>
            </header>

        </>
    );
}

export default AppHeader;
