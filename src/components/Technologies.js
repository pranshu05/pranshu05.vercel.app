import {
    FaCss3,
    FaGit,
    FaGithub,
    FaHtml5,
    FaJs,
    FaNode,
    FaReact,
} from 'react-icons/fa'

export const Tech = () => {
    return (
        <div className="techs">
            <h1>technologies I use 💻</h1>
            <div className="techs-cont">
                <div className="techs-icon">
                    <FaJs />
                </div>
                <div className="techs-text">JavaScript</div>
            </div>
            <div className="techs-cont">
                <div className="techs-icon">
                    <FaCss3 />
                </div>
                <div className="techs-text">CSS</div>
            </div>
            <div className="techs-cont">
                <div className="techs-icon">
                    <FaReact />
                </div>
                <div className="techs-text">React</div>
            </div>
            <div className="techs-cont">
                <div className="techs-icon">
                    <FaNode />
                </div>
                <div className="techs-text">Node</div>
            </div>
            <div className="techs-cont">
                <div className="techs-icon">
                    <FaGithub />
                </div>
                <div className="techs-text">GitHub</div>
            </div>
            <div className="techs-cont">
                <div className="techs-icon">
                    <FaGit />
                </div>
                <div className="techs-text">Git</div>
            </div>
            <div className="techs-cont">
                <div className="techs-icon">
                    <FaHtml5 />
                </div>
                <div className="techs-text">HTML</div>
            </div>
        </div>
    )
}