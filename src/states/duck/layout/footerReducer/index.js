import * as types from "./constants";

const initialState = {
    navVisible : false,
}

const reducer = (state = initialState, action) => {
    switch (action.type) {
    case types.TOGGLE_NAV:
        return { ...state, navVisible : !state.navVisible }
    case types.CHANGE_TOGGLE_NAV:
        return { ...state, navVisible : action.value }
    default:
        return state
    }
}
export default reducer;