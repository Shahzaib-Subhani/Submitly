import React from 'react'
import ComponentCard from '../../components/layout/ComponentCard';
import usePageTitle from '../../hooks/usePageTitle';

const SetDeadline = () => {
    const pageTitle = usePageTitle();
    return (
        <>
            <ComponentCard title={pageTitle}>

            </ComponentCard>
        </>
    );
}

export default SetDeadline;
