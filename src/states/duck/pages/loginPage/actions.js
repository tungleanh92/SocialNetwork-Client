import * as constants from './constants';
import { callLoginApi } from './../../../common';
import jwt from 'jsonwebtoken';
export const signUp = (accountData) => {
    return dispatch => callLoginApi(constants.URL_SIGNUP, "POST", accountData,
        function (res) {
            dispatch(logStatus('Register successfully'));
        }, function (err) {
            if (accountData.userId) {
                dispatch(setAuthToken(accountData.userId));
                const token = jwt.sign({ userId: accountData.userId }, 'nodeauthsecret');
                localStorage.setItem('token', token);
            } else {
                dispatch(logStatus(err.response));
            }

        })
}

export const logIn = (username, password) => {
    return dispatch => callLoginApi(constants.URL_LOGIN, "POST", {
        username: username,
        password: password
    }, function (res) {
        localStorage.setItem('token', res.data.token);
        dispatch(setAuthToken(res.data.token));
    }, function (err) {
        dispatch(logStatus(err.response));
    })
}

export const logStatus = (value) => {
    return {
        type: constants.LOGSTATUS,
        value: value
    }
}

export const logOut = () => {
    return {
        type: constants.LOGOUT
    }
}

export const setAuthToken = (value) => {
    return {
        type: constants.SET_AUTH_TOKEN,
        value: value
    }
}