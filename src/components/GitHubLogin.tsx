import { auth, signInWithPopup, GithubAuthProvider } from '../firebase/firebase';
import { FaGithub } from 'react-icons/fa';

const GitHubLogin: React.FC = () => {

    const handleGitHubLogin = async () => {
        try {
            const result = await signInWithPopup(auth, new GithubAuthProvider());
            console.log(result.user);
        } catch (error: any) {
            console.error(error.message);
        }
    };

    return (
        <button onClick={handleGitHubLogin} className='py-2 px-4 rounded-md bg-black text-white flex gap-2 items-center border border-zinc-300'>
            <FaGithub />
            Sign in
        </button>
    );
};

export default GitHubLogin;