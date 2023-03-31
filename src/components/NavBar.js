import { useState, useEffect } from 'react'
import { Navbar, Nav, Container } from 'react-bootstrap'

export const NavBar = () => {
    const [activeLink, setActiveLink] = useState('about-me')
    const [scrolled, setScrolled] = useState(false)

    useEffect(() => {
        const onScroll = () => {
            if (window.scrollY > 50) {
                setScrolled(true)
            } else {
                setScrolled(false)
            }
        }

        window.addEventListener('scroll', onScroll)

        return () => window.removeEventListener('scroll', onScroll)
    }, [])

    const onUpdateActiveLink = (value) => {
        setActiveLink(value)
    }

    return (
        <Navbar expand="md" className={scrolled ? 'scrolled' : ''}>
            <Container>
                <Navbar.Collapse id="basic-navbar-nav">
                    <Nav className="ms-auto">
                        <Nav.Link
                            href="#about-me"
                            className={
                                activeLink === 'about-me'
                                    ? 'active navbar-link'
                                    : 'navbar-link'
                            }
                            onClick={() => onUpdateActiveLink('about-me')}
                        >
                            About Me
                        </Nav.Link>
                        <Nav.Link
                            href="#skills"
                            className={
                                activeLink === 'skills'
                                    ? 'active navbar-link'
                                    : 'navbar-link'
                            }
                            onClick={() => onUpdateActiveLink('skills')}
                        >
                            Skills
                        </Nav.Link>
                        <Nav.Link
                            href="#projects"
                            className={
                                activeLink === 'projects'
                                    ? 'active navbar-link'
                                    : 'navbar-link'
                            }
                            onClick={() => onUpdateActiveLink('projects')}
                        >
                            Projects
                        </Nav.Link>
                    </Nav>
                </Navbar.Collapse>
            </Container>
        </Navbar>
    )
}
