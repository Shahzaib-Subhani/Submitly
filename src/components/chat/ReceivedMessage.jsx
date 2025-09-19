import React from 'react';

const ReceivedMessage = ({message, time}) => {
    return (
        <div className="flex items-start gap-4">

            <div>
                <div className="px-3 py-2 rounded-lg bg-gray-100 text-gray-800 rounded-tl-sm">
                    <p className="text-sm">
                       {message}
                    </p>
                </div>
                <p className="mt-2 text-gray-500 text-xs">{time}</p>
            </div>
        </div>
    );
}

export default ReceivedMessage;
