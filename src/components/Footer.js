import React from 'react'
import { FaGithub, FaTwitter, FaLinkedin, FaDiscord } from 'react-icons/fa'

export const Footer = () => {
    return (
        <footer>
            <div className="left">
                <p>
                    <a href="https://github.com/pranshu05">Pranshu Patel</a> |
                    &copy; {new Date().getFullYear()}
                </p>
            </div>
            <div className="right">
                <a href="https://github.com/pranshu05">
                    <FaGithub />
                </a>
                <a href="https://twitter.com/pranshu_05">
                    <FaTwitter />
                </a>
                <a href="https://www.linkedin.com/in/pranshu05">
                    <FaLinkedin />
                </a>
                <a href="https://discord.gg/aGrgpT8nmZ">
                    <FaDiscord />
                </a>
            </div>
        </footer>
    )
}
