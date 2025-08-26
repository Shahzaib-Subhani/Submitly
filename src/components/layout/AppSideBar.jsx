
import SidebarNav from "../sidebar/SidebarNav";
import {
  LayoutDashboard,
  Home,
  StickyNote,
  Layers,
  Flag,
  Calendar,
  LifeBuoy,
  Settings,
} from "lucide-react";
import { SidebarItem } from "../sidebar/SidebarItem";

const menuItems = [
  { icon: Home, text: "Home" },
  { icon: LayoutDashboard, text: "Dashboard", active: true },
  { icon: StickyNote, text: "Projects" },
  { icon: Calendar, text: "Calendar" },
  { icon: Layers, text: "Tasks" },
  { icon: Flag, text: "Reporting" },
  { icon: Settings, text: "Settings" },
  { icon: LifeBuoy, text: "Help" },
];

export default function AppSideBar() {
console.log("SideBar");

  return (
    <>
      <SidebarNav>
        {menuItems.map(({ icon: Icon, text, active }, index) => (
          <SidebarItem
            key={index}
            icon={<Icon size={20} />}
            text={text}
            active={active}
          />
        ))}
      </SidebarNav>
    </>
  );
}
