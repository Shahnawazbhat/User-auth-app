import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { ToastContainer } from 'react-toastify';
import { handleError, handleSuccess } from '../utlis';

const Signup = () => {
  const [signupInfo, setSignupInfo] = useState({
    name: '',
    email: '',
    password: '',
  });

  const navigate = useNavigate();

  // ================== HANDLE INPUT CHANGE ==================
  const handleChange = (e) => {
    const { name, value } = e.target;
    setSignupInfo((prev) => ({ ...prev, [name]: value }));
  };

  // ================== HANDLE SIGNUP ==================
  const handleSignup = async (e) => {
    e.preventDefault();
    const { name, email, password } = signupInfo;

    if (!name || !email || !password) {
      return handleError('Name, email, and password are required');
    }

    try {
      const url = 'http://user-auth-app-api.vercel.app/auth/signup';

      const response = await fetch(url, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(signupInfo),
      });

      const result = await response.json();
      console.log('Signup Response:', result);

      if (result.message) {
        handleSuccess(result.message || 'Signup successful!');
        
        setTimeout(() => {
          console.log("Signup successful, navigating to /login...");
          navigate('/login'); // ✅ Correct route
        }, 1500);

      } else {
        handleError(result.message || 'Signup failed');
      }
    } catch (err) {
      console.error('Signup error:', err);
      handleError(err.message || 'Something went wrong. Please try again.');
    }
  };

  // ================== JSX ==================
  return (
    <div className='Container'>
      <h1>Signup</h1>
      <form onSubmit={handleSignup}>
        <div>
          <label htmlFor='name'>Name</label>
          <input
            onChange={handleChange}
            type='text'
            name='name'
            autoFocus
            placeholder='Enter your name...'
            value={signupInfo.name}
          />
        </div>
        <div>
          <label htmlFor='email'>Email</label>
          <input
            onChange={handleChange}
            type='email'
            name='email'
            placeholder='Enter your email...'
            value={signupInfo.email}
          />
        </div>
        <div>
          <label htmlFor='password'>Password</label>
          <input
            onChange={handleChange}
            type='password'
            name='password'
            placeholder='Enter your Password...'
            value={signupInfo.password}
          />
        </div>
        <button type='submit'>Signup</button>
        <span>
          Already have an account? <Link to='/login'>Login</Link>
        </span>
      </form>
      <ToastContainer />
    </div>
  );
};

export default Signup;
