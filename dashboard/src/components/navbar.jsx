import { Navbar, Nav} from 'react-bootstrap';
import logo from '../icons/logo.png';

const NavBar = ({ variant }) => {
    return(
    <Navbar variant={variant} expand='md'>
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav">
        <Nav className="d-flex justify-content-between align-items-center w-100">
            <Navbar.Brand href="/">
                <img src={logo} alt="CalSound Logo" width="50" height="50" className="d-inline-block align-top"/>
            </Navbar.Brand>
            <div className="d-flex justify-content-between">
                <Nav.Link href="/">Home</Nav.Link>
                <Nav.Link href="/map">Map</Nav.Link>
                <Nav.Link href="/about">About</Nav.Link>
                <Nav.Link href="/resources">Resources</Nav.Link>
            </div>
        </Nav>
        </Navbar.Collapse>
    </Navbar>
    );
}
export default NavBar;
