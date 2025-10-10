import React, { useEffect, useState } from 'react';
import ComponentCard from '../../../components/layout/ComponentCard';
import usePageTitle from '../../../hooks/usePageTitle';
import { fetchTeamDetails } from '../../../services/adminService';
import toast from 'react-hot-toast';
import { useParams } from 'react-router-dom';
import Spinner from '../../../components/layout/Spinner';

const ViewTeam = () => {
    const pageTitle = usePageTitle();
    const [dataLoading, setDataLoading] = useState(true);
    const [team, setTeam] = useState(true);
    const { teamID } = useParams();

    useEffect(() => {
        const fetchTeam = async () => {
            try {
                const response = await fetchTeamDetails(teamID);
                if (response?.data) {
                    const data = response.data;
                    setTeam(data);

                }
            } catch (error) {
                toast.error({ main: error.message });
            } finally {
                setDataLoading(false);
            }
        };
        fetchTeam();
    }, [teamID]);
    if (dataLoading) return <Spinner />;
    return (
        <ComponentCard title={pageTitle}>
            <div className="p-5 border border-gray-200 rounded-2xl  lg:p-6">
                <div className="">
                    <div className="space-y-4">
                        {/* Team Info */}
                        <div className='grid grid-cols-3'>
                            <div>
                                <p className="mb-1 text-sm text-gray-500">Team Name</p>
                                <p className="text-md font-medium text-gray-800">{team.teamName}</p>
                            </div>
                            <div>
                                <p className="mb-1 text-sm text-gray-500">Leader</p>
                                <p className="text-md font-medium text-gray-800">{team.leaderName}</p>
                            </div>
                            <div>
                                <p className="mb-1 text-sm text-gray-500">Email</p>
                                <p className="text-md font-medium text-gray-800">{team.email}</p>
                            </div>
                        </div>

                        {/* Members */}
                        <div className='mt-10 w-full'>
                            <p className="mb-2 text-sm text-gray-500">Team Members</p>
                            <ul className="space-y-2">
                                {team.members.map((member) => (
                                    <li
                                        key={member.teamMemberID}
                                        className="flex justify-between items-center rounded-md border border-gray-400/80 p-3"
                                    >
                                        <div>
                                            <p className="text-md font-medium text-gray-800">
                                                {member.name}
                                            </p>
                                            <p className="text-sm text-gray-500">{member.role}</p>
                                        </div>
                                        <p className="text-sm text-gray-600">{member.email}</p>
                                    </li>
                                ))}
                            </ul>
                        </div>
                    </div>
                </div>
            </div>
        </ComponentCard>
    );
}

export default ViewTeam;
