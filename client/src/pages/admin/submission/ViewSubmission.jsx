import React, { useEffect, useState } from 'react';
import ComponentCard from '../../../components/layout/ComponentCard';
import usePageTitle from '../../../hooks/usePageTitle';
import DetailsCard from '../../../components/dashboard/DetailsCard';
import { useParams } from 'react-router-dom';
import Spinner from '../../../components/layout/Spinner';
import { fetchSubmissionDetails } from '../../../services/adminService';
import { formattedDate } from '../../../services/evaluatorService';
import toast from 'react-hot-toast';
const labels = {
    teamID: "Team",
    teamName: "Team Name",
    leaderName: "Leader Name",
    topic: "Topic",
    videoURL: "Video Link",
    description: "Description",
    learningOutcomes: "Learning Outcomes",
    status: "Status",
    lastUpdated: "Last Updated"
};

const ViewSubmission = () => {
    const pageTitle = usePageTitle();
    const [dataLoading, setDataLoading] = useState(true);
    const [submission, setSubmission] = useState(true);
    const { submissionID } = useParams();
    useEffect(() => {
        const fetchSubmission = async () => {
            try {
                const response = await fetchSubmissionDetails(submissionID);
                if (response?.data) {
                    const data = response.data;
                    setSubmission({
                        submissionID: data.submissionID,
                        teamID: data.teamID.teamID,
                        teamName: data.teamID.teamName,
                        leaderName: data.teamID.leaderName,
                        topic: data.topic,
                        videoURL: data.videoURL,
                        learningOutcomes: data.learningOutcomes,
                        status: data.status,
                        lastUpdated: formattedDate(data.updatedAt),
                        description: data.description,
                    });

                }
            } catch (error) {
                toast.error({ main: error.message });
            } finally {
                setDataLoading(false);
            }
        };
        fetchSubmission();
    }, [submissionID]);
    if (dataLoading) return <Spinner />;
    return (
        <>
            <ComponentCard title={pageTitle}>
                <DetailsCard labels={labels} title={"Submission Details"} data={submission} />
            </ComponentCard>
        </>
    );
}

export default ViewSubmission;
