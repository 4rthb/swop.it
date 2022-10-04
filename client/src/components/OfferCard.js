import React, {  useEffect, useState } from 'react'
import placeholder from '../images/placeholder.png'
import Rating from './Rating';
import { useDispatch, useSelector } from 'react-redux';
import { Link, redirect } from 'react-router-dom';
import { offerAnswer } from '../actions/offerActions';
import { basicProduct, detailsProduct } from '../actions/productActions';

export default function OfferCard(props) {
    const { offer } = props;
    const dispatch = useDispatch();

    const productDetails = useSelector((state) => state.productDetails);
    const productBasic = useSelector((state) => state.productBasic);
    const offerAns = useSelector((state) => state.offerAnswer);
    const { data } = productDetails;
    const { offerAInfo } = offerAns;
    const { bdata } = productBasic;

    const [offeredUser, setOfferedUser] = useState();
    const [desiredItem, setDesiredItem] = useState();
    const [offeredItem, setOfferedItem] = useState();
    const [desiredId, setDesiredId] = useState();
    const [offeredId, setOfferedId] = useState();
    const [rating, setRating] = useState(0);

    const average = arr => arr.reduce((a,b) => a + b, 0) / arr.length;

    useEffect(() => {
        if(offer) {
            dispatch(detailsProduct(offer.offeredItem));
            dispatch(basicProduct(offer.itemDesired));
        }
        if(offerAInfo){
            alert('Resposta de troca enviada');
            redirect('/');
        }
        if(data) {
            setOfferedItem(data.item);
            setOfferedUser(data.user);
            if(data.user){
                setDesiredId(data.user.id);
            }
        }
        if(bdata) {
            setDesiredItem(bdata);
            setOfferedId(bdata._id);
        }
        if(offeredUser && offeredUser.ratingList) {
            setRating(average(offeredUser.ratingList));
        }
    }, [dispatch, bdata, data, offeredUser, offerAInfo, offer])
    
    function sendAnswer(id, answer) {
        dispatch(offerAnswer(id, answer));
    };

    return(
        <div className='offer-card'>
            
            <Link to={`/product/${desiredId}`}>
                <img alt={desiredItem ? desiredItem.name : ""} src={desiredItem ? desiredItem.image : placeholder} />
                <p className='offer-item'>Item Desejado: {desiredItem ? desiredItem.name : ""}</p>
            </Link>
            
            <Link to={`/user/${offeredId}`}>
                <img alt={offeredItem ? offeredItem.name : ""} src={offeredItem ? offeredItem.image : placeholder} />
                <p className='offer-item'>Item Oferecido: {offeredItem ? offeredItem.name : ""}</p>
                <p className='offer-user'>Dono: {offeredUser ? offeredUser.name : ""}</p>
                <Rating rating={rating} caption=" "/>
            </Link>
            <button className='accept' onClick={() => sendAnswer(offer._id, "ACCEPTED")}>Aceitar</button>
            <button className='reject' onClick={() => sendAnswer(offer._id, "REJECTED")}>Rejeitar</button>
        </div>
    )
}