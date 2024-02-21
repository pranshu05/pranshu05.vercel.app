import React from 'react';
import Link from 'next/link';

const Custom404: React.FC = () => {
	return (
		<div className="w-full flex flex-col justify-center h-screen items-center absolute top-0 bg-neutral-950">
			<h1 className="text-4xl font-bold mb-4 blink text-zinc-400">404 - Not Found</h1>
			<p className="text-xl text-zinc-400"><Link className='link' href={'/'} >Go Home.</Link></p>
		</div>
	);
};

export default Custom404;