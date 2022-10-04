import { OFFER_ANSWER_FAILED, OFFER_ANSWER_REQUEST, OFFER_ANSWER_SUCCESS, OFFER_RECEIVED_FAILED, OFFER_RECEIVED_REQUEST, OFFER_RECEIVED_SUCCESS, OFFER_REGISTER_FAILED, OFFER_REGISTER_REQUEST, OFFER_REGISTER_SUCCESS, OFFER_SENT_FAILED, OFFER_SENT_REQUEST, OFFER_SENT_SUCCESS } from "../constants/offerConst";

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

export const offerReceivedReducer = (state = {}, action) => {
    switch(action.type) {
        case OFFER_RECEIVED_REQUEST:
            return {loading: true};
        case OFFER_RECEIVED_SUCCESS:
            return {loading: false, offerRInfo: action.payload};
        case OFFER_RECEIVED_FAILED:
            return {loading: false, err: action.payload};
        default:
            return state;
    }
}

export const offerSentReducer = (state = {}, action) => {
    switch(action.type) {
        case OFFER_SENT_REQUEST:
            return {loading: true};
        case OFFER_SENT_SUCCESS:
            return {loading: false, offerSInfo: action.payload};
        case OFFER_SENT_FAILED:
            return {loading: false, err: action.payload};
        default:
            return state;
    }
}

export const offerAnswerReducer = (state = {}, action) => {
    switch(action.type) {
        case OFFER_ANSWER_REQUEST:
            return {loading: true};
        case OFFER_ANSWER_SUCCESS:
            return {loading: false, offerAInfo: action.payload};
        case OFFER_ANSWER_FAILED:
            return {loading: false, err: action.payload};
        default:
            return state;
    }
}