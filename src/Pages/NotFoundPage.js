import { Link } from 'react-router-dom'
import { useEffect } from 'react'
import axios from 'axios'

const NotFoundPage = () => {
    useEffect(() => {
        axios.get('https://pranshu05.vercel.app/api/webhook')
    }, [])

    return (
        <div className="not-page-cont">
            <div className="not-page-all">
                <h1>404 Page Not Found</h1>
                <img
                    src="https://github.com/pranshu05/pranshu05.vercel.app/assets/70943732/ecd7bd4a-5a76-4cbd-bb55-1b6e776b3659"
                    alt=""
                />
                <p>
                    The page you were looking for does not exist,{' '}
                    <Link to="/" aria-label="home">
                        Click here
                    </Link>{' '}
                    to go to the homepage.
                </p>
            </div>
        </div>
    )
}

export default NotFoundPage
