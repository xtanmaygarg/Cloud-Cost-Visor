import { lazy } from 'react';
import { Outlet } from 'react-router-dom';

const Navigation = lazy(() => import('../parts/Navigation'));

const Layout = () => {
    return (
        <main
            initial='hidden'
            animate='show'
            variants={{ show: { transition: { staggerChildren: 0.1 } } }}
            className='w-screen h-screen bg-dark'
        >
            <Navigation />
            <article
                variants={{
                    hidden: { opacity: 0 },
                    show: { opacity: 1 },
                }}
                className='relative z-0 w-full h-full md:pt-24'
            >
                <div
                    variants={{
                        hidden: { opacity: 0 },
                        show: { opacity: 1 },
                    }}
                    className={'relative w-full h-full overflow-auto transition-all translate-x-0 scale-100 rounded-none'}
                >
                    <Outlet />
                </div>
            </article>
        </main>
    );
};

export default Layout;