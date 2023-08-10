import React, { useState, useEffect } from 'react';
import { Navbar, Nav, Container } from 'react-bootstrap';
import { useLocation } from 'react-router-dom';
import { Link } from 'react-router-dom';
import {
   FaCamera,
   FaEnvelope,
   FaHeadphones,
   FaHome,
   FaLink,
   FaUser,
} from 'react-icons/fa';

export const NavBar = () => {
   const location = useLocation();
   const [activeLink, setActiveLink] = useState('home');
   const [scrolled, setScrolled] = useState(false);
   const [userActive, setUserActive] = useState(true); 

   useEffect(() => {
      const { pathname } = location;
      if (pathname === '/') {
         setActiveLink('home');
      } else {
         setActiveLink(pathname.substring(1));
      }
   }, [location]);

   useEffect(() => {
      let timeoutId;

      const onScroll = () => {
         if (window.scrollY > 50) {
            setScrolled(true);
            setUserActive(true);

            clearTimeout(timeoutId);
            timeoutId = setTimeout(() => {
               setUserActive(false);
            }, 2200); 
         } else {
            setScrolled(false);
         }
      };

      const onMouseMove = () => {
         setUserActive(true);

         clearTimeout(timeoutId);
         timeoutId = setTimeout(() => {
            setUserActive(false);
         }, 2200); 
      };

      window.addEventListener('scroll', onScroll);
      window.addEventListener('mousemove', onMouseMove);

      return () => {
         window.removeEventListener('scroll', onScroll);
         window.removeEventListener('mousemove', onMouseMove);
         clearTimeout(timeoutId);
      };
   }, []);

   useEffect(() => {
      window.scrollTo(0, 0);
   }, [activeLink]);

   return (
      <Navbar expand="md" className={scrolled && userActive ? 'navbar scrolled active' : userActive ? 'navbar active' : 'navbar'}>
         <Container>
            <Navbar.Collapse id="basic-navbar-nav">
               <Nav className="ms-auto">
                  <Nav.Link
                     as={Link}
                     aria-label="home"
                     to="/"
                     className={
                        activeLink === 'home'
                           ? 'active navbar-link'
                           : 'navbar-link'
                     }
                     onClick={() => setActiveLink('home')}
                  >
                     <FaHome />
                  </Nav.Link>
                  <Nav.Link
                     as={Link}
                     aria-label="about"
                     to="/about"
                     className={
                        activeLink === 'about'
                           ? 'active navbar-link'
                           : 'navbar-link'
                     }
                     onClick={() => setActiveLink('about')}
                  >
                     <FaUser />
                  </Nav.Link>
                  <Nav.Link
                     as={Link}
                     aria-label="gallery"
                     to="/gallery"
                     className={
                        activeLink === 'gallery'
                           ? 'active navbar-link'
                           : 'navbar-link'
                     }
                     onClick={() => setActiveLink('gallery')}
                  >
                     <FaCamera />
                  </Nav.Link>
                  <Nav.Link
                     as={Link}
                     aria-label="links"
                     to="/links"
                     className={
                        activeLink === 'links'
                           ? 'active navbar-link'
                           : 'navbar-link'
                     }
                     onClick={() => setActiveLink('links')}
                  >
                     <FaLink />
                  </Nav.Link>
                  <Nav.Link
                     as={Link}
                     aria-label="music"
                     to="/music"
                     className={
                        activeLink === 'music'
                           ? 'active navbar-link'
                           : 'navbar-link'
                     }
                     onClick={() => setActiveLink('music')}
                  >
                     <FaHeadphones />
                  </Nav.Link>
                  <Nav.Link
                     as={Link}
                     aria-label="contact"
                     to="/contact"
                     className={
                        activeLink === 'contact'
                           ? 'active navbar-link'
                           : 'navbar-link'
                     }
                     onClick={() => setActiveLink('contact')}
                  >
                     <FaEnvelope />
                  </Nav.Link>
               </Nav>
            </Navbar.Collapse>
         </Container>
      </Navbar>
   );
}
