import logo from './logo.svg';
import React, { Component } from 'react';
import Navbar from './components/Navbar/Navbar';
import Landing from './components/Landing/Landing';
import ProductRegister from './components/ProductRegister/ProductRegister';
import EditProfile from './components/EditProfile/EditProfile';
import Product from './components/Product/Product';
import Login from './components/Login/Login';
import Register from './components/Register/Register';

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
            <Route path="/" element={<Landing />}></Route>
            <Route path="/ProductRegister" element={<ProductRegister />}></Route>
            <Route path="/EditProfile" element={<EditProfile />}></Route>
            <Route path="/Product" element={<Product />}></Route>
            <Route path="/Login" element={<Login />}></Route>
            <Route path="/Register" element={<Register />}></Route>

          </Routes>
        </div>
      </BrowserRouter>
    );
  }
}

export default App;
