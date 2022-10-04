import Axios from 'axios';
import { USER_PROFILE_FAILED, USER_PROFILE_REQUEST, USER_PROFILE_SUCCESS, USER_REGISTER_FAILED, USER_REGISTER_REQUEST, USER_REGISTER_SUCCESS, USER_SIGNIN_FAILED, USER_SIGNIN_REQUEST, USER_SIGNIN_SUCCESS, USER_SIGNOUT } from '../constants/userConst';

export const register = (name, email, password, address, phoneNumber) => async (dispatch) => {
    dispatch({ type: USER_REGISTER_REQUEST, payload: { email, password } });
    try {
        const { data } = await Axios.post('/api/users/register', { name, email, password, address, phoneNumber });
        dispatch({ type: USER_REGISTER_SUCCESS, payload: data });
        dispatch({ type: USER_SIGNIN_SUCCESS, payload: data });
        localStorage.setItem('userInfo', JSON.stringify(data));
        } catch (err) {
            dispatch({
                type: USER_REGISTER_FAILED,
                payload:
                    err.response && err.response.data.message
                    ? err.response.data.message
                    : err.message,
            });
    }
};

export const signout = () => (dispatch) => {
    localStorage.removeItem('userInfo');
    dispatch({ type: USER_SIGNOUT });
};

export const signin = (email, password) => async (dispatch) => {
    dispatch({ type: USER_SIGNIN_REQUEST, payload: { email, password } });
    try {
        const { data } = await Axios.post('/api/users/signin', { email, password });
        dispatch({ type: USER_SIGNIN_SUCCESS, payload: data });
        localStorage.setItem('userInfo', JSON.stringify(data));
        } catch (err) {
            dispatch({
                type: USER_SIGNIN_FAILED,
                payload:
                    err.response && err.response.data.message
                    ? err.response.data.message
                    : err.message,
            });
    }
};

export const detailsUser = (user) => async (dispatch) => {
    dispatch({ type: USER_PROFILE_REQUEST, payload: { user } });
    try {
        console.log(user);
        
        const { data } = await Axios.get('/api/users/profile',  user );
        console.log(data);
        dispatch({ type: USER_PROFILE_SUCCESS, payload: data });
        } catch (err) {
            dispatch({
                type: USER_PROFILE_FAILED,
                payload:
                    err.response && err.response.data.message
                    ? err.response.data.message
                    : err.message,
            });
    }
};