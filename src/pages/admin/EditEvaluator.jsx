
import usePageTitle from '../../hooks/usePageTitle';
import ComponentCard from '../../components/layout/ComponentCard';
import Form from '../../components/forms/Form';
import Input from '../../components/forms/Input';
import Button from '../../components/forms/Button';

const EditEvaluator = () => {
    const pageTitle = usePageTitle();
    return (
        <ComponentCard title={pageTitle}>
            <Form title={"User Details : "}>

                <div className='grid grid-cols-1 gap-4 md:grid-cols-4'>
                    <Input label="Name" name="name" type="text" />
                    <Input label="Email" name="email" type="email" />
                    <Input label="Qualification" name="qualification" type="text" />
                    <Input label="Experience" name="experience" type="text" />




                </div>
                <div className='grid grid-cols-1 gap-4 md:grid-cols-4'>
                    <Input label="Password" name="password" type="password" />
                    <Input
                        label="Confirm Password"
                        name="confirmPassword"
                        type="password"
                    />
                </div>
                <div className='flex justify-end'>

                    <div className='ms-4'>
                        <Button type={"button"} className={"mt-8"}>
                            Submit
                        </Button>
                    </div>
                </div>
                {/* <hr className='text-gray-300 py-1 my-10' />
                    <div className='grid grid-cols-1 gap-4 md:grid-cols-3'>
                        <Input label="Member Name" name="memberName" type="text" />
                        <Input label="Member Email" name="email" type="email" />
                        <Input label="Role" name="memberRole" type="text" />
                    </div> */}
            </Form>
        </ComponentCard>
    );
}

export default EditEvaluator;
