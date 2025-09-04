import React from 'react';
import Form from '../forms/Form';
import Button from '../forms/Button';
import Input from '../forms/Input';

const EvaluationForm = ({ title, formFields, handleSubmit, handleChange, formData, errors, loading }) => {

    return (
        <>
            <Form>
                <div className=' rounded-xl p-6 space-y-6 border border-gray-200'>
                    {title && <h4 className="text-lg font-semibold text-gray-800 lg:mb-6">{title}</h4>}

                    <table className="min-w-full border border-gray-300 border-collapse rounded-lg overflow-hidden text-gray-800">
                        <thead className="bg-gray-100 ">
                            <tr>
                                <th className="w-10 px-4 py-2 border border-gray-300">Sr. No.</th>
                                <th className="w-2/6 px-4 py-2 border border-gray-300">Criteria</th>
                                <th className="w-10 px-4 py-2 border border-gray-300">Max. Score</th>
                                <th className="w-32 px-4 py-2 border border-gray-300">Score</th>
                            </tr>
                        </thead>
                        <tbody>
                            {formFields.map((item) => (
                                <tr key={item.srNo} className="text-center">
                                    <td className="px-4 py-2 border border-gray-300">{item.srNo}</td>
                                    <td className="px-4 py-2 border border-gray-300 text-left">{item.label}</td>
                                    <td className="px-4 py-2 border border-gray-300">{item.max}</td>
                                    <td className="px-4 py-2 border border-gray-300">
                                        <Input
                                            name={item.name}
                                            type={item.type}
                                            value={formData[item.name]}
                                            onChange={handleChange}
                                            error={errors[item.name]}
                                            max={item.max}
                                            min={0}
                                        />
                                    </td>
                                </tr>
                            ))}
                            <tr className="font-bold bg-gray-50">
                                <td className="px-4 py-2 border border-gray-300 text-center" colSpan={2}>
                                    Total
                                </td>
                                <td className="px-4 py-2 border border-gray-300 text-center">100</td>
                                <td className="px-4 py-2 border border-gray-300 text-center">{formData.total}</td>
                            </tr>
                        </tbody>
                    </table>

                    <div className='flex justify-center '>

                        <div className='ms-4 md:w-50 w-full'>
                            <Button type={"button"} className={"mt-8 w-full"} onClick={handleSubmit} isLoading={loading} label={"Submit"} />
                        </div>
                    </div>
                </div>

            </Form>
        </>
    );
}

export default EvaluationForm;
