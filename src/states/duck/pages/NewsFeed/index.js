import * as types from './constants';
var account = ""
var reducer = (state = account, action) => {
    switch (action.type) {
        case types.GET_ACCOUNT:
            return action.value;
        default:
            return state;
    }
}
export default reducer;