import { Weather } from '../APIs/WeatherAPI'
import { TimeStatus } from '../APIs/TimeStatusAPI'
import { DiscordStatus } from '../APIs/DiscordStatusAPI'

export const Home = () => {
   return (
      <div className="home">
         <h1>Hey, I'm Pranshu!</h1>
         <p>
            FullStack Developer based in{' '}
            <a
               href="https://hi.wikipedia.org/wiki/%E0%A4%AD%E0%A4%BE%E0%A4%B0%E0%A4%A4"
               aria-label="bharat"
               target="_blank"
               rel="noopener noreferrer"
            >
               Bharat
            </a>
            , He/Him
         </p>
         <br />
         <div>
            <TimeStatus /> | <Weather /> | <DiscordStatus />
         </div>
      </div>
   )
}
