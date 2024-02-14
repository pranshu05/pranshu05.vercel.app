import React, { useState } from 'react';
import { addDoc, collection, serverTimestamp } from 'firebase/firestore';
import { User } from 'firebase/auth';
import { db } from '../firebase/firebase';

interface PostMessageProps {
    user: User;
}

const PostMessage: React.FC<PostMessageProps> = ({ user }) => {
    const [newMessage, setNewMessage] = useState<string>('');

    const handlePostMessage = async () => {
        const messagesCollection = collection(db, 'messages');

        await addDoc(messagesCollection, {
            displayName: user.displayName,
            photoURL: user.photoURL,
            timestamp: serverTimestamp(),
            message: newMessage,
        });

        setNewMessage('');
    };

    return (
        <div className="mt-4 p-4 bg-black bg-opacity-40 backdrop backdrop-blur-sm rounded-md w-full border boder-zinc-400">
            <h2 className="text-xl font-bold mb-2">Post a Message</h2>
            <textarea value={newMessage} onChange={(e) => setNewMessage(e.target.value)} className="w-full min-h-20 p-2 border border-zinc-400 bg-transparent rounded-md" placeholder="Write your message here..." />
            <button onClick={handlePostMessage} className="mt-2 bg-black text-white p-2 rounded-md border border-zinc-400">
                Post Message
            </button>
        </div>
    );
};

export default PostMessage;
