import Link from 'next/link';
import Image from 'next/image';

const Custom404: React.FC = () => {
	return (
		<div className="w-full flex flex-col justify-center h-screen items-center absolute top-0 bg-neutral-950">
			<Image src={'https://i.imgur.com/xVIfdHm.gif'} className='rounded-md grayscale' alt="404" width={300} height={300} />
			<p className="text-xl font-bold my-3">H-hewwo?? 404 page nut found!! ^•ﻌ•^</p>
			<Link className='link text-lg' href={'/'} >OWO go back home :P</Link>
		</div>
	);
};

export default Custom404;