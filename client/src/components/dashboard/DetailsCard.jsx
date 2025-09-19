import React from 'react';
import { Link } from 'react-router-dom';

const DetailsCard = ({ title, labels, data }) => {
    return (
        <div className="p-5 border border-gray-200 rounded-2xl  lg:p-6">
            <div className="flex flex-col gap-6 lg:flex-row lg:items-start lg:justify-between">
                <div>
                    {title && <h4 className="text-lg font-semibold text-gray-800 lg:mb-6">
                        {title}
                    </h4>}

                    <div className="grid grid-cols-1 gap-4 lg:grid-cols-3 lg:gap-7 2xl:gap-x-32">

                        {Object.entries(labels).map(([key, label]) => (
                            <div key={key}>
                                <p className="mb-1 text-sm leading-normal text-gray-500">{label}</p>
                                <p className="text-md font-medium text-gray-800">
                                    {key === "videoURL" ? <VideoLink path={data[key]} /> : data[key]}
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

export default DetailsCard;
