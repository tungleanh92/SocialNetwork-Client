import { combineReducers } from "redux";
import tokenOrStatus from './../duck/pages/loginPage';
import account from './../duck/pages/NewsFeed';
import postManage from './../duck/pages/postManages'
import showUsers from './../duck/pages/userManages'

const rootReducer = combineReducers({
    tokenOrStatus, account, postManage, showUsers
});
export default rootReducer;