import TechStack from '@/components/(about)/TechStack'
import Projects from './Projects'
import CurrentGame from '@/components/(about)/CurrentGame'

const AboutContainer: React.FC = () => {
    return (
        <div className="w-11/12 md:w-4/5 lg:w-3/4 xl:w-2/3 2xl:w-1/2 mx-auto">
            <div className="pb-8">
                <h1 className="text-3xl font-bold text-zinc-100">About me!</h1>
            </div>
            <p>Hey there! 👋🏻 I&apos;m Pranshu, a passionate full-stack developer and uni sophomore based in India. Currently working on a few projects and pursuing B.Tech. in ICT from{' '}<a className="link" href="https://daiict.ac.in" target="_blank" rel="noopener noreferrer">DA-IICT</a>. [Sorry for copying the same intro from the homepage 😜]<br /><br />I started my coding journey in 2020 when I was 14 during the{' '}<a className="link" href="https://en.wikipedia.org/wiki/COVID-19" target="_blank">Covid</a>{' '}pandemic. I started with the basics of C and programming and then moved to web development. I have been working with web technologies like HTML, CSS, JavaScript, React, and Node.js. I also have experience with discord bot development using discord.js and Node.js and have worked with databases like MongoDB and Firebase. I&apos;m currently exploring Next.js and TypeScript. I&apos;m also passionate about UI/UX and its design and development. Inspired by <a className='link' target='_blank' href='https://github.com/SebLague'>Sebastian Lague</a>.</p>
            <h2 className="text-2xl font-bold my-4 text-zinc-100">Tech Stack</h2>
            <p>Below is a list of technologies which I use for development and programming purpose. Including languages, frameworks, IDEs, apps and various softwares.</p>
            <TechStack />
            <h2 className='text-2xl font-bold my-4 text-zinc-100'>My work</h2>
            <p>I have worked on various projects and have experience with web development, discord bot development, and UI/UX design. I have also worked on a few open-source projects and have contributed to some of them. I&apos;ve listed some of my projects below.</p>
            <Projects />
            <p>I am always open to learning new technologies and love to work on new projects. If you have any project ideas or want to collaborate, feel free to reach out to me on{' '}<a className="link" href="https://twitter.com/pranshu_05" target="_blank" rel="noopener noreferrer">Twitter</a>{' '}[I may be delayed in responding at times].</p>
            <CurrentGame />
        </div>
    )
}

export default AboutContainer