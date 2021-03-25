import React from 'react';
import HomePage from '../components/homePage'

const routes = [
    {
        path: '/',
        exact: true,
        name: 'Trang chủ',
        iconImage: ['/images/icon1.png', '/images/icon1_hover.png'],
        main: () => <HomePage />,
    },
    {
        path: '/a',
        exact: true,
        name: 'Menu 1',
        iconImage: ['/images/icon1.png', '/images/icon1_hover.png'],
        main: () => <HomePage />,
    },
    {
        path: '/ab',
        exact: true,
        name: 'Menu2',
        iconImage: ['/images/icon1.png', '/images/icon1_hover.png'],
        main: () => <HomePage />,
    },
    {
        path: '/menu3',
        exact: false,
        name: 'Menu 3',
        iconImage: ['/images/icon1.png', '/images/icon1_hover.png'],
        main: () => <HomePage />,
        childs: [
            {
                path: 'ab',
                name: 'Dropdown menu 1',
                main: ()=><HomePage/>
            },
            {
                path: 'a',
                name: 'Dropdown menu 1',
                main: ()=><HomePage/>
            },
            {
                path: 'ab',
                name: 'Dropdown menu 1',
                main: ()=><HomePage/>
            },
            {
                path: 'abc',
                name: 'Dropdown menu 1',
                main: ()=><HomePage/>
            }
        ]
    },
    {
        path: '/menu4',
        exact: false,
        name: 'Menu 4',
        iconImage: ['/images/icon1.png', '/images/icon1_hover.png'],
        main: () => <HomePage />,
        childs: [
            {
                path: 'adc',
                name: 'Dropdown menu 1',
                main: ()=><HomePage/>
            },
            {
                path: 'dc',
                name: 'Dropdown menu 1',
                main: ()=><HomePage/>
            },
            {
                path: 'dfdf',
                name: 'Dropdown menu 1',
                main: ()=><HomePage/>
            },
            {
                path: 'fdfd',
                name: 'Dropdown menu 1',
                main: ()=><HomePage/>
            }
        ]
    },
    {
        path: '/menu5',
        exact: false,
        name: 'Menu 5',
        iconImage: ['/images/icon1.png', '/images/icon1_hover.png'],
        main: () => <HomePage />,
        childs: [
            {
                path: '/',
                name: 'Dropdown menu 1',
                main: ()=><HomePage/>
            },
            {
                path: '/',
                name: 'Dropdown menu 1',
                main: ()=><HomePage/>
            },
            {
                path: '/',
                name: 'Dropdown menu 1',
                main: ()=><HomePage/>
            },
            {
                path: '/',
                name: 'Dropdown menu 1',
                main: ()=><HomePage/>
            }
        ]
    },
];
export default routes;