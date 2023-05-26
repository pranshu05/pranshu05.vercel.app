import { Home } from '../components/Home'
import { NavBar } from '../components/NavBar'

export const HomePage = () => {
   return (
      <div>
         <NavBar />
         <div className="home-page-cont">
            <Home />
         </div>
      </div>
   )
}
