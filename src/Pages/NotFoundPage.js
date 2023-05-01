import { useEffect } from 'react'
import axios from 'axios'
import { Link } from 'react-router-dom'

const NotFoundPage = () => {
   useEffect(() => {
      axios.get('https://pranshu05.vercel.app/api/webhook')
   }, [])

   return (
      <div className="not-page-cont">
         <h1>404 Page Not Found</h1>
         <img
            src="https://seranking.com/blog/wp-content/uploads/2021/01/404_01-min.jpg"
            alt=""
         />
         <p>
            The page you were looking for does not exist,{' '}
            <Link to="/">Click here</Link> to go to the homepage.
         </p>
      </div>
   )
}

export default NotFoundPage
