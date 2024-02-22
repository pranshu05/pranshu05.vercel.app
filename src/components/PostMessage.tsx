import { useState } from 'react';
import { addDoc, collection, serverTimestamp } from 'firebase/firestore';
import { User } from 'firebase/auth';
import { db } from '../firebase/firebase';

interface PostMessageProps {
    user: User;
}

const PostMessage: React.FC<PostMessageProps> = ({ user }) => {
    const [newMessage, setNewMessage] = useState<string>('');
    const [showWarning, setShowWarning] = useState<boolean>(false);
    const [postSuccess, setPostSuccess] = useState<boolean>(false);

    const handlePostMessage = async () => {
        newMessage.trim() === '' && (setShowWarning(true), setTimeout(() => setShowWarning(false), 2000));

        const messagesCollection = collection(db, 'messages');

        try {
            await addDoc(messagesCollection, {
                displayName: user.displayName,
                photoURL: user.photoURL,
                timestamp: serverTimestamp(),
                message: newMessage,
            });

            setNewMessage('');
            setPostSuccess(true);

            setTimeout(() => setPostSuccess(false), 2000);
        } catch (error) {
            console.error('Error posting message:', error);
        }
    };

    return (
        <div className="mt-4 p-4 bg-transparent rounded-md w-full border border-zinc-400">
            <h2 className="text-xl font-bold mb-2 text-zinc-100">Post a Message</h2>
            <textarea value={newMessage} onChange={(e) => setNewMessage(e.target.value)} className="w-full min-h-20 p-2 border border-zinc-400 bg-transparent rounded-md" placeholder="Write your message here..." />
            <button onClick={handlePostMessage} className="mt-2 bg-transparent text-zinc-100 p-2 rounded-md border border-zinc-400">Post Message</button>
            {showWarning && <p className="text-red-500 mt-2"> Warning: You cannot post an empty message. Please enter a message. </p>}
            {postSuccess && <p className="text-green-500 mt-2"> Message posted successfully! </p>}
        </div>
    );
};

export default PostMessage;