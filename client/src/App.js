import React, { Component } from 'react';
import { BrowserRouter as Router,Routes, Route, Link } from 'react-router-dom';
import Login from './component/loginS';
import Register from './component/registerS';
import RegProd from './component/prodregS';
import './App.css';

class App extends Component {
  render() {
    return (
       <Router>
           <div className="App">
            <ul className="App-header">
              <li>
                <Link to="/">Login</Link>
              </li>
              <li>
                <Link to="/register">Register</Link>
              </li>
            </ul>
           <Routes>
                 <Route exact path='/' element={< Login />}></Route>
                 <Route exact path='/register' element={< Register />}></Route>
                 <Route exact path='/marketplace/new' element={< RegProd />}></Route>
          </Routes>
          </div>
       </Router>
   );
  }
}

export default App;
