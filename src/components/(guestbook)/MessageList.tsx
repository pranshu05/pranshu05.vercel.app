import { useEffect, useState } from 'react';
import { collection, query, orderBy, onSnapshot } from 'firebase/firestore';
import { db } from '../../firebase/firebase';

interface Message {
    id: string;
    displayName: string;
    message: string;
}

const MessageList: React.FC = () => {
    const [messages, setMessages] = useState<Message[]>([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        const unsubscribe = onSnapshot(query(collection(db, 'messages'), orderBy('timestamp', 'desc')), (snapshot) => {
            try {
                const newMessages: Message[] = snapshot.docs.map((doc) => ({ id: doc.id, ...doc.data() })) as Message[];
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
            {messages.map((message) => (
                <div key={message.id}>
                    <div className='my-3'>
                        <span className="font-semibold text-zinc-400">{message.displayName}:</span>
                        {' '}{message.message}
                    </div>
                </div>
            ))}
        </div>
    );
};

export default MessageList;