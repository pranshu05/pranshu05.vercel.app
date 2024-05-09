import LoginContainer from "@/components/(guestbook)/LoginContainer";
import MessageList from "@/components/(guestbook)/MessageList";
import PostMessage from "@/components/(guestbook)/PostMessage";
import { useState, useEffect } from "react";
import { getAuth, onAuthStateChanged, User } from "firebase/auth";

const Guestbook: React.FC = () => {
    const [isSignedIn, setIsSignedIn] = useState<boolean>(false);
    const [myUser, setMyUser] = useState<User | null>(null);

    useEffect(() => {
        const userAuth = getAuth();
        const authStateChanged = onAuthStateChanged(userAuth, (user) => {
            setIsSignedIn(!!user);
            setMyUser(user || null);
        });

        return () => authStateChanged();
    }, []);

    return (
        <div data-aos="fade-up" className="w-11/12 md:w-4/5 lg:w-3/4 xl:w-2/3 2xl:w-1/2 mx-auto">
            <div className="pb-8">
                <h1 className="text-3xl font-bold text-zinc-100">Guestbook</h1>
                <p>Welcome to my Guestbook! Feel free to leave a message!</p>
            </div>
            <LoginContainer />
            {isSignedIn && <PostMessage user={myUser!} />}
            <MessageList />
        </div>
    );
};

export default Guestbook;