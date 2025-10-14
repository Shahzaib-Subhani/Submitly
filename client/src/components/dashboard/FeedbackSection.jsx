import React from 'react';

const FeedbackSection = ({ title = "Evaluator Feedbacks", feedbacks = [] }) => {
    return (
        <div className="p-5 border border-gray-200 rounded-2xl  lg:p-6">
            {title && <h4 className="text-lg font-semibold text-gray-800 lg:mb-6">{title}</h4>}
            <div className="grid grid-cols-1 gap-4 md:grid-cols-3">
                {feedbacks.map((fb, idx) => (
                    <FeedbackCard
                        key={idx}
                        evaluator={`Evaluator ${idx + 1}`}
                        feedback={fb.feedback}
                        score={fb.score}
                    />
                ))}
            </div>
        </div>
    );
}

const FeedbackCard = ({ evaluator, feedback, score }) => {
    return (
        <div className="border border-gray-200 rounded-xl p-4 shadow-sm ">
            <div className="flex items-center justify-between mb-2">
                <p className="font-semibold text-gray-800">{evaluator}</p>
                {score !== undefined && (
                    <span className="inline-block px-3 py-1 text-md font-bold text-gray-100 rounded-xl shadow-md 
                  bg-gradient-to-r from-gray-800 to-gray-600">
                        Score: {score}
                    </span>
                )}
            </div>
            <p className="text-gray-700 text-md">{feedback}</p>
        </div>
    );
};

export default FeedbackSection;
