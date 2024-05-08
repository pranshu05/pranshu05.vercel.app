import type { Metadata } from 'next'
import TechStack from '@/components/(about)/TechStack'
import Image from 'next/image'

export const metadata: Metadata = {
    title: 'Pranshu05 // About',
    description: 'About me, Pranshu Patel!',
}

const AboutPage: React.FC = () => {
    return (
        <div className="w-11/12 md:w-4/5 lg:w-3/4 xl:w-2/3 2xl:w-1/2 mx-auto">
            <div className="pb-8">
                <h1 className="text-3xl font-bold text-zinc-100">About me!</h1>
            </div>
            <p>
                <Image src='https://i.imgur.com/gyDSUsG.jpg' width={200} height={200} alt='me' className='sm:w-200 max-sm:w-full max-sm:float-start max-sm:mb-3 sm:float-right sm:ml-3 rounded-md grayscale'/>
                Hey there! 👋🏻 I&apos;m Pranshu, a passionate full-stack developer and college fresher based in India. Currently working
                on a few projects and pursuing B.Tech. in ICT from{' '}<a className="link" href="https://daiict.ac.in" target="_blank" rel="noopener noreferrer">DA-IICT</a>.
                <br />
                <br />I started my coding journey in 2020 when I was 14 during the{' '}<a className="link" href="https://en.wikipedia.org/wiki/COVID-19" target="_blank">Covid</a>{' '}
                pandemic. I started with the basics of C and programming and then moved to web development. I have been working with web technologies like HTML, CSS, JavaScript, React, and Node.js. I also have experience with discord bot development using discord.js and Node.js and have worked with databases like
                MongoDB and Firebase. I&apos;m currently exploring Next.js and TypeScript. I&apos;m also passionate about UI/UX and its design and development.
            </p>
            <h2 className="text-2xl font-bold my-4 text-zinc-100">Tech Stack</h2>
            <p>Below is a list of technologies which I use for development and programming purpose. Including languages, frameworks, IDEs, apps and various softwares.</p>
            <TechStack />
            <p>
                I am always open to learning new technologies and love to work on new projects. If you have any project ideas or want to
                collaborate, feel free to reach out to me on{' '}<a className="link" href="https://twitter.com/pranshu_05" target="_blank" rel="noopener noreferrer">Twitter </a>{' '}[I may be delayed in responding at times].
            </p>
        </div>
    )
}

export default AboutPage