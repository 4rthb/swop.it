import { applyMiddleware, combineReducers, compose, createStore } from 'redux';
import thunk from 'redux-thunk';
import { productDetailsReducer, productListReducer, productRegisterReducer, getProductsReducer, productBasicReducer } from './reducer/productReducers';
import { basicUserReducer, detailsUserReducer, userRegisterReducer, userSigninReducer } from './reducer/userReducers';
import { offerAnswerReducer, offerReceivedReducer, offerRegisterReducer, offerSentReducer } from './reducer/offerReducers';

const initialState = {
    userSignin: { 
        userInfo: localStorage.getItem('userInfo') 
        ? JSON.parse(localStorage.getItem('userInfo'))
        : null }
};
const reducer = combineReducers({
    productList: productListReducer,
    productDetails: productDetailsReducer,
    productBasic: productBasicReducer,
    itemRegister: productRegisterReducer,
    userSignin: userSigninReducer,
    userRegister: userRegisterReducer,
    detailsUser: detailsUserReducer,
    basicUser: basicUserReducer,
    getProducts: getProductsReducer,
    offerRegister: offerRegisterReducer,
    offerReceived: offerReceivedReducer,
    offerSent: offerSentReducer,
    offerAnswer: offerAnswerReducer
})

const composeEnhancer = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;
const store = createStore(
    reducer, 
    initialState, 
    composeEnhancer(applyMiddleware(thunk))
);

export default store;