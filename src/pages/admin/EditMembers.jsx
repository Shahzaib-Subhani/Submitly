import React from 'react';
import ComponentCard from '../../components/layout/ComponentCard';
import usePageTitle from '../../hooks/usePageTitle';
import Form from '../../components/forms/Form';
import Input from '../../components/forms/Input';
import Button from '../../components/forms/Button';
import useForm from '../../hooks/useForm';
import { EditMemberSchema } from '../../validations/adminSchemas';


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

    const textFields = [
        { label: "Member Name", name: "memberName", type: "text" },
        { label: "Member Email", name: "memberEmail", type: "email" },
        { label: "Role", name: "memberRole", type: "email" },
    ];


    return (
        <ComponentCard title={pageTitle}>
            <Form title={"Team Member Details : "}>
                <div>

                </div>

                <div className='grid grid-cols-1 gap-4 md:grid-cols-4'>
                    {textFields.map(({ label, name, type }) => (
                        <Input
                            key={name}
                            label={label}
                            name={name}
                            type={type}
                            value={formData[name]}
                            onChange={handleChange}
                            error={errors[name]}
                        />
                    ))}
                </div>

                <div className='flex justify-end'>

                    <div className='ms-4'>
                        <Button type={"button"} className={"mt-8"} onClick={handleSubmit}>
                            Submit
                        </Button>
                    </div>
                </div>
            </Form>
        </ComponentCard>
    );
}

export default EditMembers;
