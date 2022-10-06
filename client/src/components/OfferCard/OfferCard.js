import React, {  useEffect, useState } from 'react'
import placeholder from '../../images/placeholder.png'
import { useDispatch, useSelector } from 'react-redux';
import { Link, redirect, useNavigate } from 'react-router-dom';
import { offerAnswer } from '../../actions/offerActions';
import { basicProduct } from '../../actions/productActions';

import './OfferCard.css'

export default function OfferCard(props) {
    const { offer, variant } = props;
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const [ offeredItem, setOfferedItem ] = useState();
    const [ desiredItem, setDesiredItem ] = useState();
    const [ offeredID, setOfferedID ] = useState();
    const [ desiredID, setDesiredID ] = useState();

    const productBasic = useSelector((state) => state.productBasic);
    const offerAns = useSelector((state) => state.offerAnswer);
    const { offerAInfo } = offerAns;
    const { bdata } = productBasic;

    useEffect(() => {
        let ofrd = offer.itemsOffered[0]
        dispatch(basicProduct(ofrd))
            .then(bdata => setOfferedItem(bdata))
            .then(offeredItem ? setOfferedID(offeredItem._id) : setOfferedID(""));
    }, [dispatch])

    // useEffect(() => {
    //     let dsrd = offer.itemDesired
    //     dispatch(basicProduct(dsrd))
    //         .then(bdata => setDesiredItem(bdata))
    //         .then(offeredItem ? setDesiredID(offeredItem._id) : setDesiredID(""));
    // }, [dispatch, offer, offeredItem])
    
    function sendAnswer(id, answer) {
        dispatch(offerAnswer(id, answer));
        alert('Resposta de troca enviada');
        navigate(-1);
    };

    return(
        <div className='offer-card'>
            
            <Link className='offer-pack' to={`/product/${desiredID}`}>
                <p className='offer-item'>Item Desejado: {desiredItem}</p>
                <img alt={desiredItem} src={desiredItem ? desiredItem.image : placeholder} />
            </Link>
            
            <Link className='offer-pack' to={`/product/${offeredID}`}>
                <p className='offer-item'>Item Oferecido: {offeredItem}</p>
                <img alt={offeredItem} src={offeredItem ? offeredItem.image : placeholder} />
            </Link>
            
            {
                variant == 'rec' ? (
                    <div className='offer-answer'>
                        <button className='accept' onClick={() => sendAnswer(offer._id, "ACCEPTED")}>Aceitar</button>
                        <button className='reject' onClick={() => sendAnswer(offer._id, "REJECTED")}>Rejeitar</button>
                    </div>
                    ) : (
                        <p className='pending'>Pendente</p>
                    )
            }
        </div>
    )
}