/* eslint-disable @next/next/no-img-element */
import { useEffect, useState } from 'react';
import { collection, query, orderBy, onSnapshot } from 'firebase/firestore';
import { db } from '../../firebase/firebase';

interface Message {
    id: string;
    displayName: string;
    photoURL: string;
    timestamp: Date;
    message: string;
}

const MessageList: React.FC = () => {
    const [messages, setMessages] = useState<Message[]>([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        const unsubscribe = onSnapshot(query(collection(db, 'messages'), orderBy('timestamp', 'desc')), (snapshot) => {
            try {
                const newMessages: Message[] = snapshot.docs.map((doc) => ({ id: doc.id, ...doc.data(), timestamp: doc.data().timestamp.toDate() })) as Message[];
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

    { loading && <p className='my-4'>Loading messages...</p> }
    { error && <p className='my-4'>Error: {error}</p> }

    return (
        <div>
            <h2 className="text-xl font-bold mt-4 text-zinc-100">Messages</h2>
            {messages.map((message) => (
                <div key={message.id} className="bg-transparent border border-zinc-700 rounded-md p-4 my-2">
                    <div className="flex items-center gap-2 mb-1">
                        <img src={message.photoURL} alt={message.displayName} width={1080} height={1080} className="rounded-full w-8 h-8 grayscale transition-all duration-500 ease-in-out transform" />
                        <div className="flex flex-col">
                            <p className="font-semibold">{message.displayName}</p>
                            <p className="text-zinc-400">{message.timestamp.toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric', })}</p>
                        </div>
                    </div>
                    <p>{message.message}</p>
                </div>
            ))}
        </div>
    );
};

export default MessageList;