import React from 'react';
import { Container, Nav, Navbar } from 'react-bootstrap';
import { Routes, Route } from 'react-router-dom';


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
      <Navbar bg="dark">
        <Container>
          <Navbar.Brand href="home">Very Last Byte</Navbar.Brand>
          <Nav className="me-auto">
            <Nav.Link href="home">Home</Nav.Link>
            <Nav.Link href="about">About Me</Nav.Link>
            <Nav.Link href="contact">Contact</Nav.Link>
          </Nav>
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
    <section id="application" data-bs-theme="dark">
      <Navigation />
      <Main />
    </section>
  )
}
