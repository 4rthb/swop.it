import { applyMiddleware, combineReducers, compose, createStore } from 'redux';
import thunk from 'redux-thunk';
import { offerRegisterReducer } from './reducer/offerReducers';
import { getProductsReducer, productDetailsReducer, productListReducer } from './reducer/productReducers';
import { userRegisterReducer, userSigninReducer } from './reducer/userReducers';

const initialState = {
    userSignin: { 
        userInfo: localStorage.getItem('userInfo') 
        ? JSON.parse(localStorage.getItem('userInfo'))
        : null }
};
const reducer = combineReducers({
    productList: productListReducer,
    productDetails: productDetailsReducer,
    userSignin: userSigninReducer,
    userRegister: userRegisterReducer,
    getProducts: getProductsReducer,
    offerRegister: offerRegisterReducer
})

const composeEnhancer = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;
const store = createStore(
    reducer, 
    initialState, 
    composeEnhancer(applyMiddleware(thunk))
);

export default store;