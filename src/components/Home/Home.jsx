import React from 'react'
import { Link,useNavigate } from 'react-router-dom'
import Header from '../Header/Header'
import Sidebar from '../Sidebar/Sidebar'
import "../Home/Home.css"
import { useEffect } from 'react'
function Home() {
  const access=localStorage.getItem("lemlemaccess")
  const refresh=localStorage.getItem("lemlemrefresh")

  const navigate=useNavigate()
  useEffect(()=>{
    if(!access && access==null){
      navigate("/login")
    }
  },[access])
  
  return (
    <div>
        <Sidebar/>
        <Header/>

        <div className='home-container'>
            <div className='home-pages'>
              <Link to="/shoes">
              <p>Shoes</p>
              </Link>
              <Link to="/collection">
              <p>Collection</p>
              </Link>
              <Link to="/category">
                <p>Category</p>
              </Link>
              <Link to="/discount">
                <p>Discount</p>
              </Link>
            </div>
            <hr/>


        </div>

    </div>
  )
}

export default Home