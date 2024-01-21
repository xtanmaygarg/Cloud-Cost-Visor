import cookie from 'react-cookies';

import { authClient as client } from './client';

const auth = () => {
    const verify = async () =>
        client.post(
            '/verify',
            {},
            {
                headers: {
                    Authorization: cookie.load('AuthToken'),
                },
            },
        );

    const login = async (data) => client.post('/login', data);

    const register = async (data) => client.post('/register', data);

    return { verify, login, register };
};

export default auth;
