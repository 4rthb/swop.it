import React, { useEffect } from 'react'
import ProductCard from '../../components/ProductCard'
import LoadingBox from '../../components/LoadingBox';
import MessageBox from '../../components/MessageBox';
import './Profile.css'
import { useDispatch, useSelector } from 'react-redux';
import { listProducts } from '../../actions/productActions';
import SearchFilter from '../../components/SearchFilter/SearchFilter';

export default function Profile() {
    const dispatch = useDispatch();
    const productList = useSelector((state) => state.productList);
    const {loading, err, products} = productList;

    useEffect(() => {
        dispatch(listProducts());
    }, [dispatch]);
    return(
        <>
            <div className="profile-container">
                <div className="owner-container">
                    <a href={`/user/$`}>
                        <div className="owner-icon owner-icon-profile"> Arthur de Cria </div>
                    </a>
                    <a href={`/user/$`}>
                    <div className="owner-info">
                        <div className="owner-name"> Arthur de Cria </div>
                        <div className="local"> Avenida dos Crias, Número 171 </div>
                    </div>
                    </a>
                    <span className="profile-rating">Avaliação:</span>
                    <span className="profile-rating-value">5.0</span>
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