import { useEffect, useState } from 'react';

const PurpleButton = ({ buttonText, buttonValue }) => {
    let [debounce, setDebounce] = useState(false);
    let [text, setText] = useState('');
    useEffect(() => {
        setTimeout(() => {
            setDebounce(true);
        }, 3000);
    }, []);

    useEffect(() => {
        if (debounce) setText(buttonText + buttonValue);
    }, [debounce]);

    return (
        <button className='rounded bg-[#313131] px-[3em] py-[1rem] font-bold'>
            {text}
        </button>
    );
};

export default PurpleButton;
