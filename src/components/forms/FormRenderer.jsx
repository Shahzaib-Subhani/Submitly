import Form from '../../components/forms/Form';
import Input from '../../components/forms/Input';
import Button from '../../components/forms/Button';
import InputPassword from '../../components/forms/InputPassword';
import TextArea from './TextArea';


const FormRenderer = ({ title, formFields, handleSubmit, handleChange, formData, errors, loading, col = 3 }) => {
    const colClasses = {
        1: "md:grid-cols-1",
        2: "md:grid-cols-2",
        3: "md:grid-cols-3",
        4: "md:grid-cols-4",
    };
    return (
        <>
            <Form>
                <div className=' rounded-xl p-6 space-y-6 border border-gray-200'>
                    {title && <h4 className="text-lg font-semibold text-gray-800 lg:mb-6">{title}</h4>}

                    <div className={`grid grid-cols-1 gap-4 ${colClasses[col] || "md:grid-cols-1"}`}>
                        {formFields.map(({ label, name, type }) => (
                            type === "password"
                                ? <InputPassword
                                    key={name}
                                    label={label}
                                    name={name}
                                    value={formData[name]}
                                    onChange={handleChange}
                                    error={errors[name]}
                                />
                                :
                                type === "textarea" ?
                                    <TextArea
                                        key={name}
                                        label={label}
                                        name={name}
                                        value={formData[name]}
                                        onChange={handleChange}
                                        error={errors[name]}
                                        rows={5}
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
