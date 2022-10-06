import React, { useEffect, useState } from 'react'
import {useDispatch, useSelector} from 'react-redux';
import './Product.css'
import placeholder from '../../images/placeholder.png'
import { Link, useParams } from 'react-router-dom';
import LoadingBox from '../../components/LoadingBox';
import MessageBox from '../../components/MessageBox';
import { detailsProduct } from '../../actions/productActions';
import Rating from '../../components/Rating';

const average = arr => arr.reduce((a,b) => a + b, 0) / arr.length;

export default function Product(props) {
    const [rating, setRating] = useState(0);
    const [reviews, setReviews] = useState(0);
    const productID = useParams();
    const dispatch = useDispatch();
    const productDetails = useSelector((state) => state.productDetails);
    const { loading, err, data } = productDetails;
    
    useEffect(() => {
        dispatch(detailsProduct(productID.id));
        if(data && data.user){
            setRating(average(data.user.ratingList));
            setReviews(data.user.ratingList.size());
        }
    }, [dispatch, productID]);

    return(
        <div>
            { 
                loading ? <LoadingBox /> : err ? (<MessageBox variant='danger'>{err}</MessageBox>) : (
                    <div className="product-container">
                        <img src={data.item.image ? data.item.image : placeholder} alt={data.item.name} className="product-page-image" />
                        <div className="product-page-content">
                            <h3 className="product-page-content-name"> {data.item.name} </h3>
                            <p className="product-page-content-info"> Vendedor </p>
                            <div className="owner-container">
                                <a href={`/user/${data.item.owner}`}>
                                    <div className="owner-icon"> {data.user.name} </div>
                                </a>
                                <a href={`/user/${data.item.owner}`}>
                                <div className="owner-info">
                                    <div className="owner-name"> {data.user.name} </div>
                                    <div className="local"> {data.user.address} </div>
                                </div>
                                <Rating rating={rating} numReviews={reviews}/>
                                </a>
            
                                <div className="product-page-content-wish">
                                    <span className='wish-content wish-title'> Desejo: </span>
                                    <span className='wish-content'> {data.item.expected} </span>
                                </div>
                            </div>
                            <p className="product-page-content-info">Descrição</p>
                            <p className="product-page-content-category">Categoria: {data.item.category}</p>
                            <div className="product-page-content-description"> {data.item.description} </div>
                            <Link className="product-offer" to={`/offer/${productID.id}`}>Fazer Oferta</Link>
                        </div>
                    </div>
                )
            }
        </div>
    );
}