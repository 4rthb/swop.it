import { OFFER_REGISTER_FAILED, OFFER_REGISTER_REQUEST, OFFER_REGISTER_SUCCESS } from "../constants/offerConst";

export const offerRegisterReducer = (state = {}, action) => {
    switch(action.type) {
        case OFFER_REGISTER_REQUEST:
            return {loading: true};
        case OFFER_REGISTER_SUCCESS:
            return {loading: false, offerInfo: action.payload};
        case OFFER_REGISTER_FAILED:
            return {loading: false, err: action.payload};
        default:
            return state;
    }
}