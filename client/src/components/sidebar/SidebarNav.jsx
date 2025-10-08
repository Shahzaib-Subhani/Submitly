
import logo from "/submitly.png";
import { SidebarContext } from "../../context/SidebarContext";
import { useContext } from "react";
import { Link } from "react-router-dom";

const SidebarNav = ({ children }) => {
  const { expanded } = useContext(SidebarContext);
  return (
    <>
      <aside
        className={`fixed mt-16 flex flex-col lg:mt-0 top-0 px-5 left-0 bg-white text-gray-900 h-screen transition-all duration-300 ease-in-out z-50 border-1 border-gray-200 
        ${expanded
            ? "w-[290px]"
            : "w-[0px]"
          }
        ${expanded ? "translate-x-0" : "-translate-x-full"}
    `}
      >

        <div
          className={`py-8 flex ${!expanded ? "lg:justify-center" : "justify-start"
            }`}
        >
          <Link to="/">
            {expanded ? (
              <>
                <img
                  className=""
                  src={logo}
                  alt="Logo"
                  width={150}
                  height={40}
                />

              </>
            ) : (
              <img
                src={logo}
                alt="Logo"
                width={32}
                height={32}
              />
            )}
          </Link>
        </div>
        <div className="flex flex-col overflow-y-auto duration-300 ease-linear no-scrollbar">
          <nav className="mb-6">
            <div className="flex flex-col gap-4">
              <div>
                <h2
                  className={`mb-4 text-xs uppercase flex leading-[20px] text-gray-400 ${!expanded
                    ? "lg:justify-center"
                    : "justify-start"
                    }`}
                >
                  Menu
                </h2>
                <ul className="flex flex-col gap-4">

                  {children}

                </ul>
              </div>

            </div>
          </nav>
        </div>

      </aside>
    </>
  );
};

export default SidebarNav;
