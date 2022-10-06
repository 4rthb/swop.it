import React, { useEffect, useState } from 'react'
import ProductCard from '../../components/ProductCard'
import LoadingBox from '../../components/LoadingBox';
import MessageBox from '../../components/MessageBox';
import './Profile.css'
import { useDispatch, useSelector } from 'react-redux';
import { getProducts } from '../../actions/productActions';
import { basicUser } from '../../actions/userActions';
import SearchFilter from '../../components/SearchFilter/SearchFilter';
import Rating from '../../components/Rating';

const average = arr => arr.reduce((a,b) => a + b, 0) / arr.length;

export default function Profile() {
    const [rating, setRating] = useState(0);
    const [reviews, setReviews] = useState(0);
    const dispatch = useDispatch();
    const productList = useSelector((state) => state.getProducts); // mudar aqui
    const {loading, err, userItems} = productList;

    const basicUserVar = useSelector((state) => state.basicUser);
    const { userbasic } = basicUserVar;

    useEffect(() => {
        
        let origin = new URL(window.location.href);
        let n = origin.href.lastIndexOf('/');
        let result = origin.href.substring(n + 1);
        
        console.log(result);
        dispatch(basicUser(result));
        
        dispatch(getProducts(result));
    }, []);

    useEffect(() => {
        if(userbasic) {
            console.log(userbasic);
            setRating(average(userbasic.ratingList));
            setReviews(userbasic.ratingList.length)
        }
    }, [userbasic]);

    return(
        <>  
            {
                userbasic ?
                <div className="profile-container">
                    <div className="owner-container">
                        <a href={`/user/${userbasic._id}}`}>
                            <div className="owner-icon owner-icon-profile"> {userbasic.name} </div>
                        </a>
                        <a href={`/user/${userbasic._id}`}>
                        <div className="owner-info">
                            <div className="owner-name"> {userbasic.name} </div>
                            <div className="local"> {userbasic.address} </div>
                        </div>
                        </a>
                        <Rating rating={rating} numReviews={reviews}/>
                    </div>
                </div> :
                <div>Usuário não encontrado</div>
            }

            { 
                loading ? <LoadingBox /> : err ? (<MessageBox variant='danger'>{err}</MessageBox>) : (
                    <div className="marketplace" id='Marketplace' key='Marketplace'>
                        { 
                            userItems ? 
                            userItems.map((product) => (
                                <ProductCard key={product._id} product={product} />
                            )) :
                            <div>Nenhum produto encontrado</div>
                        }
                    </div>
                )
            }
        </>
    )
}