import { Navbar, Nav} from 'react-bootstrap';
import logo from '../icons/logo.png';

const NavBar = () => {
    return(
    <Navbar className="nav-transparent" variant="dark" expand='md'>
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav">
        <Nav className="mr-auto">
            <Navbar.Brand href="/">
                <img src={logo} width="70" height="70" className="d-inline-block align-top"/>
            </Navbar.Brand>
            <div id="navbar-buttons">
                <Nav.Link href="/" activeclassname='is-active' className='link-transparent'>Home</Nav.Link>
                <Nav.Link href="/map" activeclassname='is-active' className='link-transparent'>Map</Nav.Link>
                <Nav.Link href="/about" activeclassname='is-active' className='link-transparent'>About</Nav.Link>
                <Nav.Link href="/resources" activeclassname='is-active' className='link-transparent'>Resources</Nav.Link>
            </div>
        </Nav>
        </Navbar.Collapse>
    </Navbar>
    );
}
export default NavBar;
