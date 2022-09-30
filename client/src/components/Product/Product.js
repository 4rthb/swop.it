import React, { Component } from 'react'
import './Product.css'
import placeholder from '../placeholder.png'


class Product extends Component {
    render() {
        return(
            <div className="product-container">
                <img src={placeholder} alt="product image" className="product-page-image" />
                <div className="product-page-content">
                    <h3 className="product-page-content-name"> Nome do Produto</h3>
                    <p className="product-page-content-info">Vendedor</p>
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

                        <div className="product-page-content-wish">
                            <span className='wish-content wish-title'>Desejo:</span>
                            <span className='wish-content'>1 Dólar</span>
                        </div>
                    </div>
                    <p className="product-page-content-info">Descrição</p>
                    <div className="product-page-content-description">
                        Lorem ipsum dolor sit amet consectetur, adipisicing elit. Ut numquam est autem eius, quisquam amet vitae aliquid? Repellendus porro id iste, consequuntur enim eaque ipsum vitae quasi ex mollitia labore veritatis sed at corrupti non, fuga ea harum officiis. Harum incidunt porro veritatis non delectus. Molestias consequatur, in ab minima repellat nesciunt aperiam nemo. Odit sapiente incidunt a nostrum iste molestiae numquam voluptate, voluptates ad quaerat doloremque vitae excepturi quo labore officia aperiam quisquam! Asperiores quas fugiat exercitationem! Laudantium voluptatum veritatis amet nihil laboriosam consequatur iste neque vero, ut est perferendis. Fugiat, quibusdam voluptatem odio ipsam consequuntur ex voluptatibus est!
                    </div>
                </div>
            </div>
        )
    }

}

export default Product