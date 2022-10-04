import Axios from 'axios';
import { OFFER_REGISTER_FAILED, OFFER_REGISTER_REQUEST, OFFER_REGISTER_SUCCESS } from '../constants/offerConst';

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