import { GoLinkExternal } from 'react-icons/go'

const ProjectCard = ({
   imgSrc,
   projectName,
   projectLangs,
   projectDescription,
   projectLink,
}) => {
   return (
      <div className="project-card">
         <div className="project-card-img">
            <img src={imgSrc} alt={projectName} width="" height="" />
         </div>
         <div className="project-card-text">
            <h2>
               <a href={projectLink} target="_blank" rel="noopener noreferrer">
                  {projectName} <GoLinkExternal />
               </a>
            </h2>
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
         <h2>Projects 🛠️</h2>
         <p>I've listed some of my projects below 👇</p>
         <div className="project-cards-container">
            <ProjectCard
               imgSrc="https://avatars.githubusercontent.com/u/95647824?s=280&v=4"
               projectName="Elpha"
               projectLangs="Node, discord.js, MongoDB"
               projectDescription="Elpha is a verified bot made with discord.js and hosted on Railway. Its development aims to make server moderation easier."
               projectLink="https://dsc.gg/elpha"
            />
            <ProjectCard
               imgSrc="https://img.itch.zone/aW1nLzY1OTc2NDAucG5n/original/MjFBYb.png"
               projectName="Dark Forest"
               projectLangs="C#, Unity Engine"
               projectDescription="Dark Forest is a fps game made with C# and Unity Engine."
               projectLink="https://pranshu05.itch.io/df"
            />
            <ProjectCard
               imgSrc="https://images-ext-1.discordapp.net/external/onODAhJidPfekpmsRhD2NuUVhGwLvMVOOCk0HRAK8Go/%3Fsize%3D2048/https/cdn.discordapp.com/avatars/1079000764204204052/637bfc2c6f484c9d9e753a0a0243541b.webp?width=616&height=616"
               projectName="Anti Ghost Ping"
               projectLangs="Node, discord.js, MongoDB"
               projectDescription="Powerful and open-source ghost ping detection bot! This bot can efficiently detect ghost pings in every channel of your server, and it even comes with a redirect message system. With this feature, you can easily keep track of all the ghost pings in your server without any hassle!"
               projectLink="https://dsc.gg/agp"
            />
         </div>
      </div>
   )
}
