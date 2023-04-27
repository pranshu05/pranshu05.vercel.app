import { Home } from '../components/Home'
import { NavBar } from '../components/NavBar'
import { useEffect } from 'react'
import axios from 'axios'

export const HomePage = () => {
    useEffect(() => {
        axios.get('https://pranshu05.vercel.app/api/webhook')
    }, [])

    return (
        <div>
            <NavBar />
            <div className="home-page-cont">
                <Home />
            </div>
        </div>
    )
}
