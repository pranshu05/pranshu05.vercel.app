import React, { useEffect, useState } from 'react';
import { collection, query, orderBy, onSnapshot } from 'firebase/firestore';
import { db } from '../firebase/firebase';
import Image from 'next/image';

interface Message {
    id: string;
    displayName: string;
    photoURL: string;
    message: string;
}

const MessageList: React.FC = () => {
    const [messages, setMessages] = useState<Message[]>([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        const messagesCollection = collection(db, 'messages');
        const messagesQuery = query(messagesCollection, orderBy('timestamp', 'desc'));

        const unsubscribe = onSnapshot(messagesQuery, (snapshot) => {
            try {
                const newMessages: Message[] = snapshot.docs.map((doc) => ({
                    id: doc.id,
                    ...doc.data(),
                })) as Message[];

                setMessages(newMessages);
                setLoading(false);
                setError(null);
            } catch (error) {
                console.error('Error fetching messages:', error);
                setLoading(false);
                setError('Error fetching messages. Please try again.');
            }
        });

        return () => unsubscribe();
    }, []);

    if (loading) {
        return <p>Loading messages...</p>;
    }
    if (error) {
        return <p>Error: {error}</p>;
    }

    return (
        <div>
            <h2 className="text-xl font-bold mt-4">Messages</h2>
            {messages.map((message) => (
                <div key={message.id} className="border border-zinc-400 rounded-md bg-transparent p-4 my-2">
                    <div className="flex items-center gap-2 mb-1">
                        <Image src={message.photoURL} alt={message.displayName} width={32} height={32} className="rounded-full" />
                        <div className="flex flex-col">
                            <p className="font-semibold">{message.displayName}</p>
                            <p className="text-gray-500"></p>
                        </div>
                    </div>
                    <p>{message.message}</p>
                </div>
            ))}
        </div>
    );
};

export default MessageList;