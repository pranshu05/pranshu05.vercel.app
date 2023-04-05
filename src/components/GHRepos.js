import React from 'react'
import { GithubRepo } from '../APIs/GithubRepoAPI'

export const GHRepos = () => {
    const repos = [
        'pranshu05/Elpha',
        'pranshu05/Chrome-Dino-game-AI',
        'pranshu05/game',
        'pranshu05/iss',
    ]

    return (
        <div className="gh-repo-cont">
            {repos.map((repo) => (
                <GithubRepo
                    repoName={repo}
                    key={repo}
                    className="github-repo"
                />
            ))}
        </div>
    )
}
