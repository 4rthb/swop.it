import React, { Component } from 'react'
import placeholder from '../images/placeholder.png'


export default function ProductCard(props) {
    const {product} = props;
    return(
        <div key={product.id} className="product-card">
            <a href={`/product/${product.id}`}>
                <img src={product.image ? product.image : placeholder} alt={product.name} className="product-image" />
            </a>
            <div className="product-content">
                <a href={`/product/${product.id}`}>
                    <p className="product-name">{product.name}</p>
                </a>
                <div className="product-description-container">
                    <p className="product-description"> <b>Descrição:</b> </p>
                    <p className="product-description"> {product.description} </p>
                </div>
                
                <a href={`/user/${product.owner}`}>
                    <div className="owner-container">
                        <div className="owner-icon"> {product.owner} </div>
                        <div className="owner-info">
                            <div className="owner-name"> {product.owner} </div>
                            <div className="local"> {product.location} </div>
                        </div>
                    </div>
                </a>
            </div>
        </div>
    )
}