import Axios from "axios";
import { PRODUCT_DETAILS_FAILED, PRODUCT_DETAILS_REQUEST, PRODUCT_DETAILS_SUCCESS, PRODUCT_LIST_FAILED, PRODUCT_LIST_REQUEST, PRODUCT_LIST_SUCCESS, PRODUCT_OWNERLIST_FAILED, PRODUCT_OWNERLIST_REQUEST, PRODUCT_OWNERLIST_SUCCESS } from "../constants/productConst";

export const listProducts = () => async (dispatch) => {
    dispatch({type: PRODUCT_LIST_REQUEST});
    try {
        const { data } = await Axios.get('/api/items/marketplace');
        dispatch({type: PRODUCT_LIST_SUCCESS, payload: data});
    } catch(err) {
        dispatch({type: PRODUCT_LIST_FAILED, payload: err.message});
    }
};

export const detailsProduct = (productID) => async (dispatch) => {
    dispatch({type: PRODUCT_DETAILS_REQUEST, payload: productID});
    try {
        const pdata = await Axios.get(`/api/items/${productID.id}`);
        const udata = await Axios.get(`/api/users/desiredOwner/${pdata.data.owner}`);
        const data = { item: pdata.data, user: udata.data };
        dispatch({type: PRODUCT_DETAILS_SUCCESS, payload: data});
    } catch(err) {
        dispatch({type: PRODUCT_DETAILS_FAILED, 
                  payload: err.response && err.response.data.message ? 
                           err.response.data.message : 
                           err.message,
        });
    }
};

export const getProducts = (id) => async (dispatch, getState) => {
    dispatch({ type: PRODUCT_OWNERLIST_REQUEST, payload: id});
    const {
        userSignin: { userInfo },
    } = getState();
    try {
        const userId = id._id;
        Axios.defaults.headers.common['Authorization'] = `Bearer ${userInfo.token}`;
        const { data } = await Axios.get(`/api/users/${userId}/items`, userId);
        dispatch({ type: PRODUCT_OWNERLIST_SUCCESS, payload: data });
        } catch (err) {
            dispatch({
                type: PRODUCT_OWNERLIST_FAILED,
                payload:
                    err.response && err.response.data.message
                    ? err.response.data.message
                    : err.message,
            });
    }
};