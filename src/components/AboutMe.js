import { Tech } from './Technologies'

export const AboutMe = () => {
    return (
        <div className="about-me" id="about-me">
            <h2> Hi! I'm Pranshu ✌️</h2>
            <p>
                I am a 17 y/o high school student and self-taught developer
                based in India. During the COVID lockdown when I was 14, I began
                programming and have since gained expertise in creating Discord
                bots using <a href="https://discord.js.org/#/">discord.js</a> as
                well as web development. I have learned various programming
                languages along the way.
            </p>
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
