import { Home } from '../components/Home'
import { NavBar } from '../components/NavBar'
import GitHubLastUpdated from '../components/LastUpdated';

export const HomePage = () => {
   return (
      <div>
         <NavBar />
         <div className="home-page-cont">
            <Home />
            <GitHubLastUpdated />
         </div>
      </div>
   )
}
