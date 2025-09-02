
import ComponentCard from '../../components/layout/ComponentCard';
import usePageTitle from '../../hooks/usePageTitle';
import useForm from '../../hooks/useForm';
import { EditMemberSchema } from '../../validations/adminSchemas';
import FormRenderer from '../../components/forms/FormRenderer';

const formFields = [
    { label: "Member Name", name: "memberName", type: "text" },
    { label: "Member Email", name: "memberEmail", type: "email" },
    { label: "Role", name: "memberRole", type: "email" },
];
const EditMembers = () => {
    const pageTitle = usePageTitle();
    const { formData, errors, handleChange, handleSubmit } = useForm(
        EditMemberSchema,
        {
            memberName: "",
            memberEmail: "",
            memberRole: "",
        }
    );
    return (
        <ComponentCard title={pageTitle}>
            <FormRenderer
                formFields={formFields}
                handleChange={handleChange}
                handleSubmit={handleSubmit}
                formData={formData}
                errors={errors}
            />
        </ComponentCard>
    );
}

export default EditMembers;
