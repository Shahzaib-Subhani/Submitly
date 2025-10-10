import React, { useEffect, useState } from 'react'
import ComponentCard from '../../components/layout/ComponentCard';
import usePageTitle from '../../hooks/usePageTitle';
import Form from '../../components/forms/Form';
import Datepicker from '../../components/forms/Datepicker';
import Button from '../../components/forms/Button';
import useForm from '../../hooks/useForm';
import { setDeadlineSchema } from '../../validations/adminSchemas';
import { getDeadline, setDeadline } from '../../services/adminService';
import toast from 'react-hot-toast';
import Spinner from '../../components/layout/Spinner';

const SetDeadline = () => {
    const pageTitle = usePageTitle();
    const [deadlineID, setDeadlineID] = useState("");
    const [dataLoading, setDataLoading] = useState(true);

    const { formData, errors, handleChange, handleSubmit, loading, setFormData } = useForm(
        setDeadlineSchema,
        {
            deadlineDate: "",
        },
        async (values) => {
            const [day, month, year] = values.deadlineDate.split("-");
            const isoDate = new Date(`${year}-${month}-${day}T00:00:00Z`).toISOString();
            const deadlineData = {
                deadlineType: "submission",
                deadlineDate: isoDate
            }
            const response = await setDeadline(deadlineData);
            const successMsg = {
                main: response?.message || "Deadline updated successfully",
                sub: false
            };
            toast.success(successMsg);
            setFormData((prev) => ({
                ...prev,
                ...values,
            }));
        }
    );

    // Fetch profile data
    useEffect(() => {
        const fetchAdmin = async () => {
            try {
                const response = await getDeadline();
                if (response?.data) {
                    const data = response.data;
                    console.log(data);

                    setFormData({
                        deadlineDate: data.deadlineDate,
                    });
                    setDeadlineID(data._id);
                }
            } catch (error) {
                toast.error({ main: error.message });
            } finally {
                setDataLoading(false);
            }
        };
        fetchAdmin();
    }, [setFormData]);
    if (dataLoading) return <Spinner />;
    return (
        <>
            <ComponentCard title={pageTitle}>
                <Form>
                    <div className=''>
                        <Datepicker id="date-picker"
                            label="Date Picker Input"
                            placeholder="Select a date"
                            value={formData.deadlineDate}
                            onChange={(selectedDates, dateStr) =>
                                handleChange({ target: { name: "deadlineDate", value: dateStr } })
                            }
                            error={errors.date}
                        />
                    </div>
                    <div className='flex justify-center'>
                        <div className='ms-4'>
                            <Button type={"button"} className={"mt-8"} onClick={() => handleSubmit(false)} isLoading={loading}>
                                Submit
                            </Button>
                        </div>
                    </div>
                </Form>
            </ComponentCard>
        </>
    );
}

export default SetDeadline;
