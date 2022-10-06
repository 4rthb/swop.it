import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate, useParams } from 'react-router-dom';
import { offerRegister } from '../../actions/offerActions';
import { detailsProduct, getProducts } from '../../actions/productActions';
import placeholder from '../../images/placeholder.png'

import './Offer.css'


export default function Offer(props) {
    const productDetails = useSelector((state) => state.productDetails);
    const userSignin = useSelector((state) => state.userSignin);
    const products = useSelector((state) => state.getProducts);
    const [ item, setItem ] = useState();

    const { userItems } = products;
    const { data } = productDetails;
    const { userInfo } = userSignin;
    const productID = useParams(); 

    const navigate = useNavigate();
    const dispatch = useDispatch();

    const checkoutHandler = (e) => {
        navigate('/offers');
        const offeredItem = userItems.find(obj => { return obj.name === e.target.item.value});
        dispatch(offerRegister({offeredItem}, data.item._id)); 
        alert('Troca enviada com sucesso');
    }

    const itemHandler = (e) => {
        setItem(e.target.value);
    }
    
    useEffect(() => {
        if(userInfo) {
            dispatch(detailsProduct(productID.id));
            dispatch(getProducts(userInfo._id));
        } else {
            alert('É preciso fazer o login para fazer propostas');
            navigate(-1);
        }
    }, [dispatch, userInfo, productID, navigate]);

    return (
    <div className='offer'>
            <img src={data ? data.item.image : placeholder} alt={data ? data.item.name : 'product'} className="offer-product-image" />
        <form onSubmit={checkoutHandler} className="offer-form">
            <input
                className="item-text"
                value={data ? data.item.name : 'product'}
                type="text"
                readOnly={true}
            />
            <br />
            <label>
                <p className='item-text'>Selecione um item para a oferta:</p>
                <select value={`${item}`} onChange={itemHandler} name='item' className='item-text'>
                    {
                        userItems ? 
                        Object.entries(userItems).map(([key, value]) => (
                            <option key={key} value={value.name}>{value.name}</option>
                        )) : <option value="">""</option>
                    }
                </select>
            </label>
            <input className="item" type="submit" value="Enviar Troca" />
        </form>
    </div>
    )
}
