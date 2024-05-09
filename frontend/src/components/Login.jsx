import React, { useState, useEffect } from 'react';
import { Link, useNavigate   } from 'react-router-dom';
import axios from 'axios';
import styles from '../styles/Login.module.css';
import api from '../api/axiosConfig'
import {Alert} from 'react-bootstrap';

const Login = () => {
    const navigate = useNavigate();

    const [containerActive, setContainerActive] = useState(false);
    const [error, setError] = useState(null);

    const [loginEmail, setLoginEmail] = useState('');
    const [loginPassword, setLoginPassword] = useState('');


    const handleLogin = async (e) => {
        e.preventDefault();
        try {
            // console.log(loginEmail)
            // console.log(loginPassword)
            const response = await api.post('/authorization/login', {
            email: loginEmail,
            password: loginPassword,
            });
            // console.log(response.data);
            // Handle successful login (e.g., store token in localStorage)
    
            if(response.data)
            {
                //const data = await response.json();
                const { password, ...userDetails } = response.data.existingUser;
                // const profile = response.data.existingUser;
                const token = response.data.token;
                const user = { userDetails, token };

                localStorage.setItem('User', JSON.stringify(user)); // Store the JWT token in local storage
        
                navigate('/', { replace: true }); // Navigate to the home page
                //window.location.href = '/' // Another way to go to home page
            }
    
            } catch (error) {
                setError(error.response.data.message);
                console.error('Login error:', error);
                // Handle login error (e.g., display error message)
        }
      };

      const [registerUserName, setRegisterUsername] = useState('');
      const [registerEmail, setRegisterEmail] = useState('');
      const [registerPassword, setRegisterPassword] = useState('');
      const [registerConfirmPassword, setRegisterConfirmPassword] = useState('');

    const handleRegister = async (e) => {
        e.preventDefault();

        if (registerPassword !== registerConfirmPassword) 
        {
            setError('Passwords do not match');
            return;
        }
        try {
            const response = await api.post(`/authorization/register`, {
            userName: registerUserName,
            email: registerEmail,
            password: registerPassword,
            });
            // console.log(response.data);
            // Handle successful login (e.g., store token in localStorage)
    
            if(response.data)
            {
                const { password, ...userDetails } = response.data.newUser;
                const token = response.data.token;
                const user = { userDetails, token };

                localStorage.setItem('User', JSON.stringify(user)); // Store the JWT token in local storage

                navigate('/', { replace: true }); // Navigate to the home page
                //window.location.href = '/' // Another way to go to home page
            }
    
            } catch (error) {
                setError(error.response.data.message);
                console.error('Registration error:', error);
                // Handle login error (e.g., display error message)
        }
      };



  return (
    <div className={styles["body"]}>
        <div> {error && <Alert id={styles["error"]}>{error}</Alert>} </div>
        <div className={`${styles["container"]} ${containerActive ? styles.active : ''}`}>
            <div className={`${styles["form-container"]} ${styles["sign-up"]}`}>
                <form onSubmit={handleRegister}>
                    <h1 style={{"color": "black"}}>Create Account</h1>
                    <input type="text" placeholder="Name" value={registerUserName} onChange={(e) => setRegisterUsername(e.target.value)}/>
                    <input type="email" placeholder="Email" value={registerEmail} onChange={(e) => setRegisterEmail(e.target.value)}/>
                    <input type="password" placeholder="Password" value={registerPassword} onChange={(e) => setRegisterPassword(e.target.value)}/>
                    <input type="password" placeholder="Confirm Password" value={registerConfirmPassword} onChange={(e) => setRegisterConfirmPassword(e.target.value)}/>
                    <button type="submit">Sign Up</button>
                </form>
            </div>

            <div className={`${styles["form-container"]} ${styles["sign-in"]}`}>
                <form onSubmit={handleLogin}>
                    <h1 style={{"color": "black"}}>Sign In</h1>
                    <input type="email" placeholder="Email" value={loginEmail} onChange={(e) => setLoginEmail(e.target.value)}/>
                    <input type="password" placeholder="Password" value={loginPassword} onChange={(e) => setLoginPassword(e.target.value)}/>
                    <a href="#">Forget Your Password?</a>
                    <button type="submit">Sign In</button>
                </form>
            </div>

            <div className={styles["toggle-container"]}>
                <div className={styles["toggle"]}>
                    <div className={`${styles["toggle-panel"]} ${styles["toggle-left"]}`}>
                        <h1>Welcome!</h1>
                        <p>If you already have an account with us click below to login using your credentials</p>
                        <button className={styles["hidden"]} onClick={() => setContainerActive(false)} id="login">Sign In</button>
                    </div>
                    <div className={`${styles["toggle-panel"]} ${styles["toggle-right"]}`}>
                        <h1>New Here?</h1>
                        <p>Register with us by clicking the button below and unlock of our site features</p>
                        <button className={styles["hidden"]} onClick={() => setContainerActive(true)} id="register">Sign Up</button>
                    </div>
                </div>
            </div>
        </div>

        
    </div>
  )
}

export default Login