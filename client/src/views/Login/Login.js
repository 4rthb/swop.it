import { useLocation, useNavigate, Link } from "react-router-dom";
import { useDispatch, useSelector } from 'react-redux';
import React from 'react';
import { useState, useEffect } from 'react'
import { signin } from '../../actions/userActions';
import LoadingBox from '../../components/LoadingBox';
import MessageBox from '../../components/MessageBox';
import './Login.css'

export default function Login() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const dispatch = useDispatch();
  const location = useLocation();
  const navigate = useNavigate();
  const userSignin = useSelector((state) => state.userSignin);
  const { userInfo, loading, err } = userSignin;

  const redirect = location.search
    ? location.search.split('=')[1]
    : '/';

  const submitHandler = (e) => {
    e.preventDefault();
    dispatch(signin(email, password));
  };

  useEffect(() => {
    if (userInfo) {
      navigate.push(redirect);
    }
  }, [navigate, redirect, userInfo]);

  return (
    <div className="container-login">
      <div className="login-card">
        <h1>Login</h1>
        {loading && <LoadingBox></LoadingBox>}
        {err && <MessageBox variant="danger" onclick=''>{err}</MessageBox>}
        <form onSubmit={submitHandler} className="login-form">
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