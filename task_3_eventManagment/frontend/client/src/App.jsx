import React, { useState } from 'react';
import { Link, Route, Routes } from 'react-router-dom';
import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import Home from '../pages/Home';
import CreatePost from '../pages/CreateEvent';
import Login from '../pages/Login';
import EventInfo from '../pages/EventInfo';
import Register from '../pages/Register';
import './App.css';
import 'react-toastify/dist/ReactToastify.css';
function App() {
  const [expanded, setExpanded] = useState(false);

  return (
    <>
      <Navbar bg="dark" variant="dark" expand="lg" expanded={expanded} className="sticky-top" style={{marginBottom:"10px"}}>
        <Container>
          <Navbar.Brand href="#home">Event Management</Navbar.Brand>
          <Navbar.Toggle onClick={() => setExpanded(!expanded)} aria-controls="basic-navbar-nav" />
          <Navbar.Collapse id="basic-navbar-nav">
            <Nav className="me-auto">
              <Nav.Link as={Link} to="/" onClick={() => setExpanded(false)}>Home</Nav.Link>
              <Nav.Link as={Link} to="/Register" onClick={() => setExpanded(false)}>Register</Nav.Link>
              <Nav.Link as={Link} to="/Login" onClick={() => setExpanded(false)}>Login</Nav.Link>
              <Nav.Link as={Link} to="/CreatePost" onClick={() => setExpanded(false)}>Create Event</Nav.Link>
            </Nav>
          </Navbar.Collapse>
        </Container>
      </Navbar>

      <Routes>
        <Route exact path="/" element={<Home />} />
        <Route exact path="/Register" element={<Register />} />
        <Route exact path="/Login" element={<Login />} />
        <Route exact path="/CreatePost" element={<CreatePost />} />
        <Route path="/EventInfo/:id" element={<EventInfo />} /> // Correct parameter name

      </Routes>
    </>
  );
}

export default App;
