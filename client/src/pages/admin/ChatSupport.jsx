import React from 'react';
import ChatList from '../../components/chat/ChatList'
import { Send } from 'lucide-react';
import usePageTitle from '../../hooks/usePageTitle';
import ComponentCard from '../../components/layout/ComponentCard';
import { useState } from 'react';
import { getSocket, joinAdminRoom } from '../../services/chatService';
import { useEffect } from 'react';
import AdminChatScreen from '../../components/chat/AdminChatScreen';


const ChatSupport = () => {
    const pageTitle = usePageTitle();
    const [activeUsers, setActiveUsers] = useState([]);
    const [selectedUser, setSelectedUser] = useState(null);

    useEffect(() => {
        const socket = getSocket();
        joinAdminRoom();
        const handleActiveUsers = (users) => setActiveUsers(users || []);
        socket.on("activeUsers", handleActiveUsers);

        return () => socket.off("activeUsers", handleActiveUsers);
    }, []);

    const handleSelectUser = (user) => {
        setSelectedUser(user);
    };

    return (
        <>
            <ComponentCard title={pageTitle}>
                <div className="h-[calc(100vh-255px)] overflow-hidden sm:h-[calc(100vh-280px)]">
                    <div className="flex flex-col h-full gap-6 xl:flex-row xl:gap-5">


                        <ChatList activeUsers={activeUsers} handleSelectUser={handleSelectUser} selectedUser={selectedUser} />
                        {
                            selectedUser
                                ? <AdminChatScreen selectedUser={selectedUser}
                                    onClose={() => setSelectedUser(null)} />
                                : null
                        }

                    </div>
                </div>
            </ComponentCard>
        </>


    );
}

export default ChatSupport;
