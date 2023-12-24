import { GithubStats } from '../APIs/GithubStatsAPI'
import { GHRepos } from './GHRepos'

export const GitHub = () => {
    return (
        <div className="github">
            <h2>My GitHub</h2>
            <GithubStats username="pranshu05" />
            <GHRepos />
        </div>
    )
}
