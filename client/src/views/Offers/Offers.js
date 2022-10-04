import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { offerReceived, offerSent } from '../../actions/offerActions';
import OfferCard from '../../components/OfferCard';

export default function Offers() {
    const [offers, setOffers] = useState([]);
    const dispatch = useDispatch();

    const offerSen = useSelector((state) => state.offerSent);
    const userSignin = useSelector((state) => state.userSignin);
    const offerRec = useSelector((state) => state.offerReceived);
    const { userInfo, loading } = userSignin;
    const { offerSInfo } = offerSen;
    const { offerRInfo } = offerRec;



    useEffect(() => {
        if(!loading) {
            dispatch(offerReceived());
            dispatch(offerSent());
            setOffers({...offerSInfo, ...offerRInfo});
        }
    })
    
    return (
        <div>
            <div>
            Minhas trocas
            </div>
            <div className='offer-container'>
            {
                offerRInfo ?
                Object.entries(offers).map(([key, value]) => (
                    <OfferCard key={key} offer={value} />
                )) :
                <div>Nenhuma troca encontrada</div>
            }
            </div>
        </div>
    )
}
