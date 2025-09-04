import { Send } from 'lucide-react';
import React from 'react';
import SentMessage from './SentMessage';
import ReceivedMessage from './ReceivedMessage';
const chatMessages = [
    {
        type: "received",
        message: "I want to make an appointment tomorrow from 2:00 to 5:00pm?",
        time: "3:31 PM",
        sender: "Kaiya George"
    },
    {
        type: "sent",
        message: "If don’t like something, I’ll stay away from it.",
        time: "3:35 PM",
        sender: "You"
    },
    {
        type: "received",
        message: "I want more detailed information.",
        time: "3:40 PM",
        sender: "Lindsey Curtis"
    },
    {
        type: "sent",
        message: "They got there early, and got really good seats.",
        time: "3:45 PM",
        sender: "You"
    },
    {
        type: "received",
        message: "Please preview the image",
        time: "3:50 PM",
        sender: "Lindsey Curtis"
    }
];

const ChatScreen = ({name, type = "user"}) => {
    const width = {
        admin: "xl:w-3/4",
        user: ""
    }
    return (
        <div className={`flex h-full flex-col overflow-hidden rounded-2xl border border-gray-200 bg-white ${width[type]}`}>
            <div className="sticky flex items-center justify-between px-5 py-4 border-b border-gray-200 xl:px-6">
                <div className="flex items-center gap-3">
                    <h5 className="text-md font-medium text-gray-800">{name}</h5>
                </div>
            </div>

            <div className="flex-1 max-h-full p-5 space-y-6 overflow-auto custom-scrollbar xl:space-y-8 xl:p-6">


                {chatMessages.map((msg, index) =>
                    msg.type === "received" ? (
                        <ReceivedMessage key={index} message={msg.message} time={msg.time} />
                    ) : (
                        <SentMessage key={index} message={msg.message} time={msg.time} />
                    )
                )}
            </div>

            <div className="sticky bottom-0 p-3 border-t border-gray-200">
                <form className="flex items-center justify-between">
                    <div className="relative w-full">

                        <input
                            placeholder="Type a message"
                            className="w-full pl-12 pr-5 text-sm text-gray-800 bg-transparent border-none outline-hidden h-9 placeholder:text-gray-400 focus:border-0 focus:ring-0"
                            type="text"
                        />
                    </div>
                    <div className="flex items-center">


                        <button className="flex items-center justify-center ml-3 text-white rounded-lg h-9 w-9 bg-indigo-500 hover:bg-indigo-600 xl:ml-5">
                            <Send size={20} />
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
}

export default ChatScreen;
