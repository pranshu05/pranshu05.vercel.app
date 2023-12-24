import { Weather } from '../APIs/WeatherAPI'
import { TimeStatus } from '../APIs/TimeStatusAPI'
import { DiscordStatus } from '../APIs/DiscordStatusAPI'

export const Home = () => {
    return (
        <div className="home">
            <h1>Hey, I'm Pranshu!</h1>
            <p>
                B.Tech ICT fresher {''}
                <a
                    href="https://daiict.ac.in"
                    aria-label="daiict"
                    target="_blank"
                    rel="noopener noreferrer"
                >
                    @DA-IICT
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
