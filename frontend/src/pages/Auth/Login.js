import { useRef } from 'react';
import { NavLink } from "react-router-dom";

const Login = ({ mutation }) => {
    const emailRef = useRef();
    const passwordRef = useRef();

    const onSubmit = (e) => {
        e.preventDefault();

        const email = emailRef.current.value;
        const password = passwordRef.current.value;

        mutation.mutate({
            email, password
        });
    }

    return (
        <form className='form-control' onSubmit={onSubmit}>
            <h4 className='main-heading-text'>Login</h4>
            <input
                className='w-3/4'
                placeholder="Enter your email..."
                type='email'
                id='email'
                name='email'
                ref={emailRef}
                required
            />
            <input
                className='w-3/4'
                placeholder="Enter your password..."
                type='password'
                id='password'
                name='password'
                ref={passwordRef}
                required
            />
            <button
                className='w-3/4 p-2 text-2xl font-bold uppercase transition-all duration-300 border-2 border-transparent rounded-md bg-purple-900 hover:border-white text-dark hover:text-light disabled:text-light disabled:bg-zinc-600 disabled:hover:border-zinc-800'
                disabled={mutation?.isLoading}
                type='submit'
            >
                {mutation?.isLoading ? 'Wait for it...' : 'Submit'}
            </button>
            <p>
                Don't have an account? 
                <NavLink
                    to='/register'
                    className='pl-1 text-blue-700 font-bold'
                >
                    Register
                </NavLink>
            </p>
        </form>
    )
};

export default Login;