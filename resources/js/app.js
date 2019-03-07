/**
 * First we will load all of this project's JavaScript dependencies which
 * includes React and other helpers. It's a great starting point while
 * building robust, powerful web applications using React + Laravel.
 */

require('./bootstrap');

import ReactDOM from "react-dom";
import React from "react";
import { BrowserRouter } from 'react-router-dom'

import Header from "./components/Header";
import Body from "./components/Body";
import Footer from "./components/Footer";

import Axios from 'axios';
import { ToastContainer } from 'react-toastify';

Axios.interceptors.request.use(function (config) {

    // spinning start to show
    // UPDATE: Add this code to show global loading indicator
    document.body.classList.add('loading-indicator');

    const token = window.localStorage.token;
    if (token) {
        config.headers.Authorization = `token ${token}`
    }
    return config
}, function (error) {
    return Promise.reject(error);
});

Axios.interceptors.response.use(function (response) {

    // spinning hide
    // UPDATE: Add this code to hide global loading indicator
    document.body.classList.remove('loading-indicator');

    return response;
}, function (error) {
    return Promise.reject(error);
});

class App extends React.Component {
    render() {
        return (
            <BrowserRouter>
                <div className="container">
                    <Header />
                    <Body />
                    <Footer />
                    <ToastContainer />
                </div>
            </BrowserRouter>
        )
    }
}

if (document.getElementById('app')) {
    ReactDOM.render(<App />, document.getElementById('app'));
}
