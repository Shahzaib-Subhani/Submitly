import { Navigate, Route, Routes } from "react-router-dom";
import MainLayout from "../components/layout/MainLayout";
import NotFound from "../pages/NotFound";
import adminRoutes from "./adminRoutes";
import teamRoutes from "./teamRoutes";
import evaluatorRoutes from "./evaluatorRoutes";
import authRoutes from "./authRoutes";




const renderNestedRoutes = (routes) =>
  routes.map(({ path, component: Component }) => <Route key={path} path={path} element={<Component />} />);

export default function AppRoutes() {
  return (
    <Routes>
      <Route path="/" element={<Navigate to={"admin"} />} />
      {authRoutes.map(({ path, element }) => (
        <Route key={path} path={path} element={element} />
      ))}

      <Route path="admin" element={<MainLayout />}>
        <Route index element={<Navigate to={"dashboard"} replace />} />
        {renderNestedRoutes(adminRoutes)}


      </Route>
      <Route path="/team" element={<MainLayout />}>
        <Route index element={<Navigate to={"dashboard"} replace />} />
        {renderNestedRoutes(teamRoutes)}

      </Route>
      <Route path="/evaluator" element={<MainLayout />}>
        <Route index element={<Navigate to={"dashboard"} replace />} />
        {renderNestedRoutes(evaluatorRoutes)}

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
