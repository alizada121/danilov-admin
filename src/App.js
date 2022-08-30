// import logo from './logo.svg';
import './App.css';
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import Home from "./components/Home/Home"
import Shoes from './components/Shoes/Shoes';
import Login from './components/Login/Login';
import Collection from './components/Collection/Collection';
import Category from './components/Category/Category';
import Role from './components/Role/Role';
import Discount from './components/Discount/Discount'

function App() {
  return (
    <BrowserRouter>
    <Routes>
   
    <Route exact path="/" element={<Home />} />
    <Route exact path="/login" element={<Login />} />
    <Route exact path="/shoes" element={<Shoes />} />
    <Route exact path="/collection" element={<Collection/>}/>
    <Route exact path="/category" element={<Category/>}/>
    <Route exact path="/role" element={<Role/>}/>
    <Route exact path="/discount" element={<Discount/>}/>


    </Routes>
    </BrowserRouter>
  );
}

export default App;
