import { useEffect } from 'react';
import { Navigate } from 'react-router-dom';
import { useStoreActions } from 'easy-peasy';

const Logout = () => {
    const { logout } = useStoreActions((actions) => actions.authModel);

    useEffect(() => {
        logout();

        // eslint-disable-next-line
    }, []);

    return <Navigate to='/login' />;
};

export default Logout;