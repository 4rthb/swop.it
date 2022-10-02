import React, { useEffect } from 'react'
import banner from '../../images/banner.jpg'
import './Landing.css'
import ProductCard from '../../components/ProductCard'
import LoadingBox from '../../components/LoadingBox';
import MessageBox from '../../components/MessageBox';
import { useDispatch, useSelector } from 'react-redux';
import { listProducts } from '../../actions/productActions';
import SearchFilter from '../../components/SearchFilter/SearchFilter';

export default function Landing() {
    const dispatch = useDispatch();
    const productList = useSelector((state) => state.productList);
    const {loading, err, products} = productList;

    useEffect(() => {
        dispatch(listProducts());
    }, [dispatch]);
    return(
        <>
            <div className="banner">
                <div className="text-container">
                    <p>Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, 
                    when an unknown printer took a galley of type and scrambled it to make a type specimen book. <br />
                    It has survived not only five centuries, but also the leap into electronic typesetting, 
                    remaining essentially unchanged. <br />It was popularised in the 1960s with the release of Letraset sheets 
                    containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus 
                    PageMaker including versions of Lorem Ipsum</p>
                </div>
                <div className="banner-image-container">
                    <img src={banner} alt="hero banner" className="banner-image" />
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