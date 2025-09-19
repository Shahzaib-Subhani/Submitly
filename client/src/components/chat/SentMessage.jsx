import React from 'react';

const SentMessage = ({message, time}) => {
    return (
        <div className="flex justify-end">
            <div className="text-right">
                <div className="px-3 py-2 rounded-lg bg-indigo-500 text-white rounded-tr-sm">
                    <p className="text-sm">
                       {message}
                    </p>
                </div>
                <p className="mt-2 text-gray-500 text-xs">{time}</p>
            </div>
        </div>
    );
}

export default SentMessage;
