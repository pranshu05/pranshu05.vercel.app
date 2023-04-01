import { GithubStats } from '../APIs/GithubStats'
import { GHRepos } from './GHRepos'

export const GitHub = () => {
    return (
        <div className="github">
            <h1>My GitHub</h1>
            <GithubStats username="pranshu05" />
            <GHRepos />
        </div>
    )
}
