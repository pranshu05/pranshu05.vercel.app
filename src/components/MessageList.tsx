import React, { useEffect, useState } from 'react';
import { collection, onSnapshot } from 'firebase/firestore';
import { db } from '../firebase/firebase';
import Image from 'next/image';

interface Message {
    id: string;
    displayName: string;
    photoURL: string;
    timestamp: {
        seconds: number;
        nanoseconds: number;
    };
    message: string;
}

const MessageList: React.FC = () => {
    const [messages, setMessages] = useState<Message[]>([]);

    useEffect(() => {
        const messagesCollection = collection(db, 'messages');

        const unsubscribe = onSnapshot(messagesCollection, (snapshot) => {
            const newMessages: Message[] = snapshot.docs.map((doc) => ({
                id: doc.id,
                ...doc.data(),
            })) as Message[];

            setMessages(newMessages);
        });

        return () => unsubscribe();
    }, []);

    // const formatTimestamp = (timestamp: { seconds: number; nanoseconds: number }): string => {
    //     const date = new Date(timestamp.seconds * 1000); 
    //     return date.toLocaleDateString();
    // };

    return (
        <div>
            <h2 className="text-xl font-bold mt-4">Messages</h2>
            {messages.map((message) => (
                <div key={message.id} className="border border-zinc-400 rounded-md bg-transparent p-4 my-2">
                    <div className="flex items-center gap-2 mb-1">
                        <Image src={message.photoURL} alt={message.displayName} width={32} height={32} className="rounded-full" />
                        <div className="flex flex-col">
                            <span className="font-semibold">{message.displayName}</span>
                            {/* <p className="text-gray-500">{formatTimestamp(message.timestamp)}</p> */}
                        </div>
                    </div>
                    <p>{message.message}</p>
                </div>
            ))}
        </div>
    );
};

export default MessageList;
