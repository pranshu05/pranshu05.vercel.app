import { auth, signInWithPopup, GoogleAuthProvider } from '../firebase/firebase';
import { FaGoogle } from 'react-icons/fa';

interface GoogleLoginProps {
    setErrorMsg: React.Dispatch<React.SetStateAction<string | null>>;
}

const GoogleLogin: React.FC<GoogleLoginProps> = ({ setErrorMsg }) => {
    const handleGoogleLogin = async () => {
        try {
            const result = await signInWithPopup(auth, new GoogleAuthProvider());
            console.log(result.user);
        } catch (error: any) {
            if (error.code === 'auth/account-exists-with-different-credential') {
                setErrorMsg('Account exists with different credentials');
            } else {
                console.error(error.message);
            }
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