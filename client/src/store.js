import { applyMiddleware, combineReducers, compose, createStore } from 'redux';
import thunk from 'redux-thunk';
import { productDetailsReducer, productListReducer, productRegisterReducer, getProductsReducer } from './reducer/productReducers';
import { basicUserReducer, detailsUserReducer, userRegisterReducer, userSigninReducer } from './reducer/userReducers';
import { offerRegisterReducer } from './reducer/offerReducers';

const initialState = {
    userSignin: { 
        userInfo: localStorage.getItem('userInfo') 
        ? JSON.parse(localStorage.getItem('userInfo'))
        : null }
};
const reducer = combineReducers({
    productList: productListReducer,
    productDetails: productDetailsReducer,
    itemRegister: productRegisterReducer,
    userSignin: userSigninReducer,
    userRegister: userRegisterReducer,
    detailsUser: detailsUserReducer,
    basicUser: basicUserReducer,
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