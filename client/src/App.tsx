import React from 'react';
import { Container, Image, Nav, Navbar } from 'react-bootstrap';
import { Routes, Route } from 'react-router-dom';

// Import common utilities from here.
import { displayPreferredTheme, getPreferredThemeIcon, togglePreferredTheme } from './common/theme';
import { hasCurrentView } from './common/view';

// Import application views from here.
import About from './views/About';
import Contact from './views/Contact';
import Home from './views/Home';

/**
 * Brokers the main `view` rendered to the user.
 */
export function Main() {
    return (
        <Routes>
            <Route path='/'        Component={Home}></Route>
            <Route path='/about'   Component={About}></Route>
            <Route path='/contact' Component={Contact}></Route>
            <Route path='/home'    Component={Home}></Route>
        </Routes>
    )
}

/**
 * Navigation bar for better travel between pages
 * or `views`.
 */
export function Navigation() {
  return (
    <>
      <Navbar bg={displayPreferredTheme()} sticky="top">
        <Container>
          <Navbar.Brand href="home">Very Last Byte</Navbar.Brand>
          <Nav className="me-auto">
            <Nav.Link
                href="/home"
                active={hasCurrentView("/home")}>Home
            </Nav.Link>
            <Nav.Link
                href="/about"
                active={hasCurrentView("/about")}>About Me
            </Nav.Link>
            <Nav.Link
                href="/contact"
                active={hasCurrentView("/contact")}>Contact
            </Nav.Link>
          </Nav>
          <Image
              onClick={togglePreferredTheme}
              src={getPreferredThemeIcon()}
              id="theme-toggle-button"
              roundedCircle>
          </Image>
        </Container>
      </Navbar>
    </>
  )
}

/**
 * Represents the entire application as a whole.
 */
export default function App() {
  return (
    <section id="application" data-bs-theme={displayPreferredTheme()}>
      <Navigation />
      <Main />
    </section>
  )
}
