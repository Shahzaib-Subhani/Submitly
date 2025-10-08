import ContentSubmission from "../pages/team/ContentSubmission";
import EditSubmission from "../pages/team/EditSubmission";
import TeamDashboard from "../pages/team/TeamDashboard";
import ViewEvaluationDetails from "../pages/team/ViewEvaluationDetails";
import ViewResult from "../pages/team/ViewResult";
import TeamProfile from "../pages/team/TeamProfile";
import Chat from "../pages/Chat";
import UpdatePassword from "../pages/UpdatePassword";
import Logout from "../components/auth/Logout";



const teamRoutes = [
  { path: "content-submission", component: ContentSubmission },
  { path: "edit-submission", component: EditSubmission },
  { path: "view-evaluation", component: ViewEvaluationDetails },
  { path: "result", component: ViewResult },
  { path: "chat-support", component: Chat },
  { path: "profile", component: TeamProfile },
  { path: "update-password", component: UpdatePassword },
  { path: "logout", component: Logout },
];

export default teamRoutes;