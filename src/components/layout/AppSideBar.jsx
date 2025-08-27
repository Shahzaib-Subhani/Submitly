
import SidebarNav from "../sidebar/SidebarNav";
import {
  ClipboardPlus,
  User,
  UserStar,
  ClipboardList,
  CalendarX2,
  TvMinimalPlay,
  FilePenLine,
  MessageSquareText,
  MessageCircleQuestionMark,
  LayoutDashboard,
} from "lucide-react";
import { SidebarItem } from "../sidebar/SidebarItem";
import { Navigate, useLocation } from "react-router-dom";
import { useContext } from "react";
import { SidebarContext } from "../../context/SidebarContext";

const sidebarMenu = {
  admin: [
    { icon: LayoutDashboard, text: "Dashboard", path: "dashboard" },
    { icon: User, text: "Users", path: "manage-users" },
    { icon: UserStar, text: "Evaluators", path: "evaluators-list" },
    { icon: ClipboardPlus, text: "Assign Evaluators", path: "assign-evaluator" },
    { icon: ClipboardList, text: "Publish Result", path: "publish-result" },
    { icon: CalendarX2, text: "Set Deadline", path: "set-deadline" },
    { icon: MessageCircleQuestionMark, text: "Chat Support", path: "chat-support" },
    { icon: LayoutDashboard, text: "Team Dashboard", path: "/team/dashboard" },
    { icon: LayoutDashboard, text: "Evaluator Dashboard", path: "/evaluator/dashboard" },

  ],
  team: [
    { icon: LayoutDashboard, text: "Dashboard", path: "dashboard" },
    { icon: TvMinimalPlay, text: "Content Submission", path: "content-submission" },
    { icon: FilePenLine, text: "Edit Submission", path: "edit-submission" },
    { icon: MessageSquareText, text: "View Feedback", path: "view-feedback" },
    { icon: MessageCircleQuestionMark, text: "Chat Support", path: "chat-support" },
    { icon: LayoutDashboard, text: "Admin Dashboard", path: "/admin/dashboard" },


  ],
  evaluator: [
    { icon: LayoutDashboard, text: "Dashboard", path: "dashboard" },
    { icon: TvMinimalPlay, text: "Submission List", path: "submission-list" },
    { icon: FilePenLine, text: "Evaluate Submission", path: "evaluate-submission" },
    { icon: MessageCircleQuestionMark, text: "Chat Support", path: "chat-support" },
    { icon: LayoutDashboard, text: "Admin Dashboard", path: "/admin/dashboard" },


  ],

  // { icon: LogIn, text: "Evaluator Login", path: "/evaluator-login" },
  // { icon: UserPlus, text: "Evaluator Register", path: "/evaluator-register" },
  // { icon: LogIn, text: "Team Login", path: "/team-login" },
  // { icon: UserPlus, text: "Team Register", path: "/team-register" },
};

export default function AppSideBar() {
  const { pathname } = useLocation();
  const { expanded } = useContext(SidebarContext);

  const pathRoleSegment = pathname.split("/")[1];
  const menuItems = sidebarMenu[pathRoleSegment];

  if (!menuItems) return <Navigate to={"not-found"}  replace/>;

  return (
    <>
      <SidebarNav >
        {menuItems.map(({ icon: Icon, text, path }, index) => {

          const isActive = pathname.includes(`/${pathRoleSegment}/${path}`);
          return <SidebarItem key={index} Icon={Icon} text={text} path={path} active={isActive} expanded={expanded} />
        }
        )}
      </SidebarNav>
    </>
  );
}
