import Link from 'next/link';
import Image from 'next/image';
import Head from 'next/head';

const Custom404: React.FC = () => {
	return (
		<div className="w-full flex flex-col justify-center h-screen items-center absolute top-0 bg-neutral-950">
			<Head>
				<title>404 | Pranshu05</title>
				<meta name="og:description" content="Portfolio website of Pranshu Patel." />
				<meta name="og:title" content="Pranshu05 | Portfolio" />
			</Head>
			<Image src={'https://i.imgur.com/xVIfdHm.gif'} className='rounded-md grayscale' alt="404" width={300} height={300} />
			<p className="text-xl font-bold my-3">H-hewwo?? 404 page nut found!! ^•ﻌ•^</p>
			<Link className='link text-lg' href={'/'} >OWO go back home :P</Link>
		</div>
	);
};

export default Custom404;