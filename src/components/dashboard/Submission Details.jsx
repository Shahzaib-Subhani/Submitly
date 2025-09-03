import React from 'react';
import { Link } from 'react-router-dom';
const labels = {
    teamID: "Team",
    teamName: "Team Name",
    leaderName: "Leader Name",
    topic: "Topic",
    videoURL: "Video Link",
    description: "Description",
    learningOutcomes: "Learning Outcomes",
    status: "Status",
    isFinal: "Final Submission",
    lastUpdated: "Last Updated"
};

const submission = {
    submissionID: 1,
    teamID: 101,
    teamName: "Team no.1 ",
    leaderName: "Leader no 1",
    topic: "AI in Education",
    videoURL: "https://example.com/video.mp4",
    learningOutcomes: "Improved adaptability, automated grading, personalized content delivery.",
    status: "Submitted",
    isFinal: true,
    lastUpdated: "03-12-2024 10:30 AM",
    description: "A project exploring how AI can improve personalized learning.",
};
const SubmissionDetails = ({isTitle}) => {
    return (
        <div className="p-5 border border-gray-200 rounded-2xl  lg:p-6">
            <div className="flex flex-col gap-6 lg:flex-row lg:items-start lg:justify-between">
                <div>
                    {isTitle && <h4 className="text-lg font-semibold text-gray-800 lg:mb-6">
                        Submission Details
                    </h4>}

                    <div className="grid grid-cols-1 gap-4 lg:grid-cols-3 lg:gap-7 2xl:gap-x-32">

                        {Object.entries(labels).map(([key, label]) => (
                            <div key={key}>
                                <p className="mb-1 text-sm leading-normal text-gray-500">{label}</p>
                                <p className="text-md font-medium text-gray-800">
                                    {key === "videoURL" ? <VideoLink path={submission[key]} /> : submission[key]}
                                </p>
                            </div>
                        ))}


                    </div>
                </div>

            </div>
        </div>
    );
}

const VideoLink = ({ path }) => {
    return (
        <Link className='inline-flex items-center shadow-sm px-2.5 py-0.5 justify-center gap-1 rounded-lg font-medium bg-indigo-100 text-indigo-500' to={path} target='_blank' title={path}>Visit Link</Link>
    );
}

export default SubmissionDetails;
