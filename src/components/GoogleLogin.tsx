import { auth, signInWithPopup, GoogleAuthProvider } from '../firebase/firebase';
import { FaGoogle } from 'react-icons/fa';

const GoogleLogin: React.FC = () => {

    const handleGoogleLogin = async () => {
        try {
            const result = await signInWithPopup(auth, new GoogleAuthProvider());
            console.log(result.user);
        } catch (error: any) {
            console.error(error.message);
        }
    };

    return (
        <button onClick={handleGoogleLogin} className='py-2 px-4 rounded-md bg-black text-white flex gap-2 items-center border border-zinc-300'>
            <FaGoogle />
            Sign in
        </button>
    );
};

export default GoogleLogin;