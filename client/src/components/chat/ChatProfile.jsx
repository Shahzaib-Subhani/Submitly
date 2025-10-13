import React from 'react';

const ChatProfile = ({ name, role, lastMessage, handleSelect, selected }) => {
    return (
        <div className={`flex cursor-pointer items-center gap-3 rounded-lg p-3 ${selected ? "bg-gray-100" : "hover:bg-gray-100"}`} onClick={handleSelect}>
            <div className="w-full">
                <div className="flex items-start justify-between">
                    <div>
                        <h5 className="text-sm font-medium text-gray-800">{name}</h5>
                        <p className="mt-0.5 text-xs text-gray-500">{role}</p>
                    </div>
                    <span className="text-gray-400 text-xs">{lastMessage}</span>
                </div>
            </div>
        </div>
    );
}

export default ChatProfile;
