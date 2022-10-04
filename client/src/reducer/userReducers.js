import { USER_BASIC_FAILED, USER_BASIC_REQUEST, USER_BASIC_SUCCESS, USER_PROFILE_FAILED, USER_PROFILE_REQUEST, USER_PROFILE_SUCCESS, USER_REGISTER_FAILED, USER_REGISTER_REQUEST, USER_REGISTER_SUCCESS, USER_SIGNIN_FAILED, USER_SIGNIN_REQUEST, USER_SIGNIN_SUCCESS, USER_SIGNOUT } from "../constants/userConst";

export const userSigninReducer = (state = {}, action) => {
    switch(action.type) {
        case USER_SIGNIN_REQUEST:
            return {loading: true};
        case USER_SIGNIN_SUCCESS:
            return {loading: false, userInfo: action.payload};
        case USER_SIGNIN_FAILED:
            return {loading: false, err: action.payload};
            case USER_SIGNOUT:
                return {};
        default:
            return state;
    }
}

export const userRegisterReducer = (state = {}, action) => {
    switch(action.type) {
        case USER_REGISTER_REQUEST:
            return {loading: true};
        case USER_REGISTER_SUCCESS:
            return {loading: false, userInfo: action.payload};
        case USER_REGISTER_FAILED:
            return {loading: false, err: action.payload};
        default:
            return state;
    }
}

export const detailsUserReducer = (state = {}, action) => {
    switch(action.type) {
        case USER_PROFILE_REQUEST:
            return {loading: true};
        case USER_PROFILE_SUCCESS:
            return {loading: false, userDetails: action.payload};
        case USER_PROFILE_FAILED:
            return {loading: false, err: action.payload};
        default:
            return state;
    }
}

export const basicUserReducer = (state = {}, action) => {
    switch(action.type) {
        case USER_BASIC_REQUEST:
            return {loading: true};
        case USER_BASIC_SUCCESS:
            return {loading: false, userbasic: action.payload};
        case USER_BASIC_FAILED:
            return {loading: false, err: action.payload};
        default:
            return state;
    }
}