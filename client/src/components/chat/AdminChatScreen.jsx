import { Send } from 'lucide-react';
import React from 'react';
import SentMessage from './SentMessage';
import ReceivedMessage from './ReceivedMessage';
import { useState } from 'react';
import { formatTime, getSocket, sendMessage } from '../../services/chatService';
import { useEffect } from 'react';


const AdminChatScreen = ({ selectedUser, onClose }) => {
    const [message, setMessage] = useState("");
    const [chatMessages, setChatMessages] = useState([]);
    const roomId = selectedUser.roomId;

    useEffect(() => {
        const socket = getSocket();
        if (!selectedUser) return;
        // Admin joins that user's room
        socket.emit("adminJoinUserRoom", { roomId });

        // Listen for messages in that room only
        const handleReceiveMessage = ({ roomId: msgRoomId, message: msg, from }) => {
            if (msgRoomId === roomId && from.type !== "admin") {
                setChatMessages(prev => [
                    ...prev,
                    { message: msg, type: "received", time: formatTime() }
                ]);
            }
        };

        socket.on("receiveMessage", handleReceiveMessage);

        return () => socket.off("receiveMessage", handleReceiveMessage);
    }, [roomId]);

    const handleSendMessage = () => {
        if (!message.trim()) return;

        const socket = getSocket();
        const time = formatTime();

        // Emit message to that specific room
        socket.emit("sendMessageToRoom", {
            roomId,
            message,
            from: { id: "admin", type: "admin" },
        });

        setChatMessages((prev) => [...prev, { message, type: "sent", time }]);
        setMessage("");
    };

    const handleCloseChat = () => {
        const socket = getSocket();
        socket.emit("adminLeftUserRoom", { roomId });
        onClose();
    };


    return (
        <div className={`flex h-full flex-col overflow-hidden rounded-2xl border border-gray-200 bg-white xl:w-3/4`}>
            <div className="sticky flex items-center justify-between px-5 py-4 border-b border-gray-200 xl:px-6">
                <div className="flex items-center gap-3">
                    <h5 className="text-md font-medium text-gray-800">{`${selectedUser.userType} : ${selectedUser.userName} [${selectedUser.id}]`}</h5>
                </div>
                <button
                    onClick={handleCloseChat}
                    className="px-3 py-1 text-sm font-medium text-white bg-red-700 rounded hover:bg-red-800 transition"
                >
                    Close Chat
                </button>
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
                <form className="flex items-center justify-between" onSubmit={(e) => {
                    e.preventDefault();
                }}>
                    <div className="relative w-full">

                        <input
                            placeholder="Type a message"
                            className="w-full pl-12 pr-5 text-sm text-gray-800 bg-transparent border-none outline-hidden h-9 placeholder:text-gray-400 focus:border-0 focus:ring-0"
                            type="text"
                            value={message}
                            onChange={(e) => setMessage(e.target.value)}
                            onKeyDown={(e) => e.key === "Enter" && handleSendMessage()}
                        />
                    </div>
                    <div className="flex items-center">


                        <button className="flex items-center justify-center ml-3 text-white rounded-lg h-9 w-9 bg-indigo-500 hover:bg-indigo-600 xl:ml-5"
                            type='button'
                            onClick={handleSendMessage}
                        >
                            <Send size={20} />
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
}

export default AdminChatScreen;
