export const Projects = () => {
    return (
        <div className="projects">
            <h1>Projects</h1>
            <p>I've listed some of my projects below 👇</p>
            <div className="project-card">
                <div className="project-card-img">
                    <img
                        src="https://avatars.githubusercontent.com/u/95647824?s=280&v=4"
                        alt="elpha"
                    />
                </div>
                <div className="project-card-text">
                    <h2>Elpha</h2>
                    <div className="project-lang">
                        <p>Node, discord.js, MongoDB</p>
                    </div>
                    <p>
                        <a href="https://dsc.gg/elpha">Elpha</a> is an{' '}
                        <a href="https://github.com/pranshu05/elpha">
                            open-source
                        </a>{' '}
                        bot made with discord.js and hosted on{' '}
                        <a href="https://railway.app">Railway</a>. It is
                        developed with aim to make server moderation easier.
                    </p>
                </div>
            </div>
        </div>
    )
}
