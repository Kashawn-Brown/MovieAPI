import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faVideoSlash } from "@fortawesome/free-solid-svg-icons";
import {Button, Container, Nav, Navbar, Dropdown} from "react-bootstrap"
import React, { useState, useEffect } from 'react';
import {NavLink, useNavigate, useLocation} from "react-router-dom";
import {jwtDecode} from 'jwt-decode';

const Header = () => {

    const navigate = useNavigate();
    const location = useLocation();

    const [user, setUser] = useState(JSON.parse(localStorage.getItem('User')))

    //Check for user token
    useEffect(() => {
        // console.log('Location changed:', location.pathname);
        // console.log('User:', user);

        setUser(JSON.parse(localStorage.getItem('User')))
        const jwtToken = user?.token

        if(jwtToken) 
        {
            const decodedToken = jwtDecode(jwtToken);        
            if (decodedToken.exp * 1000 < new Date().getTime()) logout();
        }
  }, [location]);

  const handleLogout = () => {
    localStorage.removeItem('User');
    setUser(null)
    navigate(`/login`) // Go to login page
  };

  const logout = () => {
    localStorage.removeItem('User');
    setUser(null)
  };

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
                    <NavLink className ="nav-link" to="/tv">TV Shows</NavLink>
                    <NavLink className ="nav-link" to="/watchList">Watch List</NavLink>      
                </Nav>

                {user ? (
                    <>
                        <Dropdown drop="start">
                            <Dropdown.Toggle variant="outline-info" id="dropdown-basic" >
                                Profile
                            </Dropdown.Toggle>
                            <Dropdown.Menu>
                                <Dropdown.Item href="#">My Account</Dropdown.Item>
                                <Dropdown.Item as="button" onClick={handleLogout} > Logout </Dropdown.Item>
                            </Dropdown.Menu>
                        </Dropdown>
                    </>
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