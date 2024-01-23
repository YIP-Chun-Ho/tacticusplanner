﻿import axios from 'axios';

const baseURL = 'https://helloworldseveryn.azurewebsites.net/api/';
// const baseURL = 'http://localhost:7071/api/';

const api = axios.create({
    baseURL,
    headers: {
        'Content-Type': 'application/json',
        'x-functions-key': 'HCBedLkPMCgfKqOboAhxkW_Q6SOvw4mQg0Ompp690ca0AzFuUXyDKg==',
    },
});

api.interceptors.request.use(function (config) {
    config.headers.set('Authorization', localStorage.getItem('token'));
    return config;
});

export default api;
