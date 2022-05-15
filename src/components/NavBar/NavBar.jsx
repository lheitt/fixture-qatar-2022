import { Container, Nav, Navbar, NavDropdown } from "react-bootstrap";
import { Outlet, Link } from "react-router-dom";

const NavBar = () => {
    return (
        <>
            <Navbar className="navbar navbar-expand-lg bg-dark" variant="dark" expand="lg">
                <Container>
                    <Navbar.Brand as={Link} to="/">
                        Fixture Qatar 2022
                    </Navbar.Brand>
                    <Navbar.Toggle aria-controls="basic-navbar-nav" />
                    <Navbar.Collapse id="basic-navbar-nav">
                        <Nav className="me-auto">
                            <Nav.Link as={Link} to="/">
                                Inicio
                            </Nav.Link>
                            <Nav.Link as={Link} to="/calendar">Calendario</Nav.Link>
                            <Nav.Link as={Link} to="/stadiums">Sedes</Nav.Link>
                            <Nav.Link as={Link} to="/statistics">Estadísticas</Nav.Link>
                        </Nav>
                    </Navbar.Collapse>
                </Container>
            </Navbar>

            <section>
                <Outlet></Outlet>
            </section>
        </>
    );
};

export default NavBar;
