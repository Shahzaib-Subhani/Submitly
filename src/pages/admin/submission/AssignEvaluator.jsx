import React from 'react';
import usePageTitle from '../../../hooks/usePageTitle';
import ComponentCard from '../../../components/layout/ComponentCard';
import FormRenderer from '../../../components/forms/FormRenderer';
import useForm from '../../../hooks/useForm';
import { AssignEvaluatorSchema } from '../../../validations/adminSchemas';
import SubmissionDetails from '../../../components/dashboard/Submission Details';
const formFields = [
    { label: "Evaluator no. 1", name: "evaluator1", type: "text" },
    { label: "Evaluator no. 2", name: "evaluator2", type: "text" },
    { label: "Evaluator no. 3", name: "evaluator3", type: "text" },
];


const AssignEvaluator = () => {
    const pageTitle = usePageTitle();
    const { formData, errors, handleChange, handleSubmit, loading } = useForm(
        AssignEvaluatorSchema,
        {
            evaluator1: "",
            evaluator2: "",
            evaluator3: "",
        }
    );
    return (
        <>
            <ComponentCard title={pageTitle}>
                <SubmissionDetails />
                <FormRenderer
                    title={"Choose Evaluator"}
                    formFields={formFields}
                    handleChange={handleChange}
                    handleSubmit={handleSubmit}
                    formData={formData}
                    errors={errors}
                    loading={loading}
                />
            </ComponentCard>
        </>
    );
}

export default AssignEvaluator;
