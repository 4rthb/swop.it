import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate, useParams } from 'react-router-dom';
import { offerRegister } from '../../actions/offerActions';
import { detailsProduct, getProducts } from '../../actions/productActions';
import placeholder from '../../images/placeholder.png'


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
            dispatch(detailsProduct(productID));
            dispatch(getProducts(userInfo));
        } else {
            alert('É preciso fazer o login para fazer propostas');
            navigate(-1);
        }
    }, [dispatch, userInfo, productID, navigate]);

    return (
    <div>
        <div>
            <img src={data ? data.item.image : placeholder} alt={data ? data.item.name : 'product'} className="product-image" />
        </div>
        <form onSubmit={checkoutHandler} className="offer-form">
            <input
                className="item-input"
                value={data ? data.item.name : 'product'}
                type="text"
                readOnly={true}
            />
            <br />
            <label>
                Selecione um item para a oferta:
                <select value={`${item}`} onChange={itemHandler} name='item'>
                    {
                        userItems ? 
                        Object.entries(userItems).map(([key, value]) => (
                            <option key={key} value={value.name}>{value.name}</option>
                        )) : <option value="">""</option>
                    }
                </select>
            </label>
            <input className="item-submit" type="submit" value="Enviar Troca" />
        </form>
    </div>
    )
}
