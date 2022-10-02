import { PRODUCT_DETAILS_FAILED, PRODUCT_DETAILS_REQUEST, PRODUCT_DETAILS_SUCCESS, PRODUCT_LIST_FAILED, PRODUCT_LIST_REQUEST, PRODUCT_LIST_SUCCESS } from "../constants/productConst";

export const productListReducer = (state = { loading: true, products: []}, action) => {
    switch(action.type) {
        case PRODUCT_LIST_REQUEST:
            return {loading: true};
        case PRODUCT_LIST_SUCCESS:
            return {loading: false, products: action.payload};
        case PRODUCT_LIST_FAILED:
            return {loading: false, err: action.payload};
        default:
            return state;
    }
}

export const productDetailsReducer = (state = { data: {}, loading: true }, action) => {
    switch(action.type) {
        case PRODUCT_DETAILS_REQUEST:
            return {loading: true};
        case PRODUCT_DETAILS_SUCCESS:
            return {loading: false, data: action.payload};
        case PRODUCT_DETAILS_FAILED:
            return {loading: false, err: action.payload};
        default:
            return state;
    }
}