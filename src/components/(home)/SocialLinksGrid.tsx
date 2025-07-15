import { SiGithub, SiInstagram, SiLinkedin, SiNpm, SiProducthunt, SiTwitter, SiYoutube } from "react-icons/si"

const socialLinks = [
    { href: "https://github.com/pranshu05", icon: <SiGithub /> },
    { href: "https://linkedin.com/in/pranshu05", icon: <SiLinkedin /> },
    { href: "https://twitter.com/pranshu_05", icon: <SiTwitter /> },
    { href: "https://instagram.com/pranshu.05", icon: <SiInstagram /> },
    { href: "https://youtube.com/@pranshu05", icon: <SiYoutube /> },
    { href: "https://www.npmjs.com/~pranshu05", icon: <SiNpm /> },
    { href: "https://www.producthunt.com/@pranshu05", icon: <SiProducthunt /> }
]

const SocialLinksGrid: React.FC = () => (
    <div className="flex flex-wrap gap-4">
        {socialLinks.map((item, index) => (
            <a key={index} href={item.href} target="_blank" rel="noopener noreferrer" className="flex items-center text-zinc-400 hover:text-zinc-100 transition-colors text-xl" aria-label={`Link to ${item.href.split('//')[1]}`}>{item.icon}</a>
        ))}
    </div>
)

export default SocialLinksGrid