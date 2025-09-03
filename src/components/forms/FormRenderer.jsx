import Form from '../../components/forms/Form';
import Input from '../../components/forms/Input';
import Button from '../../components/forms/Button';
import InputPassword from '../../components/forms/InputPassword';
import Notification from '../layout/Notification';

const FormRenderer = ({ formFields, handleSubmit, handleChange, formData, errors, loading }) => {

    return (
        <>
            <Form>
                <div className=' rounded-xl p-6 space-y-6 border border-gray-200'>


                    <div className='grid grid-cols-1 gap-4 md:grid-cols-3'>
                        {formFields.map(({ label, name, type }) => (
                            type === "password"
                                ? <InputPassword
                                    key={name}
                                    label={label}
                                    name={name}
                                    type="password"
                                    value={formData[name]}
                                    onChange={handleChange}
                                    error={errors[name]}
                                />
                                : <Input
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
                    <div className='flex justify-center '>

                        <div className='ms-4 md:w-50 w-full'>
                            <Button type={"button"} className={"mt-8 w-full"} onClick={handleSubmit} isLoading={loading} label={"submit"} />
                        </div>
                    </div>
                </div>
            </Form>
        </>
    );
}

export default FormRenderer;
