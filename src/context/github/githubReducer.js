import {
    SEARCH_USERS,
    SET_ALERT,
    SET_LOADING,
    GET_REPOS,
    GET_USER,
    REMOVE_ALERT,
    CLEAR_USERS
} from '../types';

export default (state, action) => {
    switch (action.type) {
        case SEARCH_USERS:
            return {
                ...state,
                users: action.payload,
                loading: false
            }
        case CLEAR_USERS:
            return {
                ...state,
                users: [],
                loading: false
            }
        case SET_LOADING:
            return {
                ...state,
                loading: true
            }
        case SET_ALERT:
            return {
                ...state,
                alert: "Enter a username"
            }
        case REMOVE_ALERT:
            return {
                ...state,
                alert: null
            }
        default:
            return state;
    }
}