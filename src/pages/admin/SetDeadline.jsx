import React from 'react'
import ComponentCard from '../../components/layout/ComponentCard';
import usePageTitle from '../../hooks/usePageTitle';
import Form from '../../components/forms/Form';
import Input from '../../components/forms/Input';
import Datepicker from '../../components/forms/Datepicker';
import Button from '../../components/forms/Button';

const SetDeadline = () => {
    const pageTitle = usePageTitle();
    return (
        <>
            <ComponentCard title={pageTitle}>
                <Form>
                    <div className=''>
                        <Datepicker id="date-picker"
                            label="Date Picker Input"
                            placeholder="Select a date" />
                    </div>
                    <div className='flex justify-end'>
                        <div className='ms-4'>
                            <Button type={"button"} className={"mt-8"}>
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
