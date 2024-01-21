import { useRef } from 'react';
import { NavLink } from "react-router-dom";

const Register = ({ mutation }) => {
    const emailRef = useRef();
    const passwordRef = useRef();
    const fullNameRef = useRef();

    const onSubmit = (e) => {
        e.preventDefault();

        const email = emailRef.current.value;
        const password = passwordRef.current.value;
        const fullName = fullNameRef.current.value;

        mutation.mutate({
            email, password, fullName
        });
    }

    return (
        <form className='form-control' onSubmit={onSubmit}>
            <h4 className='main-heading-text'>Register</h4>
            <input
                className='w-3/4'
                placeholder="Enter your Full Name..."
                type='text'
                id='fullName'
                name='fullName'
                ref={fullNameRef}
                required
            />
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
                Already have an account? 
                <NavLink
                    to='/login'
                    className='pl-1 text-blue-700 font-bold'
                >
                    Login
                </NavLink>
            </p>
        </form>
    )
};

export default Register;