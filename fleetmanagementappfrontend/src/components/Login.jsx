import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { FaEnvelope, FaLock } from 'react-icons/fa'; // Removed unused vehicle icons
import axios from 'axios';
import './Login.css';

const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loggedIn, setLoggedIn] = useState({ });
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    const userData = { emailID: email, password };

    try {
      const response = await axios.post('https://fleet-management-eta.vercel.app/login', userData, {
        withCredentials: true,  // Include credentials in the request
      });
      console.log('Login successful:', response); // Debugging log
      setLoggedIn(userData);
      const userId = response.data.user.user_id;
      navigate(`/dashboard?userId=${userId}`);
    } catch (err) {
      setError(err.response?.data?.msg || 'There was an error logging in!');
    }
  };

  const handleGoogleLogin = () => {
    window.location.href = 'https://fleet-management-eta.vercel.app/login/auth/google';
  };

  return (
    <div className="login-background">
      <div className="login-overlay">
        <div className="login-container">
          <div className="login-form">
            <h1><center>Login</center></h1>
            <br></br>
            <form onSubmit={handleSubmit}>
              <div className="form-group">
                <label htmlFor="email"><FaEnvelope /> Email Address</label>
                <input
                  type="email"
                  id="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                />
              </div>
              <div className="form-group">
                <label htmlFor="password"><FaLock /> Password</label>
                <input
                  type="password"
                  id="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  required
                />
              </div>
              <br></br>
              <br></br>
              <br></br>
              <button type="submit" className="google-login-button">
                <img
                  src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRWsR_2YI92NWxPIkYJfxXVy-LC0NFVXbo9YQ&s"
                  alt="Google logo"
                  className="google-logo"
                />
                <span>Login with Username or Email ID</span>
              </button>

              {error && <div className="error-message">{error}</div>}
            </form>
            {/* Google Login Button */}
            <br></br>
            <button className="google-login-button" onClick={handleGoogleLogin}>
              <img
                src="https://static-00.iconduck.com/assets.00/google-icon-2048x2048-pks9lbdv.png"
                alt="Google logo"
                className="google-logo"
                width={25}
              />
              <span> Login with Google Account </span>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;
