import Button from "react-bootstrap/Button";
import Nav from "react-bootstrap/Nav";

function Navbar() {
  return (
    <Nav className="navbar fixed-top navbar-expand-md bg-secondary">
      <div className="container-fluid">
        <a href="#" className="navbar-brand">
          <i className="bi bi-pencil-square px-3"></i>
          Schedule Application
        </a>
        <Button
          className="navbar-toggler"
          type="button"
          data-bs-toggle="collapse"
          data-bs-target="#navbarNavDropdown"
          aria-controls="navbarNavDropdown"
          aria-expanded="false"
          aria-label="Toggle navigation"
        >
          <span className="navbar-toggler-icon"></span>
        </Button>
        <div className="collapse navbar-collapse" id="navbarNavDropdown">
          <ul className="navbar-nav">
            <li className="nav-item">
              <a className="nav-link active" aria-current="page" href="#">
                Home
              </a>
            </li>
            <li className="nav-item">
              <a className="nav-link gx-4" href="#">
                Schedule
              </a>
            </li>
            <li className="nav-item">
              <a className="nav-link gx-4" href="#">
                Goals
              </a>
            </li>
            <li className="nav-item">
              <a className="nav-link gx-4" href="#">
                Habits
              </a>
            </li>
            <li className="nav-item">
              <a className="nav-link gx-4" href="">
                To-Do
              </a>
            </li>
            <li className="nav-item">
              <a className="nav-link gx-4" href="">
                Log In
              </a>
            </li>
          </ul>
        </div>
      </div>
    </Nav>
  );
}

export default Navbar;
