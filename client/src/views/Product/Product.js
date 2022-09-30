import React, { useEffect, useState } from 'react'
import axios from 'axios';
import './Product.css'
import placeholder from '../../images/placeholder.png'
import { useParams } from 'react-router-dom';


export default function Product(props) {
    const [product, setProduct] = useState([]);
    const { id } = useParams();
    useEffect(() => {
        const fetchData = async () => {
            const { data } = await axios.get('/api/items/'+id)
            setProduct(data);
        };
        fetchData();
    }, [])

    if(!product) {
        return <div> Product not found </div>;
    }

    return(
        <div className="product-container">
            <img src={product.image ? product.image : placeholder} alt={product.name} className="product-page-image" />
            <div className="product-page-content">
                <h3 className="product-page-content-name"> {product.name} </h3>
                <p className="product-page-content-info"> Vendedor </p>
                <div className="owner-container">
                    <a href={`/user/${product.owner}`}>
                        <div className="owner-icon"> {product.owner} </div>
                    </a>
                    <a href={`/user/${product.owner}`}>
                    <div className="owner-info">
                        <div className="owner-name"> {product.owner} </div>
                        {/* <div className="local"> {product.location} </div> */}
                    </div>
                    </a>

                    <div className="product-page-content-wish">
                        <span className='wish-content wish-title'> Desejo: </span>
                        <span className='wish-content'> 1 Dolar </span>
                    </div>
                </div>
                <p className="product-page-content-info">Descrição</p>
                <div className="product-page-content-description"> {product.description} </div>
            </div>
        </div>
    );
}