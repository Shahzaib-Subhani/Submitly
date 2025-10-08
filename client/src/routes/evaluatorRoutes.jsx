

import EvaluatorDashboard from "../pages/evaluator/EvaluatorDashboard";
import EvaluateSubmission from "../pages/evaluator/EvaluateSubmission";
import SubmissionList from "../pages/evaluator/SubmissionList";
import Chat from "../pages/Chat";
import Evaluations from "../pages/evaluator/Evaluations";
import ViewEvaluation from "../pages/admin/evaluation/ViewEvaluation";
import EvaluatorProfile from "../pages/evaluator/EvaluatorProfile";
import UpdatePassword from "../pages/UpdatePassword";
import Logout from "../components/auth/Logout";


const evaluatorRoutes = [
    { path: "dashboard", component: EvaluatorDashboard },
    { path: "submission-list", component: SubmissionList },
    { path: "submission-list/evaluate-submission", component: EvaluateSubmission },
    { path: "evaluations", component: Evaluations },
    { path: "evaluations/view-evaluation", component: ViewEvaluation },
    { path: "chat-support", component: Chat },
    { path: "profile", component: EvaluatorProfile },
    { path: "update-password", component: UpdatePassword },
    { path: "logout", component: Logout },

];

export default evaluatorRoutes;