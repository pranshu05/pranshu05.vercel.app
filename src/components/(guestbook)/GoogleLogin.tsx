import { auth, signInWithPopup, GoogleAuthProvider } from '../../firebase/firebase';
import { FaGoogle } from 'react-icons/fa';

interface GoogleLoginProps {
    setErrorMsg: React.Dispatch<React.SetStateAction<string | null>>;
}

const GoogleLogin: React.FC<GoogleLoginProps> = ({ setErrorMsg }) => (
    <button onClick={async () => {
        try {
            await signInWithPopup(auth, new GoogleAuthProvider());
        } catch (error: any) {
            setErrorMsg(error.code === 'auth/account-exists-with-different-credential' ? 'Account exists with different credentials' : error.message);
        }
    }} className='py-2 px-4 bg-transparent outline outline-[2px] outline-zinc-700 rounded-lg flex gap-2 items-center'>
        <FaGoogle /> Sign in
    </button>
);

export default GoogleLogin;