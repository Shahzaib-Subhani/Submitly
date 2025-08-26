
import { Link } from "react-router-dom";
import SidebarToggle from "../sidebar/SidebarToggle";

const AppHeader = ({ }) => {
    console.log("Header");
    return (
        <>
            <header className="bg-zinc-50 border-b border-gray-300">
                <div className="mx-auto flex h-16 items-center justify-between px-4 sm:px-6 lg:px-8">
                <SidebarToggle />
                   
                    <Link
                        className="rounded-md sm:block hidden bg-slate-600 px-5 py-2.5 text-sm font-medium text-white transition hover:bg-slate-700"
                        href="#"
                    >
                        Profile
                    </Link>
                </div>
            </header>

        </>
    );
}

export default AppHeader;
