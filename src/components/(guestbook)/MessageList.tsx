import { useEffect, useState } from "react"
import { collection, query, orderBy, onSnapshot, deleteDoc, doc } from "firebase/firestore"
import { getAuth } from "firebase/auth"
import { db } from "@/firebase/firebase"

interface Message {
    id: string
    displayName: string
    message: string
}

const MessageList: React.FC = () => {
    const [messages, setMessages] = useState<Message[]>([])
    const [loading, setLoading] = useState(true)
    const [error, setError] = useState<string | null>(null)
    const auth = getAuth()
    const user = auth.currentUser
    const isAdmin = user?.email === "pranshu05patel@gmail.com"

    useEffect(() => {
        const unsubscribe = onSnapshot(query(collection(db, "messages"), orderBy("timestamp", "desc")), (snapshot) => {
            try {
                const newMessages: Message[] = snapshot.docs.map((doc) => ({ id: doc.id, ...doc.data() })) as Message[]
                setMessages(newMessages)
                setLoading(false)
                setError(null)
            } catch (error) {
                console.error("Error fetching messages:", error)
                setLoading(false)
                setError("Error fetching messages. Please try again.")
            }
        })
        return () => unsubscribe()
    }, [])

    const handleDelete = async (id: string) => {
        if (confirm("Are you sure you want to delete this message?")) {
            await deleteDoc(doc(db, "messages", id))
        }
    }

    return (
        <div className="mt-10 space-y-1">
            <h2 className="text-xl font-bold my-4 text-zinc-100">Messages</h2>
            {loading && <p className="text-zinc-500 text-sm">Loading messages...</p>}
            {error && <p className="text-zinc-500 text-sm">Error: {error}</p>}
            <div className="space-y-2">
                {messages.map((message) => (
                    <div key={message.id} className="pb-2 border-b border-zinc-800 flex justify-between items-start">
                        <div>
                            <span className="text-zinc-400 text-sm leading-relaxed">{message.displayName}</span>
                            <p className="text-zinc-300 text-sm leading-relaxed">{message.message}</p>
                        </div>
                        {isAdmin && (
                            <button onClick={() => handleDelete(message.id)} className="text-zinc-500 text-sm">Delete</button>
                        )}
                    </div>
                ))}
            </div>
        </div>
    )
}

export default MessageList