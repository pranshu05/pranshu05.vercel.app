import { useState } from "react"
import { addDoc, collection, serverTimestamp } from "firebase/firestore"
import type { User } from "firebase/auth"
import { db } from "@/firebase/firebase"

interface PostMessageProps {
    user: User | null
}

const PostMessage: React.FC<PostMessageProps> = ({ user }) => {
    const [newMessage, setNewMessage] = useState<string>("")
    const [showWarning, setShowWarning] = useState<boolean>(false)
    const [postSuccess, setPostSuccess] = useState<boolean>(false)

    const handlePostMessage = async () => {
        if (newMessage.trim() === "") {
            setShowWarning(true)
            setTimeout(() => setShowWarning(false), 2000)
            return
        }

        await addDoc(collection(db, "messages"), {
            displayName: user ? user.displayName : "Anonymous",
            photoURL: user ? user.photoURL : null,
            timestamp: serverTimestamp(),
            message: newMessage,
        })

        setNewMessage("")
        setPostSuccess(true)
        setTimeout(() => setPostSuccess(false), 2000)
    }

    return (
        <div className="mt-6 space-y-3">
            <h2 className="text-xl font-bold my-4 text-zinc-100">
                {user ? `Post a message as ${user.displayName}` : "Post a message anonymously"}
            </h2>
            <textarea value={newMessage} onChange={(e) => setNewMessage(e.target.value)} className="w-full min-h-24 p-3 border border-zinc-800 rounded-md bg-zinc-900/50 text-zinc-300 text-sm leading-relaxed placeholder:text-zinc-400 focus:outline-none focus:ring-1 focus:ring-zinc-700 transition-colors" placeholder="Write your message here..." />
            <div className="flex items-center justify-between">
                <button onClick={handlePostMessage} className="link text-zinc-300 text-sm leading-relaxed">Post Message</button>
                <div className="h-5">
                    {showWarning && <p className="text-zinc-500 text-sm">Cannot post an empty message</p>}
                    {postSuccess && <p className="text-zinc-500 text-sm">Message posted successfully</p>}
                </div>
            </div>
        </div>
    )
}

export default PostMessage