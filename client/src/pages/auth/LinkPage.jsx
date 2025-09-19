
import LinkButton from '../../components/forms/LinkButton';
import ComponentCard from '../../components/layout/ComponentCard';
import usePageTitle from '../../hooks/usePageTitle';

const authRoutes = [
    { path: "/evaluator-signin", title: "Evaluator Sign-In" },
    { path: "/evaluator-register", title: "Evaluator Register" },
    { path: "/team-register", title: "Team Register" },
    { path: "/team-signin", title: "Team Login" },
    { path: "/admin-signin", title: "Admin Login" },
    { path: "/forgot-password", title: "Forgot Password" },
    { path: "/otp-verification", title: "OTP Verification" },
    { path: "/reset-password", title: "Reset Password" },
];
const LinkPage = () => {
    const pageTitle = usePageTitle();

    return (
        <>
            <ComponentCard title={pageTitle}>
                <div className='flex gap-3 justify-center-safe'>
                    {authRoutes.map(({ path, title }) =>
                        <LinkButton variant='light' color='light' path={path}>{title}</LinkButton>)
                    }

                </div>
            </ComponentCard>
        </>


    );
}
export default LinkPage;
