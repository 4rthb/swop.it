import { useLocation, useNavigate } from "react-router-dom";
import React, { useEffect } from 'react';
import { useState } from 'react'
import { useDispatch, useSelector } from "react-redux";
import './ProductRegister.css'
import placeholder from '../../images/placeholder.png'
import wish_icon from '../../images/wish.png'
import category_icon from '../../images/category.png'

import { registerProduct } from "../../actions/productActions";


export default function ProductRegister() {

    const userSignin = useSelector((state) => state.userSignin);
    const { userInfo } = userSignin;

    const dispatch = useDispatch();
    const location = useLocation();
    const navigate = useNavigate();

    const [name, setName] = useState('');
    const [description, setDescription] = useState('');
    const [category, setCategory] = useState('');
    const [expected, setExpected] = useState('');
    const [image, setImage] = useState('');

    const redirect = location.search
    ? location.search.split('=')[1]
    : '/';

    const itemRegister = useSelector((state) => state.itemRegister);
    const { productInfo } = itemRegister;

    const submitHandler = (e) => {
        e.preventDefault();
        dispatch(registerProduct(name, description, expected, image, category, userInfo));
    };

    useEffect(() => {
        if (productInfo) {
            alert('Item registrado com sucesso');
        navigate(redirect);
        }
    }, [navigate, redirect, productInfo]);

    return(
        <form onSubmit={submitHandler}>
            <div className="container">
                <h1>
                    Registrar Produto
                </h1>
                <div className="registerCard">
                    <div className="name-container">
                    <label htmlFor="name" className='name'><h2>Nome do produto:</h2></label>
                    <input onChange={(e) => setName(e.target.value)} placeholder='Digite o nome do produto' className='name-input' type="text" id='name'/>
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
                                <input onChange={(e) => setExpected(e.target.value)} placeholder='O que quer em troca?' className='info-input' type="text" id='wish'/>
                            </div>
                            <div className="info">
                                <div className="info-icon" > <img src={category_icon} alt="category icon" /></div>
                                <label htmlFor="category">Categoria:</label>
                                <input onChange={(e) => setCategory(e.target.value)} placeholder='Automóveis, livros ...' className='info-input' type="text" id='category'/>
                            </div>
                        </div>
                    </div>
                    <textarea onChange={(e) => setDescription(e.target.value)} className="registerDescription" name="" id="" cols="30" rows="10" placeholder='Descrição do produto'></textarea>
                </div>
                <input className='submit-button' type="submit" value="Salvar"/>
            </div>
        </form>
    )
}