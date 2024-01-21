/** @type {import('tailwindcss').Config} */
module.exports = {
    content: ['./src/**/*.{js,jsx,ts,tsx}'],
    theme: {
        fontFamily: {
            sans: ['Raleway', 'sans-serif'],
        },
        extend: {
            colors: {},
            fontFamily: {
                monoton: ['Monoton', 'cursive'],
                raleway: ['Raleway'],
                sourceSans: ['"Source Sans 3"', 'sans-serif'],
                josefinSans: ['"Josefin Sans"', 'sans-serif'],
            },
            letterSpacing: {
                heading: '.25rem',
            },
            keyframes: {
                click: {
                    '0%, 100%': {
                        transform: 'scale(1)',
                    },
                    '50%': {
                        transform: 'scale(0.95)',
                    },
                },
                fadeIn: {
                    '0%, 100%': { transform: 'scale(1)' },
                },
            },
            animation: {
                click: 'click 0.35s linear forwards',
                fadeIn: 'fadeIn 1s ease-in forwards',
            },
        },
    },
    plugins: [],
};
