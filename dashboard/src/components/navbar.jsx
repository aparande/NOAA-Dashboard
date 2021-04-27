import { Navbar, Nav} from 'react-bootstrap';
import logo from '../icons/logo.png';

const NavBar = () => {
    return(
    <Navbar id="navbar" variant="dark" expand='md'>
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav">
        <Nav className="mr-auto">
            <Navbar.Brand href="/">
                <img src={logo} width="40" height="40" className="d-inline-block align-top"/>
            </Navbar.Brand>
            <div id="navbar-buttons">
                <Nav.Link href="/">Home</Nav.Link>
                <Nav.Link href="/map">Map</Nav.Link>
                <Nav.Link href="/about">About</Nav.Link>
            </div>
        </Nav>
        </Navbar.Collapse>
    </Navbar>
    );
}
export default NavBar;
