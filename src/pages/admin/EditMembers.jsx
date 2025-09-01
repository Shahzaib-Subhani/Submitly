import React from 'react';
import ComponentCard from '../../components/layout/ComponentCard';
import usePageTitle from '../../hooks/usePageTitle';
import Form from '../../components/forms/Form';
import Input from '../../components/forms/Input';
import Button from '../../components/forms/Button';

const EditMembers = () => {
    const pageTitle = usePageTitle();

    return (
        <ComponentCard title={pageTitle}>
            <Form title={"Team Member Details : "}>
            <div>
                
            </div>

                <div className='grid grid-cols-1 gap-4 md:grid-cols-4'>
                    <Input label="Member Name" name="memberName" type="text" />
                    <Input label="Member Email" name="email" type="email" />
                    <Input label="Role" name="memberRole" type="text" />
                </div>
                <div className='grid grid-cols-1 gap-4 md:grid-cols-4'>
                    <Input label="Member Name" name="memberName" type="text" />
                    <Input label="Member Email" name="email" type="email" />
                    <Input label="Role" name="memberRole" type="text" />
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
    );
}

export default EditMembers;
