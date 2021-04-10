import { Navbar, Nav, Container } from 'react-bootstrap';
import { Link } from 'react-router-dom';

import './mainLayout.css';

function MainLayout({ children }) {
  return (
    <div className="main-layout">
      <Navbar bg="light" expand="lg">
        <Container>
          <Navbar.Brand href="#home">mindX Image</Navbar.Brand>
          <Navbar.Toggle aria-controls="basic-navbar-nav" />
          <Navbar.Collapse id="basic-navbar-nav">
            <Nav className="mr-auto">
              <Nav.Item className="mx-2">
                <Link to="/login">Login</Link>
              </Nav.Item>
              <Nav.Item className="mx-2">
                <Link to="/signup">Signup</Link>
              </Nav.Item>
            </Nav>
          </Navbar.Collapse>
        </Container>
      </Navbar>
      <div className="content">
        <Container>{children}</Container>
      </div>
    </div>
  );
}

export default MainLayout;
