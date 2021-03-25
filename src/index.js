import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import Layout from "./components/layout"
import 'bootstrap/dist/css/bootstrap.min.css';
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import 'aos/dist/aos.css';
import './styles/less/tool.less';
import './styles/less/pages.less';
import './styles/less/upgrade.less';
// import 'bootstrap';
import store from './states/store';
import { BrowserRouter as Router } from 'react-router-dom';
ReactDOM.render(
    <Provider store={store}>
        <Router>
            <Layout />
        </Router>
    </Provider>,
    document.getElementById('root'));
