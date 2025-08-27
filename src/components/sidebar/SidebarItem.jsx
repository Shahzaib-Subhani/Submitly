import { Link, NavLink, useLocation } from "react-router-dom";
import { SidebarContext } from "../../context/SidebarContext";
import { useContext } from "react";
import { memo } from "react";

export const SidebarItem = memo(
  function SidebarItem({ Icon, text, path, active, expanded }) {

    return (
      <li
        className={`relative flex items-center py-2 px-3 my-1 font-medium rounded-md cursor-pointer transition-colors  ${active
          ? "bg-gradient-to-tr from-indigo-200 to-indigo-100 text-neutral-900"
          : "hover:bg-indigo-50 text-gray-900"
          }`}
      >
        <span><Icon size={20} /></span>
        <NavLink to={path}
          className={`overflow-hidden transition-all ${expanded ? "w-52 ml-3" : "w-0"
            }`}
        >
          {text}
        </NavLink>


      </li>
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