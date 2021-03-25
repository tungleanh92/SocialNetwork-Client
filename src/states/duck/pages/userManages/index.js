import * as types from './constants';
const reducer = (state = null, action) => {
    switch (action.type) {
        case types.SHOW_USERS:
            return action.value;
        default:
            return state;
    }
}
export default reducer;