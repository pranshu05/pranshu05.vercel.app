import { auth, signInWithPopup, GithubAuthProvider } from '../firebase/firebase';
import { FaGithub } from 'react-icons/fa';
import { getAuth, onAuthStateChanged } from 'firebase/auth';
import { useState } from 'react';

const GitHubLogin: React.FC = () => {
    const [isSignedIn, setIsSignedIn] = useState<boolean>(false);
    const [userName, setUserName] = useState<string | null>(null);

    const handleGitHubLogin = async () => {
        try {
            const result = await signInWithPopup(auth, new GithubAuthProvider());
            console.log(result.user);
        } catch (error: any) {
            console.error(error.message);
        }
    };

    const handleGitHubLogout = async () => {
        try {
            await auth.signOut();
        } catch (error: any) {
            console.error(error.message);
        }
    };

    const user_auth = getAuth();
    onAuthStateChanged(user_auth, (user) => {
        if (user) {
            setUserName(user.displayName || '');
            setIsSignedIn(true)
        } else {
            setIsSignedIn(false)
        }
    });

    return (
        <div>
            {isSignedIn ? (
                <div className='flex items-baseline gap-2'>
                    <p>Signed In as {userName}</p>
                    <button onClick={handleGitHubLogout} className='py-2 px-4 rounded-md bg-black text-white flex gap-2 items-center border border-zinc-300'>
                        <FaGithub />
                        Sign out
                    </button>
                </div>
            ) : (
                <div className='flex items-baseline gap-2'>
                    <p>Sign In to leave a message!</p>
                    <button onClick={handleGitHubLogin} className='py-2 px-4 rounded-md bg-black text-white flex gap-2 items-center border border-zinc-300'>
                        <FaGithub />
                        Sign in
                    </button>
                </div>
            )}
        </div>
    );
};

export default GitHubLogin;