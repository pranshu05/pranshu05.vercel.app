import { useState, useEffect } from 'react'
import { Navbar, Nav, Container } from 'react-bootstrap'
import { useLocation } from 'react-router-dom'

export const NavBar = () => {
    const location = useLocation()
    const [activeLink, setActiveLink] = useState('home')
    const [scrolled, setScrolled] = useState(false)

    useEffect(() => {
        const { pathname } = location
        if (pathname === '/') {
            setActiveLink('home')
        } else {
            setActiveLink(pathname.substring(1))
        }
    }, [location])

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

    return (
        <Navbar expand="md" className={scrolled ? 'scrolled' : ''}>
            <Container>
                <Navbar.Collapse id="basic-navbar-nav">
                    <Nav className="ms-auto">
                        <Nav.Link
                            href="/"
                            className={
                                activeLink === 'home'
                                    ? 'active navbar-link'
                                    : 'navbar-link'
                            }
                            onClick={() => setActiveLink('home')}
                        >
                            Home
                        </Nav.Link>
                        <Nav.Link
                            href="/about"
                            className={
                                activeLink === 'about'
                                    ? 'active navbar-link'
                                    : 'navbar-link'
                            }
                            onClick={() => setActiveLink('about')}
                        >
                            About
                        </Nav.Link>
                        <Nav.Link
                            href="/contact"
                            className={
                                activeLink === 'contact'
                                    ? 'active navbar-link'
                                    : 'navbar-link'
                            }
                            onClick={() => setActiveLink('contact')}
                        >
                            Contact
                        </Nav.Link>
                    </Nav>
                </Navbar.Collapse>
            </Container>
        </Navbar>
    )
}
