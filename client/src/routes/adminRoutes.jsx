import SubmissionsList from "../pages/admin/submission/SubmissionsList";
import AssignEvaluator from "../pages/admin/submission/AssignEvaluator";
import EvaluatorList from "../pages/admin/EvaluatorsList";
import ManageTeams from "../pages/admin/team/ManageTeams";
import PublishResult from "../pages/admin/PublishResult";
import SetDeadline from "../pages/admin/SetDeadline";
import AdminDashboard from "../pages/admin/AdminDashboard";

import EditEvaluator from "../pages/admin/EditEvaluator";
import ViewSubmission from "../pages/admin/submission/ViewSubmission";
import ViewTeam from "../pages/admin/team/ViewTeam";
import EditTeam from "../pages/admin/team/EditTeam";
import EditTeamMember from "../pages/admin/team/EditTeamMember";
import EvaluationsList from "../pages/admin/evaluation/EvaluationsList";
import ChatSupport from "../pages/admin/ChatSupport";
import AdminProfile from "../pages/admin/AdminProfile";
import ViewEvaluation from "../pages/admin/evaluation/ViewEvaluation";
import LinkPage from "../pages/auth/LinkPage";
import Logout from "../components/auth/Logout";
import UpdatePassword from "../pages/admin/UpdatePassword";
import AddTeamMember from "../pages/admin/team/AddTeamMember";

const adminRoutes = [
    { path: "dashboard", component: AdminDashboard },
    { path: "submissions-list", component: SubmissionsList },
    { path: "submissions-list/view-submission", component: ViewSubmission },
    { path: "submissions-list/assign-evaluator", component: AssignEvaluator },
    { path: "evaluators-list", component: EvaluatorList },
    { path: "evaluators-list/edit-evaluator/:evaluatorID", component: EditEvaluator },
    { path: "evaluations", component: EvaluationsList },
    { path: "evaluations/view-evaluation", component: ViewEvaluation },
    { path: "manage-teams", component: ManageTeams },
    { path: "manage-teams/view-team/:teamID", component: ViewTeam },
    { path: "manage-teams/edit-team/:teamID", component: EditTeam },
    { path: "manage-teams/:teamID/edit-members/:memberID", component: EditTeamMember },
    { path: "manage-teams/:teamID/add-member", component: AddTeamMember },
    { path: "publish-result", component: PublishResult },
    { path: "set-deadline", component: SetDeadline },
    { path: "chat-support", component: ChatSupport },
    { path: "profile", component: AdminProfile },
    { path: "update-password", component: UpdatePassword },
    { path: "logout", component: Logout },

];

export default adminRoutes;