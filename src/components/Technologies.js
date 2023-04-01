import {
    FaCss3,
    FaGit,
    FaGithub,
    FaHtml5,
    FaJava,
    FaJs,
    FaNode,
    FaPython,
    FaReact,
} from 'react-icons/fa'

const TechItem = ({ icon, text }) => {
    const Icon = icon
    return (
        <div className="techs-cont">
            <div className="techs-icon">
                <Icon />
            </div>
            <div className="techs-text">{text}</div>
        </div>
    )
}

export const Tech = () => {
    const techs = [
        { icon: FaJs, text: 'JavaScript' },
        { icon: FaReact, text: 'React' },
        { icon: FaNode, text: 'Node' },
        { icon: FaHtml5, text: 'HTML' },
        { icon: FaCss3, text: 'CSS' },
        { icon: FaJava, text: 'Java' },
        { icon: FaPython, text: 'Python' },
        { icon: FaGithub, text: 'GitHub' },
        { icon: FaGit, text: 'Git' },
    ]
    return (
        <div className="techs" id="techs">
            <h1>Skills ⚡️</h1>
            {techs.map((tech) => (
                <TechItem icon={tech.icon} text={tech.text} key={tech.text} />
            ))}
        </div>
    )
}
