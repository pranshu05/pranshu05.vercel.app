import TechStack from "@/components/(about)/TechStack"
import Projects from "@/components/(about)/Projects"
import MusicGrid from "@/components/(about)/MusicGrid"

const AboutContainer: React.FC = () => {
    return (
        <div className="w-11/12 md:w-4/5 lg:w-3/4 xl:w-2/3 2xl:w-1/2 mx-auto">
            <h1 className="text-2xl font-bold text-zinc-100 mb-6">About me!</h1>
            <p className="text-zinc-300 text-sm leading-relaxed mb-6">Hey there! 👋🏻 I&apos;m Pranshu, a full-stack developer and uni sophomore based in India, pursuing B.Tech. in ICT from{" "}<a className="link" href="https://daiict.ac.in" target="_blank" rel="noopener noreferrer">DA-IICT</a>. A technology nerd who likes to code and listen to music instead of focusing on studies. I attend my uni lectures to fulfill my attendance quota. Fun fact: I can write code faster than I can decide what to eat for lunch. Also, I once tried to fix a bug for 6 hours, only to realize it was a missing semicolon. True story!</p>
            <h2 className="text-xl font-bold my-4 text-zinc-100">My Story</h2>
            <p className="text-zinc-300 text-sm leading-relaxed mb-6">I started coding in 2020 during the{" "}<a className="link" href="https://en.wikipedia.org/wiki/COVID-19" target="_blank" rel="noreferrer">Covid</a>{" "} pandemic. I began with C and moved to web development, working with HTML, CSS, JavaScript, React, and Node.js. I&apos;m currently exploring Next.js and TypeScript. Inspired by{" "}<a className="link" target="_blank" href="https://github.com/SebLague" rel="noreferrer">Sebastian Lague</a>, I&apos;m also passionate about UI/UX design and music.</p>
            <h2 className="text-xl font-bold my-4 text-zinc-100">Tech Stack</h2>
            <p className="text-zinc-300 text-sm leading-relaxed mb-4">Below is a list of technologies which I use for development and programming purpose. Including languages, frameworks, IDEs, apps and various softwares.</p>
            <TechStack />
            <h2 className="text-xl font-bold my-4 text-zinc-100">My work</h2>
            <p className="text-zinc-300 text-sm leading-relaxed mb-6">I have worked on various projects and have experience with web development, discord bot development, and UI/UX design. I have also worked on a few open-source projects and have contributed to some of them. I&apos;ve listed some of my projects below.</p>
            <Projects />
            <h2 className="text-xl font-bold my-4 text-zinc-100">Let&apos;s connect</h2>
            <p className="text-zinc-300 text-sm leading-relaxed mb-6">I am always open to learning new technologies and love to work on new projects. If you have any project ideas or want to collaborate, feel free to reach out to me on{" "}<a className="link" href="https://twitter.com/pranshu_05" target="_blank" rel="noopener noreferrer">Twitter</a>{" "}[I may be delayed in responding at times].</p>
            <h2 className="text-xl font-bold my-4 text-zinc-100">Music</h2>
            <MusicGrid />
        </div>
    )
}

export default AboutContainer