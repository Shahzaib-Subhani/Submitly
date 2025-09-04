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
    ScrollText,
} from "lucide-react";

const sidebarMenu = {
    admin: [
        { icon: LayoutDashboard, text: "Dashboard", path: "dashboard" },
        { icon: User, text: "Teams", path: "manage-teams" },
        { icon: UserStar, text: "Evaluators", path: "evaluators-list" },
        { icon: ClipboardPlus, text: "Submissions", path: "submissions-list" },
        { icon: FilePenLine, text: "Evaluations", path: "evaluations" },
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
        { icon: ScrollText, text: "Evaluation Details", path: "view-evaluation" },
        { icon: MessageCircleQuestionMark, text: "Chat Support", path: "chat-support" },
        { icon: LayoutDashboard, text: "Admin Dashboard", path: "/admin/dashboard" },


    ],
    evaluator: [
        { icon: LayoutDashboard, text: "Dashboard", path: "dashboard" },
        { icon: TvMinimalPlay, text: "Submissions", path: "submission-list" },
        { icon: FilePenLine, text: "Evaluations", path: "evaluations" },
        { icon: MessageCircleQuestionMark, text: "Chat Support", path: "chat-support" },
        { icon: LayoutDashboard, text: "Admin Dashboard", path: "/admin/dashboard" },


    ],

    // { icon: LogIn, text: "Evaluator Login", path: "/evaluator-login" },
    // { icon: UserPlus, text: "Evaluator Register", path: "/evaluator-register" },
    // { icon: LogIn, text: "Team Login", path: "/team-login" },
    // { icon: UserPlus, text: "Team Register", path: "/team-register" },
};

export default sidebarMenu;