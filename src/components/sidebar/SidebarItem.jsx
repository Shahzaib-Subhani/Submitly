import { Link } from "react-router-dom";
import { SidebarContext } from "../../context/SidebarContext";
import { useContext } from "react";

export function SidebarItem({ icon, text, active }) {
  const {expanded} = useContext(SidebarContext);
  return (
    <li
      className={`relative flex items-center py-2 px-3 my-1 font-medium rounded-md cursor-pointer transition-colors  ${active
        ? "bg-gradient-to-tr from-indigo-200 to-indigo-100 text-neutral-900"
        : "hover:bg-indigo-50 text-gray-900"
        }`}
    >
      <span>{icon}</span>
      <Link
        className={`overflow-hidden transition-all ${expanded ? "w-52 ml-3" : "w-0"
          }`}
      >
        {text}
      </Link>

     
    </li>
  );
}