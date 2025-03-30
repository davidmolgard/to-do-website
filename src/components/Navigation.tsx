import { Button, Container, Nav, Navbar } from "react-bootstrap";
import { NavLink } from "react-router-dom";

function Navigation() {
  return (
    <Navbar expand="md" fixed="top" bg="secondary">
      <Container>
        <Navbar.Brand href="#">
          <i className="bi bi-pencil-square pe-3"></i>
          Schedule Application
        </Navbar.Brand>
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav">
          <Nav className="ms-auto">
            <NavLink className="nav-link" to="/">Home</NavLink>
            <NavLink className="nav-link" to="/schedule">Schedule</NavLink>
            <NavLink className="nav-link" to="/goals">Goals</NavLink>
            <NavLink className="nav-link" to="/habits">Habits</NavLink>
            <NavLink className="nav-link" to="/todo">To-Do</NavLink>
          </Nav>
          <Nav className="ms-auto">
            <Button className="bg-accent">Login</Button>
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
}

export default Navigation;
