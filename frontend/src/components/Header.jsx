import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faVideoSlash } from "@fortawesome/free-solid-svg-icons";
import {Button, Container, Nav, Navbar} from "react-bootstrap"
import {NavLink} from "react-router-dom";

const Header = ({ isAuthenticated, onLogout }) => {

    console.log(isAuthenticated);

  return (

    <Navbar bg="dark" variant="dark" expand="lg">
        <Container fluid>
            <Navbar.Brand href="/" style={{"color":'gold'}}>
                <FontAwesomeIcon icon ={faVideoSlash}/>Gold
            </Navbar.Brand>
            <Navbar.Toggle aria-controls="navbarScroll" />
            <Navbar.Collapse id="navbarScroll">
                <Nav
                    className="me-auto my-2 my-lg-0"
                    style={{maxHeight: '100px'}}
                    navbarScroll
                >
                    <NavLink className ="nav-link" to="/">Home</NavLink>
                    <NavLink className="nav-link" to="/movies">Movies</NavLink>
                    {/* <NavLink className="nav-link" to="/movies" end>Movies</NavLink> */}
                    <NavLink className ="nav-link" to="/tv">TV Shows</NavLink>
                    <NavLink className ="nav-link" to="/watchList">Watch List</NavLink>      
                </Nav>
                {/* <Button href="/login" variant="outline-info" className="me-2">Login</Button>
                <Button href="/login" variant="outline-info">Register</Button> */}
                {isAuthenticated ? (
                    <Button href="/login" onClick={onLogout} variant="outline-info">Logout</Button>
                    ) : (
                    <>
                        <Button href="/login" variant="outline-info" className="me-2">Login</Button>
                        <Button href="/login" variant="outline-info">Register</Button>
                    </>
                )}
            </Navbar.Collapse>
        </Container>

    </Navbar>

  )
}

export default Header