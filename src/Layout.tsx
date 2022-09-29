import {Navbar, Container, Nav} from "react-bootstrap"
import {Link, Outlet} from "react-router-dom"


export default function Layout() {
  return (
    <div>
      <Navbar bg="light" expand="lg">
      <Container>
        <Navbar.Brand><i>Concrete Calculator</i></Navbar.Brand>
        <Navbar.Collapse>
          <Nav className="me-auto">
            <Nav.Link as={Link} to="TEKEN466">TEKEN 466</Nav.Link>
            <Nav.Link as={Link} to="PrestressedConcrete">Prestressed Concrete</Nav.Link>
          </Nav>
        </Navbar.Collapse>
      </Container>
      </Navbar>
      <Outlet />
    </div>
  )
}
