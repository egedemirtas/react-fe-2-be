import React, { useEffect, useReducer } from "react";
import GithubContext from "./githubContext";
import GithubReducer from "./githubReducer";

import {
    SEARCH_USERS,
    SET_ALERT,
    SET_LOADING,
    GET_REPOS,
    GET_USER,
    REMOVE_ALERT,
    CLEAR_USERS
} from '../types';

const GithubState = props => {

    const initialState = {
        users: [],
        user: {},
        repos: [],
        loading: false,
        alert: null
    }

    const [state, dispatch] = useReducer(GithubReducer, initialState);

    // get all users
    const fetchUsers = async () => {
        setLoading();
        const response = await fetch(`https://api.github.com/users?client_id=${process.env.REACT_APP_GITHUB_CLIENT_ID}&client_secret=${process.env.REACT_APP_GITHUB_CLIENT_SECRET}`);
        const data = await response.json();
        console.log(data)
        return data;
    }

    // search users
    const searchUsers = async text => {

        setLoading();
        const response = await fetch(`https://api.github.com/search/users?q=${text}&client_id=${process.env.REACT_APP_GITHUB_CLIENT_ID}&client_secret=${process.env.REACT_APP_GITHUB_CLIENT_SECRET}`);
        const data = await response.json();
        if (!data.items) {
            return;
        }

        dispatch({
            type: SEARCH_USERS,
            payload: data.items
        });
    }

    // clear users
    const clearUsers = () => {
        dispatch({
            type: CLEAR_USERS
        });
    };

    // showAlert
    const showAlert = () => {
        setAlert()
        setTimeout(() => dispatch({
            type: REMOVE_ALERT
        }), 5000);
    };

    // set loading
    const setLoading = () => dispatch({ type: SET_LOADING });

    // set alert
    const setAlert = () => dispatch({ type: SET_ALERT });

    return <GithubContext.Provider value={{
        users: state.users,
        user: state.user,
        repos: state.repos,
        loading: state.loading,
        alert: state.alert,
        searchUsers,
        clearUsers,
        showAlert,
        fetchUsers
    }}>
        {props.children}
    </GithubContext.Provider>
}

export default GithubState;