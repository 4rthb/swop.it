import { useNavigate } from "react-router-dom";
import React from 'react';
import { useState } from 'react'
import { Link } from 'react-router-dom'

import './Login.css'

function Login (){
  const navigate = useNavigate();
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')

  async function loginUser(event) {
    event.preventDefault()

    await fetch('http://localhost:5000/', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        email,
        password,
      }),
    }).then(response => {
      return response.json();
    }).then(json => {
      if(json.status === "success"){
        navigate("/marketplace/new");
      }
    }).then(window.sessionStorage.setItem("email", email));
  }

  return (
    <div className="container-login">
      <div className="login-card">
        <h1>Login</h1>
        <form onSubmit={loginUser} className="login-form">
          <input
            className="login-input"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            type="email"
            placeholder="Email"
          />
          <br />
          <input
            className="login-input"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            type="password"
            placeholder="Senha"
          />
          <Link to='/register' className="register-link">
            Registrar Conta
          </Link>

          <input className="login-submit" type="submit" value="Entrar" />
        </form>
      </div>
    </div>
  )
}

export default Login;
