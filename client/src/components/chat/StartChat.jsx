import { useState } from "react";

const StartChat = ({ handleChat }) => {
     const [started, setStarted] = useState(false);

    const handleStartChat = () => {
        if (started) return;
        setStarted(true);
        handleChat();
    };
    return (
        <div
            className={`flex h-80 flex-col items-center justify-center overflow-hidden rounded-2xl border border-gray-200 bg-white`}
        >
            <div className="text-center">
                <button onClick={handleStartChat} disabled={started} className="px-6 py-2 text-white bg-indigo-500 rounded-lg hover:bg-indigo-600 cursor-pointer">
                    Start Chat
                </button>
                <p className="mt-3 text-sm text-gray-500">
                    Click to start a chat with our support team.
                </p>
            </div>
        </div>

    );
}

export default StartChat;
