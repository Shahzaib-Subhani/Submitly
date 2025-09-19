import React from 'react';
import ComponentCard from '../../../components/layout/ComponentCard';
import usePageTitle from '../../../hooks/usePageTitle';

const team = {
    teamID: 101,
    teamName: "Black Team",
    leaderName: "Alice Johnson",
    email: "blackteam@example.com",
    password: "hashed_password_here", // usually hidden, but included for schema completeness
    members: [
        {
            memberID: 1,
            teamID: 101,
            name: "Bob Smith",
            email: "bob@example.com",
            role: "Frontend Developer",
        },
        {
            memberID: 2,
            teamID: 101,
            name: "Charlie Brown",
            email: "charlie@example.com",
            role: "Backend Developer",
        },
        {
            memberID: 3,
            teamID: 101,
            name: "Diana Prince",
            email: "diana@example.com",
            role: "UI/UX Designer",
        },
    ],
};
const ViewTeam = () => {
    const pageTitle = usePageTitle();
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
                                        key={member.memberID}
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
