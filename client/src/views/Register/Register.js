import { Link, useLocation, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import React, { useEffect } from 'react';
import { useState } from 'react'

import './Register.css'
import { register } from "../../actions/userActions";
import LoadingBox from "../../components/LoadingBox";
import MessageBox from "../../components/MessageBox";

function Register (){
  const dispatch = useDispatch();
  const location = useLocation();
  const navigate = useNavigate();

  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [address, setAddress] = useState('');
  const [password, setPassword] = useState('');
  const [phoneNumber, setPhoneNumber] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');

  const redirect = location.search
  ? location.search.split('=')[1]
  : '/';

  const userRegister = useSelector((state) => state.userRegister);
  const { userInfo, loading, err } = userRegister;

  const submitHandler = (e) => {
    e.preventDefault();
    if(password !== confirmPassword) {
      alert('Passwords must be the same')
    } else {
      dispatch(register(name, email, password, address, phoneNumber));
    }
  };

  useEffect(() => {
    if (userInfo) {
      navigate(redirect);
    }
  }, [navigate, redirect, userInfo]);

  return (
    <div className="container-register">
      <div className="register-card">
        <h1>Criar Conta</h1>
        {loading && <LoadingBox></LoadingBox>}
        {err && <MessageBox variant="danger" onclick=''>{err}</MessageBox>}
        <form onSubmit={submitHandler} className="register-form">
          <div className="data-row">
            <input
              className="data-input"
              value={name}
              onChange={(e) => setName(e.target.value)}
              type="text"
              placeholder="Nome"
            />
            <input
              className="data-input"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              type="email"
              placeholder="Email"
            />
            <input
              className="data-input"
              value={phoneNumber}
              onChange={(e) => setPhoneNumber(e.target.value)}
              type="text"
              placeholder="Celular"
            />
          </div>
          <div className="data-row">
            <input
              className="data-input"
              value={address}
              onChange={(e) => setAddress(e.target.value)}
              type="text"
              placeholder="Endereço"
            />
          </div>
          <div className="data-row">
            <input
              className="data-input"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              type="password"
              placeholder="Senha"
            />
            <input
              className="data-input"
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
              type="password"
              placeholder="Confirmar senha"
            />  
          </div>
          <div className="login-row">
            <Link to={`/login?redirect=${redirect}`} className="login-link">
              Já tem uma conta?
            </Link>
          </div>
          <input className="register-submit" type="submit" value="Entrar" />
      </form>
    </div>
  </div>
  )
}

export default Register;
