import Axios from "axios";
import { PRODUCT_DETAILS_FAILED, PRODUCT_DETAILS_REQUEST, PRODUCT_DETAILS_SUCCESS, PRODUCT_LIST_FAILED, PRODUCT_LIST_REQUEST, PRODUCT_LIST_SUCCESS, PRODUCT_REGISTER_FAILED, PRODUCT_REGISTER_REQUEST, PRODUCT_REGISTER_SUCCESS, PRODUCT_OWNERLIST_FAILED, PRODUCT_OWNERLIST_REQUEST, PRODUCT_OWNERLIST_SUCCESS, PRODUCT_BASIC_REQUEST, PRODUCT_BASIC_SUCCESS, PRODUCT_BASIC_FAILED } from "../constants/productConst";

export const registerProduct = (name, description, expected, imageUrl, category, owner) => async (dispatch) => {
    dispatch({ type: PRODUCT_REGISTER_REQUEST, payload: { name, owner } });
    try {
        const user_id = owner._id;
        const { data } = await Axios.post('/api/items/register', { name, description, expected, imageUrl, category, user_id }, 
                                            { headers: { Authorization: `Bearer ${owner.token}` }});
        dispatch({ type: PRODUCT_REGISTER_SUCCESS, payload: data });
        localStorage.setItem('productInfo', JSON.stringify(data));
        } catch (err) {
            dispatch({
                type: PRODUCT_REGISTER_FAILED,
                payload:
                    err.response && err.response.data.message
                    ? err.response.data.message
                    : err.message,
            });
    }
};

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
        const pdata = await Axios.get(`/api/items/${productID}`);
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

export const basicProduct = (productID) => async (dispatch) => {
    dispatch({type: PRODUCT_BASIC_REQUEST, payload: productID});
    try {
        const bdata = await Axios.get(`/api/items/${productID}`);
        dispatch({type: PRODUCT_BASIC_SUCCESS, payload: bdata});
    } catch(err) {
        dispatch({type: PRODUCT_BASIC_FAILED, 
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
        //console.log(id);
        const userId = id;
        Axios.defaults.headers.common['Authorization'] = `Bearer ${userInfo.token}`;
        //console.log();
        const { data } = await Axios.get(`/api/users/${userId}/items`, userId);
        //console.log(data);
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