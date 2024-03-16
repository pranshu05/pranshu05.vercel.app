import { FaGithub, FaInstagram, FaLinkedin, FaTwitter } from 'react-icons/fa';

const socialLinks = [
    { href: 'https://github.com/pranshu05', icon: <FaGithub />, text: 'GitHub' },
    { href: 'https://linkedin.com/in/pranshu05', icon: <FaLinkedin />, text: 'LinkedIn' },
    { href: 'https://twitter.com/pranshu_05', icon: <FaTwitter />, text: 'Twitter' },
    { href: 'https://instagram.com/pranshu.05', icon: <FaInstagram />, text: 'Instagram' },
];

const SocialLinksGrid: React.FC = () => (
    <div className="my-4 grid gap-2 md:gap-4 grid-cols-2 sm:grid-cols-4 mx-auto">
        {socialLinks.map((item, index) => (
            <div key={index} className="border border-zinc-700 rounded-lg p-2">
                <a href={item.href} target="_blank" rel="noopener noreferrer" className="link flex gap-2 items-center justify-center"> {item.icon} {item.text}</a>
            </div>
        ))}
    </div>
);

export default SocialLinksGrid;