import Axios from 'axios';
import { OFFER_ANSWER_FAILED, OFFER_ANSWER_REQUEST, OFFER_ANSWER_SUCCESS, OFFER_RECEIVED_FAILED, OFFER_RECEIVED_REQUEST, OFFER_RECEIVED_SUCCESS, OFFER_REGISTER_FAILED, OFFER_REGISTER_REQUEST, OFFER_REGISTER_SUCCESS, OFFER_SENT_FAILED, OFFER_SENT_REQUEST, OFFER_SENT_SUCCESS } from '../constants/offerConst';

export const offerRegister = (itemsOffered, itemId) => async (dispatch, getState) => {
    dispatch({ type: OFFER_REGISTER_REQUEST, payload: { itemsOffered, itemId } });
    const {
        userSignin: { userInfo },
    } = getState();
    try {
        const user_id = userInfo._id;
        Axios.defaults.headers.common['Authorization'] = `Bearer ${userInfo.token}`;
        const { data } = await Axios.post(`/api/offer/${itemId}`, { user_id, itemsOffered });
        dispatch({ type: OFFER_REGISTER_SUCCESS, payload: data });
        } catch (err) {
            dispatch({
                type: OFFER_REGISTER_FAILED,
                payload:
                    err.response && err.response.data.message
                    ? err.response.data.message
                    : err.message,
            });
    }
};

export const offerReceived = () => async (dispatch, getState) => {
    dispatch({ type: OFFER_RECEIVED_REQUEST });
    const {
        userSignin: { userInfo },
    } = getState();
    try {
        Axios.defaults.headers.common['Authorization'] = `Bearer ${userInfo.token}`;
        const { data } = await Axios.get('/api/offer/offeredToMe');
        dispatch({ type: OFFER_RECEIVED_SUCCESS, payload: data });
        } catch (err) {
            dispatch({
                type: OFFER_RECEIVED_FAILED,
                payload:
                    err.response && err.response.data.message
                    ? err.response.data.message
                    : err.message,
            });
    }
};

export const offerSent = () => async (dispatch, getState) => {
    dispatch({ type: OFFER_SENT_REQUEST });
    const {
        userSignin: { userInfo },
    } = getState();
    try {
        Axios.defaults.headers.common['Authorization'] = `Bearer ${userInfo.token}`;
        const { data } = await Axios.get('/api/offer/myoffers');
        dispatch({ type: OFFER_SENT_SUCCESS, payload: data });
        } catch (err) {
            dispatch({
                type: OFFER_SENT_FAILED,
                payload:
                    err.response && err.response.data.message
                    ? err.response.data.message
                    : err.message,
            });
    }
};

export const offerAnswer = (offerId, answer) => async (dispatch, getState) => {
    dispatch({ type: OFFER_ANSWER_REQUEST, payload: { offerId, answer } });
    const {
        userSignin: { userInfo },
    } = getState();
    try {
        console.log(answer);
        Axios.defaults.headers.common['Authorization'] = `Bearer ${userInfo.token}`;
        const { data } = await Axios.post(`/api/offer/answer/${offerId}`, { answer });
        dispatch({ type: OFFER_ANSWER_SUCCESS, payload: data });
        } catch (err) {
            dispatch({
                type: OFFER_ANSWER_FAILED,
                payload:
                    err.response && err.response.data.message
                    ? err.response.data.message
                    : err.message,
            });
    }
};