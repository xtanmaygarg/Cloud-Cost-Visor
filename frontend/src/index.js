import { StrictMode, Suspense } from 'react';
import { createRoot } from 'react-dom/client';
import { BrowserRouter } from 'react-router-dom';
import { ToastContainer } from 'react-toastify';
import { StoreProvider, createStore, persist } from 'easy-peasy';
// import Modal from 'react-modal';

import App from './App';
import Loader from './components/Loader';
import model from './store';

import './index.css';

// Modal.setAppElement('#modal');
const store = createStore(persist(model));

const root = createRoot(document.getElementById('root'));
root.render(
    <StrictMode>
        <ToastContainer theme='dark' />
        <StoreProvider store={store}>
            <BrowserRouter>
                <Suspense
                    fallback={
                        <div className='w-screen h-screen bg-dark'>
                            <Loader />
                        </div>
                    }
                >
                    <App />
                </Suspense>
            </BrowserRouter>
        </StoreProvider>
    </StrictMode>,
);
