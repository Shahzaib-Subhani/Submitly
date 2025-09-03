import React from 'react';
import SubmissionDetails from '../../../components/dashboard/Submission Details';
import ComponentCard from '../../../components/layout/ComponentCard';
import usePageTitle from '../../../hooks/usePageTitle';

const ViewSubmission = () => {
     const pageTitle = usePageTitle();
    return (
        <>
            <ComponentCard title={pageTitle}>
                <SubmissionDetails />
            </ComponentCard>
        </>
    );
}

export default ViewSubmission;
