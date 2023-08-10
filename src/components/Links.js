import {
   FaDev,
   FaDiscord,
   FaGithub,
   FaInstagram,
   FaLastfm,
   FaLinkedin,
   FaNpm,
   FaReddit,
   FaSpotify,
   FaTwitter,
} from 'react-icons/fa'
import { SiBuymeacoffee } from 'react-icons/si'

export const Links = () => {
   const links = [
      {
         text: 'Discord',
         username: ' // @Pranshu05#4726',
         icon: <FaDiscord />,
         href: 'https://discordapp.com/users/754381104034742415',
      },
      {
         text: 'GitHub',
         username: ' // @pranshu05',
         icon: <FaGithub />,
         href: 'https://github.com/pranshu05',
      },
      {
         text: 'Instagram',
         username: ' // @pranshu.05',
         icon: <FaInstagram />,
         href: 'https://instagram.com/pranshu.05',
      },
      {
         text: 'LinkedIn',
         username: ' // @pranshu05',
         icon: <FaLinkedin />,
         href: 'https://linkedin.com/in/pranshu05',
      },
      {
         text: 'Twitter',
         username: ' // @pranshu_05',
         icon: <FaTwitter />,
         href: 'https://twitter.com/pranshu_05',
      },
      {
         text: 'Spotify',
         username: ' // @!pranshu05',
         icon: <FaSpotify />,
         href: 'https://open.spotify.com/user/awgtjjqdxae0pw5as3bcadxcd',
      },
      {
         text: 'Last.fm',
         username: ' // @pranshu05',
         icon: <FaLastfm />,
         href: 'https://www.last.fm/user/pranshu05',
      },
      {
         text: 'Reddit',
         username: ' // @pranshu2005',
         icon: <FaReddit />,
         href: 'https://www.reddit.com/user/pranshu2005',
      },
      {
         text: 'Dev.to',
         username: ' // @pranshu05',
         icon: <FaDev />,
         href: 'https://dev.to/pranshu05',
      },
      {
         text: 'npm',
         username: ' // @pranshu05',
         icon: <FaNpm />,
         href: 'https://www.npmjs.com/~pranshu05',
      },
      {
         text: 'BuyMeaCoffe',
         username: ' // @pranshu05',
         icon: <SiBuymeacoffee />,
         href: 'https://www.buymeacoffee.com/Pranshu05',
      },
   ]

   return (
      <div className="Links">
         <h1>My Socials</h1>
         <div className="links-cont">
            {links.map((link) => (
               <a
                  className="links-link"
                  href={link.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  key={link.text}
                  aria-label={link.text}
               >
                  <div className="links-link-text">
                     {link.text}
                     <span className="username">{link.username}</span>
                  </div>
                  <div className="links-link-icon">{link.icon}</div>
               </a>
            ))}
         </div>
      </div>
   )
}
