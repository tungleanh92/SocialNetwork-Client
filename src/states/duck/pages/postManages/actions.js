import * as constants from './constants';
import { callApi } from './../../../common/index';

export const createPost = (post) => {
    let token = localStorage.getItem('token');
    return dispatch => callApi(constants.URL_CREATE_POST, "POST", post, token,
        function (res) {
            dispatch(setPost(res.data));
        }, function (err) {
            console.log(err);
        })
}

export const createComment = (cmt) => {
    let token = localStorage.getItem('token');
    return dispatch => callApi(constants.URL_CREATE_CMT, "POST", cmt, token,
        function (res) {
            dispatch(setComment(res.data));
        }, function (err) {
            console.log(err);
        })
}

export const setPost = (value) => {
    return {
        type: constants.SET_POST,
        value: value
    }
}

export const setComment = (value) => {
    return {
        type: constants.SET_COMMENT,
        value: value
    }
}