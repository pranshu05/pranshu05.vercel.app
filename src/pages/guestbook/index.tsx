import type { Metadata } from "next";
import GitHubLogin from "@/components/GitHubLogin";
import { getAuth, onAuthStateChanged } from 'firebase/auth';
import { useState } from 'react';

export const metadata: Metadata = {
    title: 'Pranshu05 // Guestbook',
    description: 'My guestbook, feel free to leave a message!',
}

const Home: React.FC = () => {
    const [isSignedIn, setIsSignedIn] = useState<boolean>(false);

    const user_auth = getAuth();
    onAuthStateChanged(user_auth, (user) => {
        if (user) {
            setIsSignedIn(true)
        } else {
            setIsSignedIn(false)
        }
    });

    return (
        <div className="w-11/12 md:w-4/5 lg:w-3/4 xl:w-2/3 2xl:w-1/2 mx-auto">
            <div className='pb-8'>
                <h1 className='text-3xl font-bold'>Guestbook</h1>
                <p>Welcome to my Guestbook! Feel free to leave a message!</p>
            </div>
            <GitHubLogin />
        </div>
    )
};

export default Home;