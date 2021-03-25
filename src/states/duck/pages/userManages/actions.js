import * as constants from './constants';
import { callApi } from '../../../common/index';

export const showUsers = () => {
    let token = localStorage.getItem('token');
    return dispatch => callApi(constants.URL_SHOW_USERS, "GET", null, token,
        function (res) {
            dispatch(setUsers(res.data));
        }, function (err) {
            console.log(err);
        })
}

export const setUsers = (value) => {
    return {
        type: constants.SHOW_USERS,
        value: value
    }
}