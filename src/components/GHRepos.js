import React from 'react'
import { GithubRepo } from '../APIs/GithubRepoAPI'

export const GHRepos = () => {
   const repos = [
      'pranshu05/Elpha',
      'pranshu05/Chrome-Dino-game-AI',
      'pranshu05/spotify-activity',
      'pranshu05/game',
      'pranshu05/AcadVault2.0',
      'pranshu05/Anti-Ghost-Ping',
   ]

   return (
      <div className="gh-repo-cont">
         {repos.map((repo) => (
            <GithubRepo repoName={repo} key={repo} className="github-repo" />
         ))}
      </div>
   )
}
