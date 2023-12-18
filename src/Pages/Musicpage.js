import { NavBar } from '../components/NavBar'
import { Footer } from '../components/Footer'
import { Music } from '../components/Music'
import { Link } from 'react-router-dom'

export const MusicPage = () => {
   return (
      <div>
         <NavBar />
         <div className='grad-bg' />
         <div className='banner' style={{backgroundImage:'url("https://i.imgur.com/98DHuSX.png")'}}>
            <h1>Listening Activity</h1>
         </div>
         <div className="music-page-cont">
            <p className="go-back-home">
               &larr; <Link to="/">home.</Link>
            </p>
            <Music />
            <Footer />
         </div>
      </div>
   )
}
