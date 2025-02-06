import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import MessageCard from '../../connect/MessageCard';
import { fetchData, postData } from '../../../api';

const PinnedMessages = () => {
    const [messages, setMessages] = useState([]);
    const { projectId } = useParams();

    useEffect(() => {
        fetchData(`/chat/pinned-messages/`, { projectId }).then((res) => {
            setMessages(res);
        });
    }, [projectId]);
    

    const unpinMessage = async (messageId) => {
        try {
            await postData(`/chat/unpin/${messageId}`, { projectId });
            setMessages(messages.filter(msg => msg.id !== messageId));
        } catch (error) {
            console.error("Error unpinning message:", error);
        }
    };

    return (
        <div className="container mx-auto p-6">
            <h2 className="text-2xl font-semibold mb-4">Pinned Messages</h2>
            {messages.length > 0 ? (
                <div className="flex">
                    {messages.map((message) => (
                        <div key={message.id} className="relative mx-4">
                            <MessageCard 
                                message={message.message} 
                                self={message.self} 
                                removeMessage={() => unpinMessage(message.id)}
                            />
                           
                        </div>
                    ))}
                </div>
            ) : (
                <p className="text-gray-500">No pinned messages found.</p>
            )}
        </div>
    );
};

export default PinnedMessages;
