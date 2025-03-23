import { Github, Instagram, Linkedin, Twitter } from "lucide-react"

const socialLinks = [
    { href: "https://github.com/pranshu05", icon: <Github />},
    { href: "https://linkedin.com/in/pranshu05", icon: <Linkedin />},
    { href: "https://twitter.com/pranshu_05", icon: <Twitter /> },
    { href: "https://instagram.com/pranshu.05", icon: <Instagram /> },
]

const SocialLinksGrid: React.FC = () => (
    <div className="flex flex-wrap gap-3">
        {socialLinks.map((item, index) => (
            <a key={index} href={item.href} target="_blank" rel="noopener noreferrer" className="flex items-center gap-2 text-zinc-400 hover:text-zinc-100 transition-colors text-sm" aria-label={`Link to ${item.href.split('//')[1]}`}>{item.icon}</a>
        ))}
    </div>
)

export default SocialLinksGrid