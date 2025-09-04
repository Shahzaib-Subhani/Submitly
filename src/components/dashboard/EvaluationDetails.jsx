import React from 'react';

const EvaluationDetails = ({criteria, total, title}) => {
    return (
        <div className=' rounded-xl p-6 space-y-6 border border-gray-200'>
            {title && <h4 className="text-lg font-semibold text-gray-800 lg:mb-6">{title}</h4>}

            <div>
                <table className="min-w-full border border-gray-300 border-collapse rounded-lg overflow-hidden text-gray-800">
                    <thead className="bg-gray-100 ">
                        <tr>
                            <th className=" px-4 py-2 border border-gray-300">Sr. No.</th>
                            <th className=" px-4 py-2 border border-gray-300">Criteria</th>
                            <th className=" px-4 py-2 border border-gray-300">Score</th>
                        </tr>
                    </thead>
                    <tbody>
                        {criteria.map((item) => (
                            <tr key={item.srNo} className="text-center">
                                <td className="px-4 py-2 border border-gray-300">{item.srNo}</td>
                                <td className="px-4 py-2 border border-gray-300 text-left">{item.label}</td>
                                <td className="px-4 py-2 border border-gray-300">{item.score}</td>
                               
                            </tr>
                        ))}
                        <tr className="font-bold bg-gray-50">
                            <td className="px-4 py-2 border border-gray-300 text-center" >
                                Total
                            </td>
                            <td className="px-4 py-2 border border-gray-300 text-center">100</td>
                            <td className="px-4 py-2 border border-gray-300 text-center">{total}</td>
                        </tr>
                    </tbody>
                </table>

            </div>

        </div>
    );
}

export default EvaluationDetails;
