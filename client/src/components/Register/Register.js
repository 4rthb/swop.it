import { useNavigate } from "react-router-dom";
import React from 'react';
import { useState } from 'react'

import '../EditProfile/EditProfile.css'

function Register (){
  const navigate = useNavigate();
  const [name, setName] = useState('')
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')

  async function registerUser(event) {
    event.preventDefault()

    await fetch('http://localhost:5000/register', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        name,
        email,
        password,
      }),
    }).then(response => {
      return response.json();
    }).then(json => {
      if(json.status === "success"){
        navigate("/");
      }
  });
  }

  return (
      <form action="" method="post">
        <div className="container">
            <h1>
                Registrar
            </h1>
            <div className="EditCard">
                <div className="data-row">
                    <input placeholder='nome' className='data-input' type="text"/>
                    <input placeholder='email' className='data-input' type="email"/>
                    <input placeholder='cpf' className='data-input' type="text"/>
                    <input placeholder='celular' className='data-input' type="text"/>
                </div>
                <div className="data-row">
                    <input placeholder='endereço' className='data-input' type="text"/>
                    <input placeholder='cidade' className='data-input' type="text"/>
                    <input placeholder='cep' className='data-input' type="text"/>
                </div>
                <div className="data-row">
                    <input placeholder='senha' className='data-input' type="password"/>
                    <input placeholder='confirmar senha' className='data-input' type='password'/>
                </div>
            </div>
            <input className='submit-button' type="submit" value="Entrar"/>
        </div>
    </form>
  )
}

export default Register;
