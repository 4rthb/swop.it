import React, { Component } from 'react'
import banner from './banner.jpg'
import placeholder from '../placeholder.png'
import { Link } from 'react-router-dom'

import './Landing.css'

class Landing extends Component {
    render() {
        return(
            <>
                <div className="banner">
                    <div className="text-container">

                    </div>
                    <div className="banner-image-container">
                        <img src={banner} alt="hero banner" className="banner-image" />
                        <div className="fade"></div>
                        <div className="fade"></div>
                        <div className="fade"></div>
                        <div className="fade"></div>
                    </div>

                </div>

                <div className="marketplace" id='Marketplace'key='Marketplace'>
                    <Link to='/Product' className='product-link'>
                        <div className="product-card">
                            <img src={placeholder} alt="product image" className="product-image" />
                            <div className="product-content">
                                <p className="product-name">Nome do Produto</p>
                                <div className="product-description-container">
                                    <p className="product-description">
                                        Descrição:
                                    </p>
                                    <p className="product-description">
                                        Lorem ipsum dolor sit amet consectetur adipisicing elit. Odit vero dolor quos earum, laudantium ab maiores nostrum voluptatem incidunt, facere aspernatur, quidem dolore aliquid? Aliquid impedit repellendus numquam assumenda voluptatibus?
                                    </p>
                                </div>
                                <div className="owner-container">
                                    <div className="owner-icon">
                                        Roberto Pinto
                                    </div>
                                    <div className="owner-info">
                                        <div className="owner-name">
                                            Nome do Vendedor
                                        </div>
                                        <div className="local">
                                            Tanguara da Serra
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </Link>
                    <Link to='/Product' className='product-link'>
                        <div className="product-card">
                            <img src={placeholder} alt="product image" className="product-image" />
                            <div className="product-content">
                                <p className="product-name">Nome do Produto</p>
                                <div className="product-description-container">
                                    <p className="product-description">
                                        Descrição:
                                    </p>
                                    <p className="product-description">
                                        Lorem ipsum dolor sit amet consectetur adipisicing elit. Odit vero dolor quos earum, laudantium ab maiores nostrum voluptatem incidunt, facere aspernatur, quidem dolore aliquid? Aliquid impedit repellendus numquam assumenda voluptatibus?
                                    </p>
                                </div>
                                <div className="owner-container">
                                    <div className="owner-icon">
                                        Roberto Pinto
                                    </div>
                                    <div className="owner-info">
                                        <div className="owner-name">
                                            Nome do Vendedor
                                        </div>
                                        <div className="local">
                                            Tanguara da Serra
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </Link>
                    <Link to='/Product' className='product-link'>
                        <div className="product-card">
                            <img src={placeholder} alt="product image" className="product-image" />
                            <div className="product-content">
                                <p className="product-name">Nome do Produto</p>
                                <div className="product-description-container">
                                    <p className="product-description">
                                        Descrição:
                                    </p>
                                    <p className="product-description">
                                        Lorem ipsum dolor sit amet consectetur adipisicing elit. Odit vero dolor quos earum, laudantium ab maiores nostrum voluptatem incidunt, facere aspernatur, quidem dolore aliquid? Aliquid impedit repellendus numquam assumenda voluptatibus?
                                    </p>
                                </div>
                                <div className="owner-container">
                                    <div className="owner-icon">
                                        Roberto Pinto
                                    </div>
                                    <div className="owner-info">
                                        <div className="owner-name">
                                            Nome do Vendedor
                                        </div>
                                        <div className="local">
                                            Tanguara da Serra
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </Link>
                    <Link to='/Product' className='product-link'>
                        <div className="product-card">
                            <img src={placeholder} alt="product image" className="product-image" />
                            <div className="product-content">
                                <p className="product-name">Nome do Produto</p>
                                <div className="product-description-container">
                                    <p className="product-description">
                                        Descrição:
                                    </p>
                                    <p className="product-description">
                                        Lorem ipsum dolor sit amet consectetur adipisicing elit. Odit vero dolor quos earum, laudantium ab maiores nostrum voluptatem incidunt, facere aspernatur, quidem dolore aliquid? Aliquid impedit repellendus numquam assumenda voluptatibus?
                                    </p>
                                </div>
                                <div className="owner-container">
                                    <div className="owner-icon">
                                        Roberto Pinto
                                    </div>
                                    <div className="owner-info">
                                        <div className="owner-name">
                                            Nome do Vendedor
                                        </div>
                                        <div className="local">
                                            Tanguara da Serra
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </Link>
                </div>
            </>
        )
    }

}

export default Landing