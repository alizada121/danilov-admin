import React from 'react'
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import "../Header/Header.css"

function Header() {
  const navigate = useNavigate();

  const access = localStorage.getItem("lemlemaccess")
  const refresh = localStorage.getItem("lemlemresfresh")

  const logout = async e => {
    try {
      const response = await axios
        .post('https://lit-lowlands-45367.herokuapp.com/auth/logout', {}, {
          headers: {
            "Access-Control-Allow-Methods": "GET, POST, OPTIONS, PUT, DELETE",
            'Access-Control-Allow-Headers':'*',
            'danilov-access': "Bearer " + access,
            'danilov-refresh': "Bearer " + refresh,
          }
        }, { withCredentials: true });
        console.log(response)
      if (response.status === 200) {
        localStorage.removeItem("lemlemaccess")
        localStorage.removeItem("lemlemresfresh")
        navigate("/login")
      }

    } catch (e) {
      console.log(e)
      alert(e)
    }
  }
  return (
    <header id='header'>
    <h1>ADMIN</h1>

    <div>
      <input type="search" name="" id="" placeholder='Search' />
      <button className='logout' onClick={logout}>LOGOUT</button>
    </div>
  </header>
  )
}

export default Header