import axios from 'axios';
import cookie from 'react-cookies';
import { QueryClient } from 'react-query';

const client = axios.create({
    baseURL: process.env.REACT_APP_BASE_API_URL || 'http://127.0.0.1:5000/api',
    headers: {
        'Content-Type': 'application/json',
        Accept: 'application/json',
        Authorization: cookie.load('AuthToken'),
    },
});

export const authClient = axios.create({
    baseURL: `${
        process.env.REACT_APP_BASE_API_URL || 'http://127.0.0.1:5000/api'
    }/auth`,
    headers: {
        'Content-Type': 'application/json',
        Accept: 'application/json',
        Authorization: cookie.load('AuthToken'),
    },
});

export const costClient = axios.create({
    baseURL: `${
        process.env.REACT_APP_BASE_API_URL || 'http://127.0.0.1:5000/api'
    }/cost`,
    headers: {
        'Content-Type': 'application/json',
        Accept: 'application/json',
    },
});

export const queryClient = new QueryClient({
    defaultOptions: {
        queries: {
            suspense: true,
            retry: 0,
            revalidateOnFocus: false,
        },
    },
});

export default client;
