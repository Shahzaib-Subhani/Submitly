import React from 'react';
import ComponentCard from '../../components/layout/ComponentCard';
import usePageTitle from '../../hooks/usePageTitle';
import ChatScreen from '../../components/chat/ChatScreen';
import StartChat from '../../components/chat/StartChat';
import { useState } from 'react';
import { getSocket } from '../../services/chatService';
import { useEffect } from 'react';
import { useAuth } from '../../context/AuthContext';


const Chat = () => {
    const pageTitle = usePageTitle();
    const { user } = useAuth();
    const [chatStarted, setChatStarted] = useState(false);


    const authUser = {
        id: user?._id || user?.id,
        userID: user?.teamID || user?.evaluatorID,
        role: user?.role,
        name: user?.teamName || user?.name,
    }

    useEffect(() => {
        const socket = getSocket();

        // Ask server if user room exists
        socket.emit("checkUserRoom", { userId: authUser.id, userType: authUser.role }, (exists) => {
            if (exists) setChatStarted(true);
        });
    }, [user]);

    const handleInitChat = () => {
        setChatStarted(true);
    }
    return (
        <>
            <ComponentCard title={pageTitle}>
                <div className="h-[calc(100vh-255px)] overflow-hidden sm:h-[calc(100vh-280px)]">
                    {chatStarted ?
                        <ChatScreen name={"Submittly Admin"} user={authUser} />
                        :
                        <StartChat type='user' handleChat={handleInitChat} />
                    }
                </div>
            </ComponentCard>
        </>
    );
}

export default Chat;
