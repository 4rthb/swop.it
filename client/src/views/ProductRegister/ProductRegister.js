import { useLocation, useNavigate } from "react-router-dom";
import React, { useEffect } from 'react';
import { useState } from 'react'
import { useDispatch, useSelector } from "react-redux";
import './ProductRegister.css'
import placeholder from '../../images/placeholder.png'
import wish_icon from '../../images/wish.png'
import local_icon from '../../images/local.png'
import owner_icon from '../../images/owner.png'

import { registerProduct } from "../../actions/productActions";
import LoadingBox from "../../components/LoadingBox";
import MessageBox from "../../components/MessageBox";


export default function ProductRegister() {

    const userSignin = useSelector((state) => state.userSignin);
    const { userInfo} = userSignin;

    const dispatch = useDispatch();
    const location = useLocation();
    const navigate = useNavigate();

    const [name, setName] = useState('');
    const [description, setDescription] = useState('');
    const [expected, setExpected] = useState('');
    const [image, setImage] = useState('');
    const [category, setCategory] = useState('');
    const [currentState, setCurrentState] = useState('');
    const [owner, setOwner] = useState('');

    const redirect = location.search
    ? location.search.split('=')[1]
    : '/';

    const itemRegister = useSelector((state) => state.itemRegister);
    const { itemInfo, loading, err } = itemRegister;

    const submitHandler = (e) => {
        e.preventDefault();
        if(false) {
        alert('Passwords must be the same')
        } else {
        dispatch(registerProduct(name, description, expected, image, "batata","AVAILABLE",userInfo));
        }
    };

    useEffect(() => {

        if (itemInfo) {
        navigate(redirect);
        }
    }, [navigate, redirect, itemInfo, userInfo]);

    return(
        <form onSubmit={submitHandler}>
            <div className="container">
                <h1>
                    Registrar Produto
                </h1>
                <div className="registerCard">
                    <div className="name-container">
                    <label htmlFor="name" className='name'><h2>Nome do Produto:</h2></label>
                    <input onChange={(e) => setName(e.target.value)} placeholder='Digite o nome do produto..' className='name-input' type="text" id='name'/>
                    </div>
                    <div className="registerInfo">
                        <div className="img-container">
                            <img src={placeholder} alt="product_image" className="productImage" />
                            <input onChange={(e) => setImage(e.target.value)} className='image-upload' type="text" id="myFile" name="filename"/>
                        </div>
                        <div className="info-container">
                            <div className="info">
                                <div className="info-icon" > <img src={wish_icon} alt="wish icon" /></div>
                                <label htmlFor="wish">Desejo:</label>
                                <input onChange={(e) => setExpected(e.target.value)} placeholder='Digite o que deseja...' className='info-input' type="text" id='wish'/>
                            </div>
                            <div className="info">
                                <div className="info-icon" > <img src={local_icon} alt="local icon" /></div>
                                <label htmlFor="local">Localização:</label>
                                <input placeholder='Digite o local de retirada...' className='info-input' type="text" id='local'/>
                            </div>
                            <div className="info">
                                <div className="info-icon" > <img src={owner_icon} alt="owner icon" /></div>
                                <label htmlFor="owner">Dono:</label>
                                <input placeholder='Digite o seu nome?!...' className='info-input' type="text" id='owner'/>
                            </div>
                        </div>
                    </div>
                    <textarea onChange={(e) => setDescription(e.target.value)} className="registerDescription" name="" id="" cols="30" rows="10" placeholder='Descrição do produto...'></textarea>
                </div>
                <input className='submit-button' type="submit" value="Salvar"/>
            </div>
        </form>
    )
}