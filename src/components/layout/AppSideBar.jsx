
import SidebarNav from "../sidebar/SidebarNav";

import { SidebarItem } from "../sidebar/SidebarItem";
import { Navigate, useLocation } from "react-router-dom";
import { useContext, useMemo } from "react";
import { SidebarContext } from "../../context/SidebarContext";
import sidebarMenu from "./SidebarMenu";



export default function AppSideBar() {
  const { pathname } = useLocation();
  const { expanded } = useContext(SidebarContext);

  const pathRoleSegment = pathname.split("/")[1];
  const menuItems = useMemo(() => sidebarMenu[pathRoleSegment], [pathRoleSegment]);

  if (!menuItems) return <Navigate to={"not-found"} replace />;

  return (
    <>
      <SidebarNav >
        {menuItems.map(({ icon: Icon, text, path }, index) => {

          const fullPath = path.startsWith("/")
            ? path
            : `/${pathRoleSegment}/${path}`;
          const isActive = pathname === fullPath;
          return <SidebarItem key={index} Icon={Icon} text={text} path={path} active={isActive} expanded={expanded} />
        }
        )}
      </SidebarNav>
    </>
  );
}
