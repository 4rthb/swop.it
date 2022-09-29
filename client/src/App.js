import logo from './logo.svg';
import React, { Component } from 'react';
import Navbar from './components/Navbar/Navbar';
import Landing from './components/Landing/Landing';
import ProductRegister from './components/ProductRegister/ProductRegister';
import EditProfile from './components/EditProfile/EditProfile';
import './App.css';

import { render } from "react-dom";
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
          </Routes>
        </div>
      </BrowserRouter>
    );
  }
}

export default App;
