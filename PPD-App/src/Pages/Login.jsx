import React, { useState } from 'react';
import './Login.css';
import Header from '../Component/Header';
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios';

function Login() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [message, setMessage] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const navigate = useNavigate();
     
  const handleSubmit = (event) => {
    event.preventDefault();
     
    if (!email || !password) {
      setMessage('Please complete all information');
      return;
    }
     
    axios.post('http://localhost:8081/Login', { email, password })
      .then(res => {
        if (res.data.login) {
          navigate('/Home2');
        } else {
          setMessage('Invalid email or password');
        }
      })
      .catch(error => {
        console.error('Login error:', error);
        setMessage('An error occurred during login');
      });
  };
    
  return (
    <div>
      <Header />
      <div className="login-page">
        <div className="login-container">
          <div className="login-header">
            <h2>Log In</h2>
            <div className="login-underline"></div>
          </div>
          
          {message && <div className="error-message">{message}</div>}
          
          <form id="loginForm" onSubmit={handleSubmit}>
            <div className="login-inputs">
              <label htmlFor="Email">
                Email <span className="required-indicator"></span>
              </label>
              <input
                type="email"
                id="Email"
                name="Email"
                placeholder="Email@example.com"
                required
                aria-required="true"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
              
              <label htmlFor="password">
                Password <span className="required-indicator"></span>
              </label>
              <div className="password-input-wrapper">
                <input
                  type={showPassword ? "text" : "password"}
                  id="password"
                  name="password"
                  placeholder="Enter your password"
                  required
                  aria-required="true"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                />
                <span
                  className="password-toggle-icon"
                  onClick={() => setShowPassword(!showPassword)}
                >
                  {showPassword ? (
                    <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor">
                      <path d="M12 4.5C7 4.5 2.73 7.61 1 12c1.73 4.39 6 7.5 11 7.5s9.27-3.11 11-7.5c-1.73-4.39-6-7.5-11-7.5zM12 17c-2.76 0-5-2.24-5-5s2.24-5 5-5 5 2.24 5 5-2.24 5-5 5zm0-8c-1.66 0-3 1.34-3 3s1.34 3 3 3 3-1.34 3-3-1.34-3-3-3z"/>
                    </svg>
                  ) : (
                    <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor">
                      <path d="M12 7c2.76 0 5 2.24 5 5 0 .65-.13 1.26-.36 1.83l2.92 2.92c1.51-1.26 2.7-2.89 3.43-4.75-1.73-4.39-6-7.5-11-7.5-1.4 0-2.74.25-3.98.7l2.16 2.16C10.74 7.13 11.35 7 12 7zM2 4.27l2.28 2.28.46.46C3.08 8.3 1.78 10.02 1 12c1.73 4.39 6 7.5 11 7.5 1.55 0 3.03-.3 4.38-.84l.42.42L19.73 22 21 20.73 3.27 3 2 4.27zM7.53 9.8l1.55 1.55c-.05.21-.08.43-.08.65 0 1.66 1.34 3 3 3 .22 0 .44-.03.65-.08l1.55 1.55c-.67.33-1.41.53-2.2.53-2.76 0-5-2.24-5-5 0-.79.2-1.53.53-2.2zm4.31-.78l3.15 3.15.02-.16c0-1.66-1.34-3-3-3l-.17.01z"/>
                    </svg>
                  )}
                </span>
              </div>
            </div>
            <div className="remember-forgot">
              <label htmlFor="remember-me">
                <input type="checkbox" id="remember-me" /> Remember Me
              </label>
              <a href="#">Forgot Password?</a>
            </div>
            <div className="login-submit">
              <Link to="/Appointments">
              <button type="submit">Log In</button>
              </Link>
            </div>
          </form>
          <p className="login-footer">
            New Here? <Link to="/Signup">Sign Up</Link>
          </p>
        </div>
      </div>
    </div>
  );
}

export default Login;