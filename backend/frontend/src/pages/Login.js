import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { ToastContainer } from 'react-toastify';
import { handleError, handleSuccess } from '../utlis';

function Login() {
  // ======================= STATE =======================
  const [loginInfo, setLoginInfo] = useState({
    email: '',
    password: '',
  });

  const navigate = useNavigate();

  // ======================= HANDLE INPUT CHANGE =======================
  const handleChange = (e) => {
    const { name, value } = e.target;
    setLoginInfo((prev) => ({ ...prev, [name]: value }));
  };

  // ======================= HANDLE LOGIN =======================
  const handleLogin = async (e) => {
    e.preventDefault();

    const { email, password } = loginInfo;

    // 1. Validate required fields
    if (!email || !password) {
      return handleError('Email and password are required');
    }

    try {
      // 2. API request
      const response = await fetch("http://localhost:5000/auth/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(loginInfo),
      });

      const result = await response.json();
      console.log("API raw result:", result);

      // 3. Extract expected fields from backend response
      const { message, token, user } = result;

      if (message === "Login successful") {
        handleSuccess(message);
       localStorage.setItem('token', token);
      
if (user?.name) {
  localStorage.setItem("loggedInUser", JSON.stringify(user)); // ✅ stringify the object
}

        // ✅ Redirect after 1 second
        setTimeout(() => {
          console.log("Login successful, navigating to /home...");
          navigate("/home");
        }, 1000);
      } else {
        handleError(message || "Login failed");
      }
    } catch (err) {
      console.error("Login error:", err);
      handleError("Something went wrong. Please try again later.");
    }
  };

  // ======================= JSX =======================
  return (
    <div className="Container">
      <h1>Login</h1>
      <form onSubmit={handleLogin}>
        <div>
          <label htmlFor="email">Email</label>
          <input
            onChange={handleChange}
            type="email"
            name="email"
            placeholder="Enter your email..."
            value={loginInfo.email}
          />
        </div>

        <div>
          <label htmlFor="password">Password</label>
          <input
            onChange={handleChange}
            type="password"
            name="password"
            placeholder="Enter your Password..."
            value={loginInfo.password}
          />
        </div>

        <button type="submit">Login</button>
        <span>
          Don’t have an account? <Link to="/signup">Signup</Link>
        </span>
      </form>
      <ToastContainer />
    </div>
  );
}

export default Login;
