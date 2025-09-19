import ForgotPassword from "../pages/auth/ForgotPassword";
import OTPVerification from "../pages/auth/OTPVerification";
import ResetPassword from "../pages/auth/ResetPassword";
import TeamRegister from "../pages/auth/TeamRegister";
import EvaluatorRegister from "../pages/auth/EvaluatorRegister";
import EvaluatorSignIn from "../pages/auth/EvaluatorSignIn";
import TeamLogin from "../pages/auth/TeamLogin";
import AdminLogin from "../pages/auth/AdminLogin";

const authRoutes = [
    { path: "/evaluator-signin", component: EvaluatorSignIn },
    { path: "/evaluator-register", component: EvaluatorRegister },
    { path: "/team-register", component: TeamRegister },
    { path: "/team-signin", component: TeamLogin },
    { path: "/admin-signin", component: AdminLogin },
    { path: "/forgot-password", component: ForgotPassword },
    { path: "/otp-verification", component: OTPVerification },
    { path: "/reset-password", component: ResetPassword },
];

export default authRoutes;