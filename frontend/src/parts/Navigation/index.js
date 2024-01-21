import { lazy } from 'react';
import { NavLink } from 'react-router-dom';
import { useStoreState } from 'easy-peasy';
import {
    UserOutlined,
    BellFilled,
    QuestionCircleFilled,
} from '@ant-design/icons';

const routes = [
    {
        path: '/login',
        name: 'Login',
    },
];

const authenticatedRoutes = [
    {
        path: '/',
        icon: ({ className }) => <QuestionCircleFilled className={className} />,
    },
    {
        path: '/',
        icon: ({ className }) => <BellFilled className={className} />,
    },
    {
        path: '/',
        icon: ({ className }) => <UserOutlined className={className} />,
    },
    {
        path: '/logout',
        name: 'Logout',
    },
];

const SearchBar = lazy(() => import('./components/SearchBar'));

const Navigation = () => {
    const { logged_in } = useStoreState((store) => store.authModel);

    return (
        <nav
            className={`fixed right-0 flex flex-row flex-initial items-center justify-between w-full h-20 gap-8 z-[1] transition-all duration-500 px-24 bg-[#313131]`}
        >
            <NavLink
                to='/'
                aria-label='Home'
                className='flex-shrink-0 banner-text text-3xl'
            >
                CloudCostVisor
            </NavLink>
            {/* {logged_in && <SearchBar />} */}
            <ul className='flex flex-row items-center justify-end gap-9'>
                {(logged_in ? authenticatedRoutes : routes).map(
                    (route, index) => (
                        <li
                            key={index}
                            className='flex justify-center items-center list-none'
                        >
                            <NavLink
                                to={route.path}
                                className='nav-link tracking-wider text-light text-center text-2xl hover:text-purple-600 transition-all duration-150'
                                data-text={route.name}
                                key={index}
                            >
                                {route.icon && (
                                    <route.icon className='text-2xl flex items-center' />
                                )}
                                {route.name}
                            </NavLink>
                        </li>
                    ),
                )}
            </ul>
        </nav>
    );
};

export default Navigation;
