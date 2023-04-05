import { Tech } from './Technologies'
import { DiscordStatus } from '../APIs/DiscordStatusAPI'

export const AboutMe = () => {
    return (
        <div className="about-me" id="about-me">
            <h2> Hi! I'm Pranshu ✌️</h2>
            <p>
                I am a 17y/0 developer and high-school student based in India. I
                specialize in creating discord bots using{' '}
                <a href="https://discord.js.org/#/">discord.js</a> and web
                development.
            </p>
            <DiscordStatus />
            <br />
            <h2>What Do I Do 💭</h2>
            <p>
                I am passionate about everything related to technology,
                including designing and developing software, understanding the
                various components of the internet and how they work together,
                cybersecurity, systems, programming, and more. I am constantly
                striving to expand my knowledge in these areas and apply it to
                gain a deeper understanding of the technology that surrounds us.
            </p>
            <br />
            <Tech />
            <br />
        </div>
    )
}
