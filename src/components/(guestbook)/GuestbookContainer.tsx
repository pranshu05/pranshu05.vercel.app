import LoginContainer from "@/components/(guestbook)/LoginContainer"
import MessageList from "@/components/(guestbook)/MessageList"
import PostMessage from "@/components/(guestbook)/PostMessage"
import { useState, useEffect } from "react"
import { getAuth, onAuthStateChanged, type User } from "firebase/auth"

const GuestbookContainer: React.FC = () => {
    const [myUser, setMyUser] = useState<User | null>(null)

    useEffect(() => {
        const userAuth = getAuth()
        const authStateChanged = onAuthStateChanged(userAuth, (user) => {
            setMyUser(user || null)
        })
        return () => authStateChanged()
    }, [])

    return (
        <div className="w-11/12 md:w-4/5 lg:w-3/4 xl:w-3/5 2xl:w-1/2 max-w-3xl mx-auto">
            <h1 className="text-2xl font-bold text-zinc-100 mb-6">Guestbook</h1>
            <p className="text-zinc-300 text-sm leading-relaxed mb-6">Welcome to my guestbook, the digital equivalent of scribbling your name on a tree but without the environmental guilt! Feel free to leave a message, share a joke, or confess your undying love for pineapple on pizza (no judgment here). Just remember, the internet is forever, so make it good!</p>
            <LoginContainer />
            <PostMessage user={myUser} />
            <MessageList />
        </div>
    )
}

export default GuestbookContainer