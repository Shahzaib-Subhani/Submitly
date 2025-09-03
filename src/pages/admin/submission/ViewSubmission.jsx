import React from 'react';
import ComponentCard from '../../../components/layout/ComponentCard';
import usePageTitle from '../../../hooks/usePageTitle';
import DetailsCard from '../../../components/dashboard/DetailsCard';
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
const ViewSubmission = () => {
    const pageTitle = usePageTitle();
    return (
        <>
            <ComponentCard title={pageTitle}>
                <DetailsCard labels={labels} data={submission} />
            </ComponentCard>
        </>
    );
}

export default ViewSubmission;
