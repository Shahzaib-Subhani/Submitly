import React from 'react';
import ComponentCard from '../components/layout/ComponentCard';
import ChatScreen from '../components/chat/ChatScreen';
import usePageTitle from '../hooks/usePageTitle';

const Chat = () => {
    const pageTitle = usePageTitle();
    return (
        <>
            <ComponentCard title={pageTitle}>

                <ChatScreen name={"Submittly Agent"}  />


            </ComponentCard>
        </>
    );
}

export default Chat;
