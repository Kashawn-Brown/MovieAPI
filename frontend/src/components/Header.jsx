import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faVideoSlash } from "@fortawesome/free-solid-svg-icons";
import {Button, Container, Nav, Navbar, Dropdown} from "react-bootstrap"
import React, { useState, useEffect } from 'react';
import {NavLink, useNavigate, useLocation} from "react-router-dom";
import {jwtDecode} from 'jwt-decode';

const Header = () => {

    const navigate = useNavigate();
    const location = useLocation();

    // console.log(isAuthenticated);
    // const user = JSON.parse(localStorage.getItem('User'));
    const [user, setUser] = useState(JSON.parse(localStorage.getItem('User')))
    // const [isAuthenticated, setIsAuthenticated] = useState(false);

    //Check if user token remains valid
    useEffect(() => {
        // console.log('Location changed:', location.pathname);
        // console.log('User:', user);

    // const source = axios.CancelToken.source();
    //   // Your action here
    //   // console.log('Location changed:', location.pathname);

    //   const checkAuthentication = async () => {
    //     // Logic to check if the user is authenticated
    //     // This could be based on a valid token existence and validity
    //     try {
        setUser(JSON.parse(localStorage.getItem('User')))
            const jwtToken = user?.token

            // if (jwtToken) {
            //     const response = await api.get(`user/getUserValid`, {
            //       cancelToken: source.token, 
            //       headers: {
            //           'Content-Type': 'application/json',
            //           'x-auth-token': jwtToken
            //       }
            //     });
            //     setIsAuthenticated(response.data === true);
            // }
            // else{
            //   localStorage.removeItem('User');
            //   setIsAuthenticated(false);
            // }

            if(jwtToken) 
            {
                const decodedToken = jwtDecode(jwtToken);
                // setIsAuthenticated(true)
          
                if (decodedToken.exp * 1000 < new Date().getTime()) logout();
            }
        // } catch (error) {
        //     console.error('Error checking authentication:', error);
        //     localStorage.removeItem('User');
        //     setIsAuthenticated(false);
        // }
    // };
    
    // checkAuthentication();
  }, [location]);

  const handleLogout = () => {
    localStorage.removeItem('User');
    setUser(null)
    // setIsAuthenticated(false);
    navigate(`/login`) // Or to login page
    // Additional logout logic

  };
  const logout = () => {
    localStorage.removeItem('User');
    setUser(null)
    // setIsAuthenticated(false);
    // Additional logout logic

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
                    {/* <NavLink className="nav-link" to="/movies" end>Movies</NavLink> */}
                    <NavLink className ="nav-link" to="/tv">TV Shows</NavLink>
                    <NavLink className ="nav-link" to="/watchList">Watch List</NavLink>      
                </Nav>
                {/* <Button href="/login" variant="outline-info" className="me-2">Login</Button>
                <Button href="/login" variant="outline-info">Register</Button> */}
                {user ? (
                    <>
                        <Dropdown drop="start">
                            <Dropdown.Toggle variant="outline-info" id="dropdown-basic" >
                                Profile
                            </Dropdown.Toggle>
                            <Dropdown.Menu>
                                <Dropdown.Item href="#">My Account</Dropdown.Item>
                                <Dropdown.Item as="button" onClick={handleLogout} > Logout </Dropdown.Item>
                                {/* <Dropdown.Divider />
                                <Dropdown.Item href="#">Something else here</Dropdown.Item> */}
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