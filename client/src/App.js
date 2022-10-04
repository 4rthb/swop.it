import React, { Component } from 'react';
import Navbar from './components/Navbar/Navbar';
import Landing from './views/Landing/Landing';
import ProductRegister from './views/ProductRegister/ProductRegister';
import EditProfile from './views/EditProfile/EditProfile';
import Product from './views/Product/Product';
import Login from './views/Login/Login';
import Register from './views/Register/Register';

import './App.css';

import {
  BrowserRouter,
  Routes,
  Route,
} from "react-router-dom";
import Offer from './views/Offer/Offer';

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
            <Route path="/offer/:id" element={<Offer />}></Route>
            <Route path="/login" element={<Login />}></Route>
            <Route path="/register" element={<Register />}></Route>
          </Routes>
        </div>
      </BrowserRouter>
    );
  }
}

export default App;
