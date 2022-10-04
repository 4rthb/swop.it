import React, {  useEffect, useState } from 'react'
import axios from 'axios';
import placeholder from '../images/placeholder.png'
import Rating from './Rating';

const average = arr => arr.reduce((a,b) => a + b, 0) / arr.length;

export default function ProductCard(props) {
    const {product} = props;
    const [rating, setRating] = useState(0);
    const [user, setUser] = useState([]);
    useEffect(() => {
        const fetchData = async () => {
            const { data } = await axios.get('/api/users/desiredOwner/'+product.owner);
            setUser(data);
            if(user && user.ratingList) {
                setRating(average(user.ratingList));
            }
        };
        fetchData();
    }, [product, user])

    return(
        <div key={product._id} className="product-card">
            <a href={`/product/${product._id}`}>
                <img src={product.image ? product.image : placeholder} alt={product.name} className="product-image" />
            </a>
            <div className="product-content">
                <a href={`/product/${product._id}`}>
                    <p className="product-name"> {product.name} </p>
                </a>
                <div className="product-description-container">
                    <p className="product-description"> <b> Descrição: </b> </p>
                    <p className="product-description"> {product.description} </p>
                </div>
                
                <a href={`/user/${product.owner}`}>
                    <div className="owner-container">
                        <div className="owner-icon"> {user.name} </div>
                        <div className="owner-info">
                            <div className="owner-name"> {user.name} </div>
                            <div className="local"> {user.address} </div> 
                            <Rating rating={rating} caption=" "/>
                        </div>
                    </div>
                </a>
            </div>
        </div>
    )
}