import { Link, NavLink, useLocation } from "react-router-dom";
import { SidebarContext } from "../../context/SidebarContext";
import { useContext } from "react";
import { memo } from "react";

export const SidebarItem = memo(
  function SidebarItem({ Icon, text, path, active, expanded }) {
console.log(text + " Rendered");

    return (
      <>
        <li>


          <Link
            to={path}
            className={`relative flex items-center w-full gap-3 px-3 py-2 font-medium rounded-lg text-theme-sm group ${active
              ? "bg-blue-50 text-indigo-600 "
              : "text-gray-700 hover:bg-gray-100 "}`}
          >
            <span >
              <Icon size={active ? 25 : 22} />
            </span>
            {expanded &&
              <span className="menu-item-text">{text}</span>
            }
          </Link>



        </li>

      </>

    );
  },
  (prevProps, nextProps) => {
    return (
      prevProps.Icon === nextProps.Icon &&
      prevProps.text === nextProps.text &&
      prevProps.path === nextProps.path &&
      prevProps.active === nextProps.active
    );
  }


);