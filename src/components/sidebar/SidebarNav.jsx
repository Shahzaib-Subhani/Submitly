
import logo from "/submitly.png";
import { LogOut } from "lucide-react";
import { SidebarItem } from "./SidebarItem";
import { SidebarContext } from "../../context/SidebarContext";
import { useContext } from "react";

const SidebarNav = ({ children }) => {
  const {expanded} = useContext(SidebarContext);
  return (
    <>
      <aside
        className={`bg-zinc-50 shadow-md border-r h-full border-gray-300 transition-all duration-300 overflow-hidden
          ${expanded ? "w-64" : "w-0"}
        `}
      >
        <nav className="h-full flex flex-col">
          <div className="p-4 pb-2 flex justify-between items-center">
            <img
              src={logo}
              className={`transition-all duration-300 ${expanded ? "w-32" : "w-0"}`}
              alt="Logo"
            />
          </div>

          <ul className="flex-1 px-3">{children}</ul>

          <div className="border-t border-gray-300 py-3">
            <SidebarItem
              icon={<LogOut size={20} />}
              text="Logout"
            />
          </div>
        </nav>
      </aside>
    </>
  );
};

export default SidebarNav;
