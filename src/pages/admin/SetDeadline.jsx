import React, { useState } from 'react'
import ComponentCard from '../../components/layout/ComponentCard';
import usePageTitle from '../../hooks/usePageTitle';
import Form from '../../components/forms/Form';
import Datepicker from '../../components/forms/Datepicker';
import Button from '../../components/forms/Button';
import useForm from '../../hooks/useForm';
import { setDeadlineSchema } from '../../validations/adminSchemas';

const SetDeadline = () => {
    const pageTitle = usePageTitle();
    const { formData, errors, handleChange, handleSubmit } = useForm(
        setDeadlineSchema,
        {
            date: "",
        }
    );
    return (
        <>
            <ComponentCard title={pageTitle}>
                <Form>
                    <div className=''>
                        <Datepicker id="date-picker"
                            label="Date Picker Input"
                            placeholder="Select a date"
                            value={formData.date}
                            onChange={(selectedDates, dateStr) =>
                                handleChange({ target: { name: "date", value: dateStr } })
                            }
                            error={errors.date}
                        />
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
        </>
    );
}

export default SetDeadline;
