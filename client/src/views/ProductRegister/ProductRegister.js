import React, { Component } from 'react'
import './ProductRegister.css'
import placeholder from '../../images/placeholder.png'
import wish_icon from '../../images/wish.png'
import local_icon from '../../images/local.png'
import owner_icon from '../../images/owner.png'


export default function ProductRegister() {
    return(
        <form action="" method="post">
            <div className="container">
                <h1>
                    Registrar Produto
                </h1>
                <div className="registerCard">
                    <div className="name-container">
                    <label htmlFor="name" className='name'><h2>Nome do Produto:</h2></label>
                    <input placeholder='Digite o nome do produto..' className='name-input' type="text" id='name'/>
                    </div>
                    <div className="registerInfo">
                        <div className="img-container">
                            <img src={placeholder} alt="product_image" className="productImage" />
                            <input className='image-upload' type="file" id="myFile" name="filename" accept="image/*"/>
                        </div>
                        <div className="info-container">
                            <div className="info">
                                <div className="info-icon" > <img src={wish_icon} alt="wish icon" /></div>
                                <label htmlFor="wish">Desejo:</label>
                                <input placeholder='Digite o que deseja...' className='info-input' type="text" id='wish'/>
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
                    <textarea className="registerDescription" name="" id="" cols="30" rows="10" placeholder='Descrição do produto...'></textarea>
                </div>
                <input className='submit-button' type="submit" value="Salvar"/>
            </div>
        </form>
    )
}