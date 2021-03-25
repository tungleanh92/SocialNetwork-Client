import React from 'react';
import AuthenPage from './../AuthenPage';
import NewsFeed from './../NewsFeed'
import { useRouteMatch } from 'react-router-dom';

const Layout = () => {
    let matchLogin = useRouteMatch("/");
    let matchOffice = useRouteMatch("/newsfeed");
    return (
        <>
            {
                matchOffice ? <NewsFeed /> :
                    matchLogin ? <AuthenPage /> :
                        <></>
            }
        </>
    )
}
export default Layout