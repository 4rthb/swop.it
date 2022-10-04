import React, { Component } from 'react';
import Navbar from './components/Navbar/Navbar';
import Landing from './views/Landing/Landing';
import ProductRegister from './views/ProductRegister/ProductRegister';
import EditProfile from './views/EditProfile/EditProfile';
import Product from './views/Product/Product';
import Login from './views/Login/Login';
import Register from './views/Register/Register';
import Profile from './views/Profile/Profile';


import './App.css';

import {
  BrowserRouter,
  Routes,
  Route,
} from "react-router-dom";

class App extends Component  {

  render() {

    return (
      <BrowserRouter>
        <div className="App">
          <Navbar />
          <Routes>
            <Route path="/" element={<Landing />} exact></Route>
            <Route path="/product/register" element={<ProductRegister />}></Route>
            <Route path="/edit" element={<EditProfile />}></Route>
            <Route path="/product/:id" element={<Product />}></Route>
            <Route path="/login" element={<Login />}></Route>
            <Route path="/register" element={<Register />}></Route>
            <Route path="/profile" element={<Profile />}></Route>
            <Route path="/user/:id" element={<Profile />}></Route>
          </Routes>
        </div>
      </BrowserRouter>
    );
  }
}

export default App;
