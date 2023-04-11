import {
    FaDev,
    FaDiscord,
    FaGithub,
    FaInstagram,
    FaLastfm,
    FaNpm,
    FaReddit,
    FaSpotify,
    FaTwitter,
} from 'react-icons/fa'
import { SiBuymeacoffee } from 'react-icons/si'

export const Links = () => {
    const links = [
        {
            text: 'Dicord',
            icon: <FaDiscord />,
            href: 'https://discordapp.com/users/754381104034742415',
        },
        {
            text: 'GitHub',
            icon: <FaGithub />,
            href: 'https://github.com/pranshu05',
        },
        {
            text: 'Instagram',
            icon: <FaInstagram />,
            href: 'https://instagram.com/pranshu.05',
        },
        {
            text: 'Twitter',
            icon: <FaTwitter />,
            href: 'https://twitter.com/pranshu_05',
        },
        {
            text: 'Spotify',
            icon: <FaSpotify />,
            href: 'https://open.spotify.com/user/awgtjjqdxae0pw5as3bcadxcd',
        },
        {
            text: 'Last.fm',
            icon: <FaLastfm />,
            href: 'https://www.last.fm/user/pranshu05',
        },
        {
            text: 'Reddit',
            icon: <FaReddit />,
            href: 'https://www.reddit.com/user/pranshu2005',
        },
        {
            text: 'Dev.to',
            icon: <FaDev />,
            href: 'https://dev.to/pranshu05',
        },
        {
            text: 'npm',
            icon: <FaNpm />,
            href: 'https://www.npmjs.com/~pranshu05',
        },
        {
            text: 'BuyMeaCoffe',
            icon: <SiBuymeacoffee />,
            href: 'https://www.buymeacoffee.com/Pranshu05',
        },
    ]

    return (
        <div className="Links">
            <h1 style={{ textAlign: 'center' }}>My Links</h1>
            <div className="links-cont">
                {links.map((link) => (
                    <a
                        className="links-link"
                        href={link.href}
                        target="_blank"
                        rel="noopener noreferrer"
                        key={link.text}
                    >
                        <div className="links-link-text">{link.text}</div>
                        <div className="links-link-icon">{link.icon}</div>
                    </a>
                ))}
            </div>
        </div>
    )
}
