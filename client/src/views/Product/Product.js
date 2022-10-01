import React, { useEffect, useState } from 'react'
import axios from 'axios';
import './Product.css'
import placeholder from '../../images/placeholder.png'
import { useParams } from 'react-router-dom';


export default function Product(props) {
    const [product, setProduct] = useState([]);
    const [user, setUser] = useState([]);
    const { id } = useParams();

    useEffect(() => {
        // const fetchUser = async () => {
        //     const { udata } = await axios.get('/api/users/desiredOwner/'+product.owner);
        //     setUser(udata);
        // };
        const fetchData = async () => {
            const { data } = await axios.get('/api/items/'+id);
            setProduct(data);
        };
        fetchData();
        // fetchUser();
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
                    <a href={`/user/${user.name}`}>
                        <div className="owner-icon"> {user.name} </div>
                    </a>
                    <a href={`/user/${user.name}`}>
                    <div className="owner-info">
                        <div className="owner-name"> {user.name} </div>
                        <div className="local"> {user.address} </div>
                    </div>
                    </a>

                    <div className="product-page-content-wish">
                        <span className='wish-content wish-title'> Desejo: </span>
                        <span className='wish-content'> {product.expected} </span>
                    </div>
                </div>
                <p className="product-page-content-info">Descrição</p>
                <div className="product-page-content-description"> {product.description} </div>
            </div>
        </div>
    );
}