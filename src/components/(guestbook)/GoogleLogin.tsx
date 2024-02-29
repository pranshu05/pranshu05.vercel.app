import { auth, signInWithPopup, GoogleAuthProvider } from '../../firebase/firebase';
import { FaGoogle } from 'react-icons/fa';

interface GoogleLoginProps {
    setErrorMsg: React.Dispatch<React.SetStateAction<string | null>>;
}

const GoogleLogin: React.FC<GoogleLoginProps> = ({ setErrorMsg }) => (
    <button onClick={async () => {
        try {
            const result = await signInWithPopup(auth, new GoogleAuthProvider());
            console.log(result.user);
        } catch (error: any) {
            setErrorMsg(error.code === 'auth/account-exists-with-different-credential' ? 'Account exists with different credentials' : error.message);
        }
    }} className='py-2 px-4 rounded-md bg-transparent flex gap-2 items-center border border-zinc-400'>
        <FaGoogle /> Sign in
    </button>
);

export default GoogleLogin;