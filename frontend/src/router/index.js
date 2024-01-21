import { lazy, Suspense } from 'react';
import { Route, Routes } from 'react-router-dom';
// import { useMutation } from 'react-query';
// import { useStoreActions } from 'easy-peasy';
// import { AnimatePresence } from 'framer-motion';

// import useApi from '../api';

import Loader from '../components/Loader';
import ProtectedRoute from './ProtectedRoute';

const Layout = lazy(() => import('./Layout'));

// Pages
const Home = lazy(() => import('../pages/Home'));
const Service = lazy(() => import('../pages/Service'));
const Auth = lazy(() => import('../pages/Auth'));
const Logout = lazy(() => import('../pages/Auth/components/Logout'));

const Router = () => {
    // const { setUserData } = useStoreActions((actions) => actions.authModel);

    // const api = useApi();
    // const { mutate } = useMutation(api.auth.verify, {
    //     onSuccess: (data) => setUserData(data?.data?.userData),
    // });

    // useLayoutEffect(() => {
    //     mutate();

    //     // eslint-disable-next-line
    // }, []);

    return (
        // <AnimatePresence>
        <Routes>
            <Route path='/' element={<Layout />}>
                <Route
                    index
                    element={
                        <Suspense fallback={<Loader />}>
                            <Home />
                        </Suspense>
                    }
                />
                <Route
                    element={
                        <Suspense fallback={<Loader />}>
                            <ProtectedRoute />
                        </Suspense>
                    }
                >
                    <Route
                        path='logout'
                        element={
                            <Suspense fallback={<Loader />}>
                                <Logout />
                            </Suspense>
                        }
                    />
                    <Route
                        path='service/:service'
                        element={
                            <Suspense fallback={<Loader />}>
                                <Service />
                            </Suspense>
                        }
                    />
                </Route>
                {/* Auth Pages - To be kept in end */}
                <Route
                    path=':authMode'
                    element={
                        <Suspense fallback={<Loader />}>
                            <Auth />
                        </Suspense>
                    }
                />
            </Route>
        </Routes>
        // </AnimatePresence>
    );
};

export default Router;