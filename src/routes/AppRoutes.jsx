import { Navigate, Route, Routes } from "react-router-dom";
import EvaluatorRegister from "../pages/EvaluatorRegister";
import EvaluatorSignIn from "../pages/EvaluatorSignIn";
import TeamLogin from "../pages/TeamLogin";
import TeamRegister from "../pages/TeamRegister";
import Dashboard from "../pages/Dashboard";
import Submissions from "../pages/admin/Submissions";
import EvaluatorList from "../pages/admin/EvaluatorsList";
import ManageUsers from "../pages/admin/ManageUsers";
import MainLayout from "../components/layout/MainLayout";
import NotFound from "../pages/NotFound";
import PublishResult from "../pages/admin/PublishResult";
import SetDeadline from "../pages/admin/SetDeadline";
import ContentSubmission from "../pages/team/ContentSubmission";
import EditSubmission from "../pages/team/EditSubmission";
import ViewFeedback from "../pages/team/ViewFeedback";
import AdminDashboard from "../pages/admin/AdminDashboard";
import TeamDashboard from "../pages/team/TeamDashboard";
import EvaluatorDashboard from "../pages/evaluator/EvaluatorDashboard";
import EvaluateSubmission from "../pages/evaluator/EvaluateSubmission";
import SubmissionList from "../pages/evaluator/SubmissionList";
import Chat from "../pages/Chat";

export default function AppRoutes() {
  return (
    <Routes>
      <Route path="/" element={<Navigate to={"admin"} />} />
      <Route path="/evaluator-login" element={<EvaluatorSignIn />} />
      <Route path="/evaluator-register" element={<EvaluatorRegister />} />
      <Route path="/team-register" element={<TeamRegister />} />
      <Route path="/team-login" element={<TeamLogin />} />

      <Route path="admin" element={<MainLayout />}>
        <Route index element={<Navigate to={"dashboard"} replace />} />
        <Route path="dashboard" element={<AdminDashboard />} />
        <Route path="submissions-list" element={<Submissions />} />
        <Route path="evaluators-list" element={<EvaluatorList />} />
        <Route path="manage-users" element={<ManageUsers />} />
        <Route path="publish-result" element={<PublishResult />} />
        <Route path="set-deadline" element={<SetDeadline />} />
        <Route path="chat-support" element={<Chat />} />

      </Route>
      <Route path="/team" element={<MainLayout />}>
        <Route index element={<Navigate to={"dashboard"} replace />} />
        <Route path="dashboard" element={<TeamDashboard />} />
        <Route path="content-submission" element={<ContentSubmission />} />
        <Route path="edit-submission" element={<EditSubmission />} />
        <Route path="view-feedback" element={<ViewFeedback />} />
        <Route path="chat-support" element={<Chat />} />

      </Route>
      <Route path="/evaluator" element={<MainLayout />}>
        <Route index element={<Navigate to={"dashboard"} replace />} />

        <Route path="dashboard" element={<EvaluatorDashboard />} />
        <Route path="evaluate-submission" element={<EvaluateSubmission />} />
        <Route path="submission-list" element={<SubmissionList />} />
        <Route path="chat-support" element={<Chat />} />

      </Route>


      <Route
        path="*"
        element={<NotFound />}
      />
      <Route
        path="not-found"
        element={<NotFound />}
      />
    </Routes>
  );
}
