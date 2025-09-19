import React from 'react';
import ChatList from '../../components/chat/ChatList'
import { Send } from 'lucide-react';
import ChatScreen from '../../components/chat/ChatScreen';
import usePageTitle from '../../hooks/usePageTitle';
import ComponentCard from '../../components/layout/ComponentCard';
const ChatSupport = () => {
    const pageTitle = usePageTitle();

    return (
        <>
            <ComponentCard title={pageTitle}>
                <div className="h-[calc(100vh-150px)] overflow-hidden sm:h-[calc(100vh-174px)]">
                    <div className="flex flex-col h-full gap-6 xl:flex-row xl:gap-5">


                        <ChatList />
                        <ChatScreen name={"Team No. 1"} type={"admin"}/>

                    </div>
                </div>
            </ComponentCard>
        </>


    );
}

export default ChatSupport;
