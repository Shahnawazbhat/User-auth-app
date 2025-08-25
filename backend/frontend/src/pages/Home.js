import React from "react";
import { useNavigate } from "react-router-dom";
import { handleSuccess } from "../utlis";
import {ToastContainer} from 'react-toastify';

const Home = () => {
  const loggedInUser = localStorage.getItem("loggedInUser");
  const user = loggedInUser ? JSON.parse(loggedInUser) : null;

const navigate= useNavigate ();

const handleLogout = (e)=>{
  localStorage.removeItem ('token');
  localStorage.removeItem('user');

  setTimeout(() => {
    handleSuccess('user loggedout');
    navigate('/login');
  }, 1000);
}

  return (
    <div>
      <h1>Welcome {user?.name}</h1>
      <button onClick={handleLogout}>Logout</button>

      <ToastContainer/>
    </div>
  );
};

export default Home;
