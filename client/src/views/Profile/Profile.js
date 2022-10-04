import React, { useEffect, useState } from 'react'
import ProductCard from '../../components/ProductCard'
import LoadingBox from '../../components/LoadingBox';
import MessageBox from '../../components/MessageBox';
import './Profile.css'
import { useDispatch, useSelector } from 'react-redux';
import { listProducts } from '../../actions/productActions';
import { detailsUser } from '../../actions/userActions';
import SearchFilter from '../../components/SearchFilter/SearchFilter';
import Rating from '../../components/Rating';

const average = arr => arr.reduce((a,b) => a + b, 0) / arr.length;

export default function Profile() {
    const [rating, setRating] = useState(0);
    const [reviews, setReviews] = useState(0);
    const dispatch = useDispatch();
    const productList = useSelector((state) => state.productList); // mudar aqui
    const {loading, err, products} = productList;

    const detailsUserVar = useSelector((state) => state.detailsUser);
    const { userDetails } = detailsUserVar;
    const userSignin = useSelector((state) => state.userSignin);
    const { userInfo } = userSignin;

    useEffect(() => {
        dispatch(listProducts());
        dispatch(detailsUser(userInfo));
        if(userDetails) {
            setRating(average(userDetails.ratingList));
            setReviews(userDetails.ratingList.size())
        }
    }, [dispatch, userInfo, userDetails]);

    return(
        <>
            <div className="profile-container">
                <div className="owner-container">
                    <a href={`/user/${userInfo._id}}`}>
                        <div className="owner-icon owner-icon-profile"> {userInfo.name} </div>
                    </a>
                    <a href={`/user/${userInfo._id}`}>
                    <div className="owner-info">
                        <div className="owner-name"> {userInfo.name} </div>
                        <div className="local"> {userInfo.address} </div>
                    </div>
                    </a>
                    <Rating rating={rating} numReviews={reviews}/>
                </div>
            </div>

            <SearchFilter />

            { 
                loading ? <LoadingBox /> : err ? (<MessageBox variant='danger'>{err}</MessageBox>) : (
                    <div className="marketplace" id='Marketplace' key='Marketplace'>
                        { 
                            products.map((product) => (
                                <ProductCard key={product._id} product={product} />
                            )) 
                        }
                    </div>
                )
            }
        </>
    )
}