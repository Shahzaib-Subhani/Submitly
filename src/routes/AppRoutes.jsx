import { Route, Routes } from "react-router-dom";
import EvaluatorRegister from "../pages/EvaluatorRegister";
import EvaluatorSignIn from "../pages/EvaluatorSignIn";
import TeamLogin from "../pages/TeamLogin";
import TeamRegister from "../pages/TeamRegister";

export default function AppRoutes() {
  return (
    <Routes>
      <Route path="/evaluator-login" element={<EvaluatorSignIn />} />
      <Route path="/evaluator-register" element={<EvaluatorRegister />} />
      <Route path="/team-register" element={<TeamRegister />} />
      <Route path="/team-login" element={<TeamLogin />} />

      {/* Catch-all for 404 */}
      <Route
        path="*"
        element={<h1 className="text-center mt-20">404 Page Not Found</h1>}
      />
    </Routes>
  );
}
