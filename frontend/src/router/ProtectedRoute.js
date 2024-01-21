import { useLocation, Navigate, Outlet } from 'react-router-dom';

const ProtectedRoute = () => {
    const location = useLocation();
    // const token = cookie.load('AuthToken');
    const token = "AuthToken"

    return token ? (
        <Outlet />
    ) : (
        <Navigate to='/login' state={{ from: location }} replace />
    );
};

export default ProtectedRoute;