import Axios from "axios";
import { PRODUCT_DETAILS_FAILED, PRODUCT_DETAILS_REQUEST, PRODUCT_DETAILS_SUCCESS, PRODUCT_LIST_FAILED, PRODUCT_LIST_REQUEST, PRODUCT_LIST_SUCCESS, PRODUCT_REGISTER_FAILED, PRODUCT_REGISTER_REQUEST, PRODUCT_REGISTER_SUCCESS } from "../constants/productConst";

export const registerProduct = (name, description, expected, image, category,currentState,owner) => async (dispatch) => {
    dispatch({ type: PRODUCT_REGISTER_REQUEST, payload: { name, owner } });
    try {
        // Axios.defaults.headers.common['Authorization'] = `Bearer ${owner.token}`;
        const { data } = await Axios.post('/api/items/register', { name, description, expected, image, category,currentState,owner }, {headers: { Authorization: `Bearer ${owner.token}` }});
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