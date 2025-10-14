import { Send } from 'lucide-react';
import SentMessage from './SentMessage';
import ReceivedMessage from './ReceivedMessage';
import { useCallback, useState } from 'react';
import { formatTime, getSocket } from '../../services/chatService';
import { useEffect } from 'react';

const ChatScreen = ({ name, user }) => {
    const [message, setMessage] = useState("");
    const [chatMessages, setChatMessages] = useState([]);
    const [adminJoined, setAdminJoined] = useState(false);

    const roomId = `${user.role}_${user.id}`;
    const socket = getSocket();

    const addSystemMessage = useCallback((text) => {
        setChatMessages((prev) => [
            ...prev,
            { message: text, type: "system", time: formatTime() },
        ]);
    }, []);

    const addChatMessage = useCallback((msg, type) => {
        setChatMessages((prev) => [
            ...prev,
            { message: msg, type, time: formatTime() },
        ]);
    }, []);

    useEffect(() => {

        socket.emit("joinUserRoom", {
            userId: user.id,
            userType: user.role,
            userName: user.name,
            id: user.userID
        });

        const events = {
            adminJoined: ({ roomId: id }) => {
                if (id !== roomId) return;
                setAdminJoined(true);
                addSystemMessage("🟢 Admin has joined the chat.");
            },
            adminLeft: ({ roomId: id }) => {
                if (id !== roomId) return;
                setAdminJoined(false);
                addSystemMessage("🔴 Admin has left the chat.");
            },
            receiveMessage: ({ roomId: id, message, from }) => {
                if (id === roomId && from.type === "admin") {
                    addChatMessage(message, "received");
                }
            },
        };

        Object.entries(events).forEach(([event, handler]) =>
            socket.on(event, handler)
        );

        return () =>
            Object.entries(events).forEach(([event, handler]) =>
                socket.off(event, handler)
            );
    }, [socket, roomId, user, addSystemMessage, addChatMessage]);

    const handleSendMessage = () => {

        if (!message.trim()) return;
        const socket = getSocket();

        socket.emit("sendMessageToRoom", {
            roomId,
            message,
            from: { id: user.id, type: user.role },
        });

        addChatMessage(message, "sent");
        setMessage("");
    };

    return (
        <div className={`flex h-full flex-col overflow-hidden rounded-2xl border border-gray-200 bg-white `}>
            <div className="sticky flex items-center justify-between px-5 py-4 border-b border-gray-200 xl:px-6">
                <div className="flex items-center gap-3">
                    <h5 className="text-md font-medium text-gray-800">{name}</h5>
                </div>
            </div>

            <div className="flex-1 max-h-full p-5 space-y-6 overflow-auto custom-scrollbar xl:space-y-8 xl:p-6">
                {!adminJoined && (
                    <div className="flex justify-center">
                        <div className="bg-yellow-50 text-yellow-800 px-4 py-2 rounded-full text-sm font-medium shadow-sm">
                            💬 Please wait until the admin joins this chat...
                        </div>
                    </div>
                )}

                {chatMessages.map((msg, index) => {
                    if (msg.type === "received") {
                        return <ReceivedMessage key={index} message={msg.message} time={msg.time} />;
                    } else if (msg.type === "sent") {
                        return <SentMessage key={index} message={msg.message} time={msg.time} />;
                    } else if (msg.type === "system") {
                        return (
                            <div
                                key={index}
                                className="flex justify-center text-gray-600 text-xs italic my-2"
                            >
                                {msg.message} <span className="ml-2 text-gray-400">{msg.time}</span>
                            </div>
                        );
                    }
                })}


            </div>

            <div className="sticky bottom-0 p-3 border-t border-gray-200">
                <form className="flex items-center justify-between" onSubmit={(e) => {
                    e.preventDefault();
                }} >
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

export default ChatScreen;
