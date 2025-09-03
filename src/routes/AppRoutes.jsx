import { Navigate, Route, Routes } from "react-router-dom";
import EvaluatorRegister from "../pages/EvaluatorRegister";
import EvaluatorSignIn from "../pages/EvaluatorSignIn";
import TeamLogin from "../pages/TeamLogin";
import TeamRegister from "../pages/TeamRegister";
import Dashboard from "../pages/Dashboard";
import SubmissionsList from "../pages/admin/submission/SubmissionsList";
import AssignEvaluator from "../pages/admin/submission/AssignEvaluator";
import EvaluatorList from "../pages/admin/EvaluatorsList";
import ManageTeams from "../pages/admin/team/ManageTeams";
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

import EditEvaluator from "../pages/admin/EditEvaluator";
import ViewSubmission from "../pages/admin/submission/ViewSubmission";
import ViewTeam from "../pages/admin/team/ViewTeam";
import EditTeam from "../pages/admin/team/EditTeam";
import EditTeamMember from "../pages/admin/team/EditTeamMember";

export default function AppRoutes() {
  return (
    <Routes>
      <Route path="/" element={<Navigate to={"admin"} />} />
      <Route path="/evaluator-signin" element={<EvaluatorSignIn />} />
      <Route path="/evaluator-register" element={<EvaluatorRegister />} />
      <Route path="/team-register" element={<TeamRegister />} />
      <Route path="/team-signin" element={<TeamLogin />} />

      <Route path="admin" element={<MainLayout />}>
        <Route index element={<Navigate to={"dashboard"} replace />} />
        <Route path="dashboard" element={<AdminDashboard />} />
        <Route path="submissions-list" element={<SubmissionsList />} />
        <Route path="submissions-list/view-submission" element={<ViewSubmission />} />
        <Route path="submissions-list/assign-evaluator" element={<AssignEvaluator />} />
        <Route path="evaluators-list" element={<EvaluatorList />} />
        <Route path="evaluators-list/edit-evaluator" element={<EditEvaluator />} />
        <Route path="manage-teams" element={<ManageTeams />} />
        <Route path="manage-teams/view-team" element={<ViewTeam />} />
        <Route path="manage-teams/edit-team" element={<EditTeam />} />
        <Route path="manage-teams/edit-members" element={<EditTeamMember />} />
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
