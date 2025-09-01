
import usePageTitle from '../../hooks/usePageTitle';
import ComponentCard from '../../components/layout/ComponentCard';
import Form from '../../components/forms/Form';
import Input from '../../components/forms/Input';
import Button from '../../components/forms/Button';


const EditUser = () => {
    const pageTitle = usePageTitle();
    return (
        <ComponentCard title={pageTitle}>
            <Form title={"User Details : "}>
                <div className=' rounded-xl p-6 space-y-6 border border-gray-200'>


                    <div className='grid grid-cols-1 gap-4 md:grid-cols-4'>
                        <Input label="Team Name" name="teamName" type="text" />
                        <Input label="Leader Name" name="leaderName" type="text" />
                        <Input label="Email" name="email" type="email" />

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
                </div>
            </Form>
        </ComponentCard>
    );
}

export default EditUser;
