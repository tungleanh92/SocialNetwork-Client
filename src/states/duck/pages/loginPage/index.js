import * as types from './constants';
var initialState = ""
var reducer = (state = initialState, action) => {
    switch (action.type) {
        case types.SET_AUTH_TOKEN:
            return action.value;
        case types.LOGOUT:
            return "";
        case types.LOGSTATUS:
            return action.value;
        case types.SET_OAUTH_ID:
            return action.value;
        default:
            return state;
    }
}
export default reducer;