import { lazy } from "react";
import { Image } from 'react-shimmer';
import { Navigate, useNavigate, useParams } from 'react-router-dom';
import cookie from 'react-cookies';
import { useStoreActions } from 'easy-peasy';
import { useMutation } from 'react-query';
import { toast } from 'react-toastify';

import useAPI from "../../api";

import Loader from '../../components/Loader';

const Login = lazy(() => import('./Login'));
const Register = lazy(() => import('./Register'));

const Auth = () => {
    const params = useParams();
    const navigate = useNavigate();

    const { setUserData, setToken } = useStoreActions(
        (actions) => actions.authModel,
    );

    const api = useAPI();
    const loginMutation = useMutation(api.auth.login, {
        onSuccess: async (data) => {
            setToken(data?.data?.token);
            setUserData(data?.data?.userData);

            toast.success(data?.data?.message ?? 'Successfully Logged In!');
            navigate('/');
        },
        onError: (data) =>
            toast.error(
                data?.response?.data?.message ?? 'Internal Server Error',
            ),
    });

    const registerMutation = useMutation(api.auth.register, {
        onSuccess: async (data) => {
            setToken(data?.data?.token);
            setUserData(data?.data?.userData);

            toast.success(data?.data?.message ?? 'Successfully Logged In!');
            navigate('/');
        },
        onError: (data) =>
            toast.error(
                data?.response?.data?.message ?? 'Internal Server Error',
            ),
    });

    
    return !cookie.load('AuthToken') && ['login', 'register'].includes(params.authMode) ? (
        <main className='relative flex items-center h-full overflow-hidden flex-row justify-evenly flex-nowrap px-12 gap-20'>
            <section className='relative flex flex-col items-center justify-center w-2/5 auth-frame bg-dark h-[45rem] py-24 px-20 bg-zinc-800 rounded-2xl gap-7'>
                <Image
                    NativeImgProps={{
                        alt: 'Frame',
                    }}
                    fallback={<Loader />}
                    fadeIn
                    src='/assets/images/login.svg'
                />
                <p className='text-center'>
                    Are you tired of paying too much for your cloud costs? Do you feel like you're constantly losing money to the cloud giants? Well, now there's Cloud Cost Cutter, the ultimate cloud cost optimization solution!
                    <br />
                    Join CloudCostVisor Today!
                </p>
            </section>
            <section className='relative flex items-center justify-center w-2/5 gap-20 flex-col auth-btn-frame'>
                <h1 className='banner-text'>
                    Cloud Cost Visor
                </h1>

                {params.authMode === 'login' ? (
                    <Login mutation={loginMutation} />
                ) : (
                    <Register mutation={registerMutation} />
                )}
            </section>
        </main>
    ) : (
        <Navigate to='/' replace />
    )
};

export default Auth;