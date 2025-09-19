import FormRenderer from "../../components/forms/FormRenderer";
import ComponentCard from "../../components/layout/ComponentCard";
import useForm from "../../hooks/useForm";
import usePageTitle from "../../hooks/usePageTitle";
import { UpdateTeamProfileSchema } from "../../validations/adminSchemas";
import LinkButton from '../../components/forms/LinkButton';


const formFields = [
    { label: "Team Name", name: "teamName", type: "text" },
    { label: "Leader Name", name: "leaderName", type: "text" },
    { label: "Email", name: "email", type: "email" }
];
const linkButton = {
    variant: "light",
    color: "light",
    title: "Update Password",
    path: "/team/update-password"
}

const TeamProfile = () => {
    const pageTitle = usePageTitle();
    const { formData, errors, handleChange, handleSubmit, loading } = useForm(
        UpdateTeamProfileSchema,
        {
            teamName: "Black Panthers",
            leaderName: "Alex Johnson",
            email: "alex.johnson@example.com"
        }
    );

    return (
        <ComponentCard title={pageTitle}>
            <FormRenderer
                linkButton={linkButton}
                formFields={formFields}
                handleChange={handleChange}
                handleSubmit={handleSubmit}
                formData={formData}
                errors={errors}
                loading={loading}
            />
        </ComponentCard>
    );
}
export default TeamProfile;
