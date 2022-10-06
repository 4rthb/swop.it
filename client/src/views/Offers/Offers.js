import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { offerReceived, offerSent } from '../../actions/offerActions';
import OfferCard from '../../components/OfferCard/OfferCard';

import './Offers.css'

export default function Offers() {
    const dispatch = useDispatch();

    const offerSen = useSelector((state) => state.offerSent);
    const userSignin = useSelector((state) => state.userSignin);
    const offerRec = useSelector((state) => state.offerReceived);
    const { userInfo } = userSignin;
    const { offerSInfo, loadingS } = offerSen;
    const { offerRInfo, loadingR } = offerRec;

    useEffect(() => {
        dispatch(offerReceived());
        dispatch(offerSent());
    }, [userInfo])
    
    return (
        <div className='whole'>
            <p className='title1'>
            Minhas trocas
            </p>

            <div className='offer-container'>
            <p className='title2'>Trocas recebidas</p>
            {
                offerRInfo ?
                Object.entries(offerRInfo).map(([key, value]) => (
                    <OfferCard variant='rec' key={key} offer={value} />
                )) :
                <div>Nenhuma troca encontrada</div>
            }
            </div>

            <div className='offer-container'>
            <p className='title2'>Trocas enviadas</p>
            {
                offerSInfo ?
                Object.entries(offerSInfo).map(([key, value]) => (
                    <OfferCard variant='sen' key={key} offer={value} />
                )) :
                <div>Nenhuma troca encontrada</div>
            }
            </div>
        </div>
    )
}
