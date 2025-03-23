/* eslint-disable @next/next/no-img-element */
import Link from 'next/link';
import Head from 'next/head';

const Custom404: React.FC = () => {
	return (
		<div className="w-full flex flex-col justify-center h-screen items-center absolute top-0 bg-neutral-950">
			<Head>
				<title>404 | Pranshu05</title>
				<meta name="description" content="Portfolio website of Pranshu Patel." />
				<meta name="keywords" content="Pranshu Patel, Pranshu05, Portfolio, Developer, Designer, Engineer, Pranshu, Patel" />
				<meta name="author" content="Pranshu Patel" />
				<meta name="robots" content="index, follow" />
				<meta name="og:type" content="website" />
				<meta name="og:description" content="Portfolio website of Pranshu Patel." />
				<meta name="og:title" content="Pranshu05 | Portfolio" />
			</Head>
			<img src={'https://i.imgur.com/xVIfdHm.gif'} className='rounded-md grayscale' alt="404" width={300} height={300} />
			<p className="text-lg">H-hewwo?? 404 page nut found!! ^•ﻌ•^</p>
			<p className="text-md">It seems you&apos;ve wandered off the beaten path, but don&apos;t worry, I&apos;ll guide you back home! UwU</p>
			<Link className='link text-sm' href={'/'} >OWO go back home :P</Link>
		</div>
	);
};

export default Custom404;