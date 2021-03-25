import * as constants from './constants';
import { callLoginApi } from './../../../common';

export const getAccountDetail = (token) => {
    return dispatch => callLoginApi(constants.URL_GETACCOUNT, "POST", token,
        function (res) {
            dispatch(getAccount(res.data));
        }, function (err) {
        })
}

export const getAccount = (value) => {
    return {
        type: constants.GET_ACCOUNT,
        value: value
    }
}