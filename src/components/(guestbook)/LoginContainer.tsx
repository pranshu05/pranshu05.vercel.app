import { useState, useEffect } from "react"
import { getAuth, onAuthStateChanged, type User } from "firebase/auth"
import { auth, signInWithPopup, GoogleAuthProvider } from "@/firebase/firebase"

const LoginContainer: React.FC = () => {
    const [isSignedIn, setIsSignedIn] = useState<boolean>(false)
    const [userName, setUserName] = useState<string | null>(null)
    const [errorMessage, setErrorMessage] = useState<string | null>(null)

    const handleSignOut = async () => {
        try {
            await auth.signOut()
        } catch (error: any) {
            console.error(error.message)
        }
    }

    const userAuth = getAuth()
    onAuthStateChanged(userAuth, (user: User | null) => user ? (setUserName(user.displayName || ""), setIsSignedIn(true)) : setIsSignedIn(false),)

    useEffect(() => {
        const timeoutId = setTimeout(() => setErrorMessage(null), 2000)
        return () => clearTimeout(timeoutId)
    }, [errorMessage])

    return (
        <div className="py-4 border-b border-zinc-800">
            {isSignedIn ? (
                <div className="flex items-center justify-between">
                    <p className="text-zinc-300 text-sm leading-relaxed">Signed in as <span className="text-zinc-300 text-sm leading-relaxed">{userName}</span></p>
                    <button onClick={handleSignOut} className="link text-zinc-300 text-sm leading-relaxed">Sign out</button>
                </div>
            ) : (
                <div className="flex items-center justify-between">
                    <p className="text-zinc-300 text-sm leading-relaxed">Sign in to leave a message with your identity</p>
                    {errorMessage && <p className="text-zinc-500 text-sm">{errorMessage}</p>}
                    <button onClick={async () => {
                        try {
                            await signInWithPopup(auth, new GoogleAuthProvider())
                        } catch (error: any) {
                            setErrorMessage(error.code === "auth/account-exists-with-different-credential" ? "Account exists with different credentials" : error.message,)
                        }
                    }} className="link text-zinc-300 text-sm leading-relaxed">
                        Sign in
                    </button>
                </div>
            )}
        </div>
    )
}

export default LoginContainer