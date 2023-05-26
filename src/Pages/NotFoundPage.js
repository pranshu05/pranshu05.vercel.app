import { Link } from 'react-router-dom'

const NotFoundPage = () => {
   return (
      <div className="not-page-cont">
         <div className="not-page-all">
            <h2>404 Page Not Found</h2>
            <img
               src="https://seranking.com/blog/wp-content/uploads/2021/01/404_01-min.jpg"
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
