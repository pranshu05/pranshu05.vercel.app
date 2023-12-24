import { Home } from '../components/Home'
import { NavBar } from '../components/NavBar'
import GitHubLastUpdated from '../components/LastUpdated'
import { useEffect } from 'react'
import axios from 'axios'

export const HomePage = () => {
    useEffect(() => {
        axios.get('https://pranshu05.vercel.app/api/webhook')
    }, [])

    return (
        <div>
            <NavBar />
            <div className="grad-bg" />
            <div className="grain" />
            <div className="home-page-cont">
                <Home />
                <GitHubLastUpdated />
            </div>
        </div>
    )
}
