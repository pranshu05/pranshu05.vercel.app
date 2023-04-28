import React, { useState, useEffect } from 'react'

export const GithubStats = ({ username }) => {
   const [reposData, setReposData] = useState([])
   const [userData, setUserData] = useState({})
   const [totalStars, setTotalStars] = useState(0)
   const [totalForks, setTotalForks] = useState(0)
   const [totalFollowers, setTotalFollowers] = useState(0)

   useEffect(() => {
      const fetchData = async () => {
         const [reposResult, userResult] = await Promise.all([
            fetch(`https://api.github.com/users/${username}/repos`),
            fetch(`https://api.github.com/users/${username}`),
         ])
         const reposJson = await reposResult.json()
         const userJson = await userResult.json()
         setReposData(reposJson)
         setUserData(userJson)
      }
      fetchData()
   }, [username])

   useEffect(() => {
      let stars = 0
      let forks = 0
      let followers = userData.followers || 0
      reposData.forEach((repo) => {
         stars += repo.stargazers_count
         forks += repo.forks_count
      })
      setTotalStars(stars)
      setTotalForks(forks)
      setTotalFollowers(followers)
   }, [reposData, userData])

   return (
      <div>
         <p>
            I enjoy working on various programming projects in my free time,
            including developing Discord bots, web development, and contributing
            to open-source projects. To showcase my programming skills and
            experience, I have made many repos on my{' '}
            <a href="https://github.com/pranshu05">GitHub</a>. I have a total of{' '}
            <mark className="highlight">{totalFollowers} followers</mark>, and
            my repositories have earned a total of{' '}
            <mark className="highlight">{totalStars} stars</mark> and{' '}
            <mark className="highlight">{totalForks} forks</mark>.
         </p>
      </div>
   )
}
