/* eslint-disable @next/next/no-img-element */
import Link from 'next/link'
import Game from '@/components/(layout)/Game'

export default function NotFound() {
    return (
        <div className="w-full flex flex-col justify-center h-screen items-center absolute top-0 bg-neutral-950 z-50">
            <img src={'https://i.imgur.com/xVIfdHm.gif'} className='rounded-md grayscale max-w-xl w-full' alt="404" width={300} height={300} />
            <p className="text-lg">H-hewwo?? 404 page nut found!! ^•ﻌ•^</p>
            <p className="text-md">It seems you&apos;ve wandered off the beaten path, but don&apos;t worry, I&apos;ll guide you back home! UwU</p>
            <Link className='link text-sm' href={'/'} >OWO go back home :P</Link>
            <Game />
        </div>
    )
}