import React from 'react';

const TeamEvaluation = ({
    title,
    evaluation,
    total,
}) => {
    return (
        <>
            <div className=' rounded-xl p-6 space-y-6 border border-gray-200'>
                {title && <h4 className="text-lg font-semibold text-gray-800 lg:mb-6">{title}</h4>}

                <div className='overflow-x-auto'>
                    <table className="min-w-full border border-gray-300 border-collapse rounded-lg overflow-hidden text-gray-800">
                        <thead className="bg-gray-100 ">
                            <tr>
                                <th className="w-10 px-4 py-2 border border-gray-300">Sr. No.</th>
                                <th className="w-2/6 px-4 py-2 border border-gray-300">Criteria</th>
                                <th className="w-10 px-4 py-2 border border-gray-300">Max. Score</th>
                                <th className="w-10 px-4 py-2 border border-gray-300">Evaluation 1</th>
                                <th className="w-10 px-4 py-2 border border-gray-300">Evaluation 2</th>
                                <th className="w-10 px-4 py-2 border border-gray-300">Evaluation 3</th>
                                <th className="w-10 px-4 py-2 border border-gray-300">Average Score </th>
                            </tr>
                        </thead>
                        <tbody>
                            {evaluation.map((item) => (
                                <tr key={item.srNo} className={`text-center ${item.srNo === "total" ? "font-bold bg-gray-100" : ""}`}>
                                    <td className="px-4 py-2 border border-gray-300">{item.srNo}</td>
                                    <td className="px-4 py-2 border border-gray-300 text-left">{item.label}</td>
                                    <td className="px-4 py-2 border border-gray-300">{item.max}</td>
                                    <td className="px-4 py-2 border border-gray-300">{item.scores.evaluator1}</td>
                                    <td className="px-4 py-2 border border-gray-300">{item.scores.evaluator2}</td>
                                    <td className="px-4 py-2 border border-gray-300">{item.scores.evaluator3}</td>
                                    <td className="px-4 py-2 border border-gray-300"> {item.average}</td>
                                </tr>
                            ))}

                        </tbody>
                    </table>


                </div>

            </div>


        </>
    );
}

export default TeamEvaluation;
