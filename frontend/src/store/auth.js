import { action } from 'easy-peasy';
import cookies from 'react-cookies';
import { toast } from 'react-toastify';

const store = {
    logged_in: false,
    token: null,
    user_data: {},
};

const actions = {
    setToken: action(async (state, token) => {
        cookies.save('AuthToken', `AuthToken ${token}`);
        state.token = token;
    }),
    setUserData: action(async (state, data) => {
        const token = cookies.load('AuthToken');
        state.token = token;
        state.logged_in = true;
        state.user_data = data;
    }),
    logout: action((state) => {
        cookies.remove('AuthToken');
        state.logged_in = false;
        state.token = null;
        state.user_data = {};

        // toast.success('Logged Out!');
    }),
};

// eslint-disable-next-line
export default { ...store, ...actions };