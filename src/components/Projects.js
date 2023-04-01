const ProjectCard = ({
    imgSrc,
    projectName,
    projectLangs,
    projectDescription,
}) => {
    return (
        <div className="project-card">
            <div className="project-card-img">
                <img src={imgSrc} alt={projectName} />
            </div>
            <div className="project-card-text">
                <h2>{projectName}</h2>
                <div className="project-lang">
                    <p>{projectLangs}</p>
                </div>
                <p>{projectDescription}</p>
            </div>
        </div>
    )
}

export const Projects = () => {
    return (
        <div className="projects" id="projects">
            <h1>Projects 🛠️</h1>
            <p>I've listed some of my projects below 👇</p>
            <div className="project-cards-container">
                <ProjectCard
                    imgSrc="https://avatars.githubusercontent.com/u/95647824?s=280&v=4"
                    projectName="Elpha"
                    projectLangs="Node, discord.js, MongoDB"
                    projectDescription="Elpha is an open-source bot made with discord.js and hosted on Railway. It is developed with aim to make server moderation easier."
                />
                <ProjectCard
                    imgSrc="https://img.itch.zone/aW1nLzY1OTc2NDAucG5n/original/MjFBYb.png"
                    projectName="Dark Forest"
                    projectLangs="C#, Unity Engine"
                    projectDescription="Dark Forest is a fps game made with C# and Unity Engine."
                />
            </div>
        </div>
    )
}
