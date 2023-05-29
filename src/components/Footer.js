import React from 'react'
import { FaGithub, FaTwitter, FaLinkedin, FaDiscord } from 'react-icons/fa'

export const Footer = () => {
   return (
      <footer>
         <div className="left">
            <p>
               <a
                  href="https://github.com/pranshu05"
                  aria-label="github"
                  target="_blank"
                  rel="noopener noreferrer"
               >
                  Pranshu Patel
               </a>{' '}
               | &copy; {new Date().getFullYear()}
            </p>
         </div>
         <div className="right">
            <a
               href="https://github.com/pranshu05"
               aria-label="github"
               target="_blank"
               rel="noopener noreferrer"
            >
               <FaGithub />
            </a>
            <a
               href="https://twitter.com/pranshu_05"
               aria-label="twitter"
               target="_blank"
               rel="noopener noreferrer"
            >
               <FaTwitter />
            </a>
            <a
               href="https://www.linkedin.com/in/pranshu05"
               aria-label="linkedin"
               target="_blank"
               rel="noopener noreferrer"
            >
               <FaLinkedin />
            </a>
            <a
               href="https://discord.gg/aGrgpT8nmZ"
               aria-label="discord"
               target="_blank"
               rel="noopener noreferrer"
            >
               <FaDiscord />
            </a>
         </div>
      </footer>
   )
}
