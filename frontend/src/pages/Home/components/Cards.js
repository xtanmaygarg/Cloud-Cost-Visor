import { formatDollar } from '../../../utils/costConverter';
import { NavLink } from 'react-router-dom';

const Cards = ({ iconPath, cost, name }) => {
    return (
        <NavLink
            to={`/service/compute`}
            className='container w-[10rem] h-[100%] bg-[#313131] flex flex-col rounded font-josefinSans transition ease-in-out hover:-translate hover:scale-110'
        >
            <div className='flex w-[100%] h-[50%] justify-center items-center'>
                <img className='w-[5rem] h-[5rem]' src={iconPath} alt={name} />
            </div>
            <div className='h-[2rem] '></div>
            <div className='flex w-[100%] justify-center'>
                <p className='text-[1.5rem] text-[#A8DF8E] font-bold'>
                    ${formatDollar(cost)}
                </p>
            </div>
            <div className='flex w-[100%] justify-center'>
                <p>{name}</p>
            </div>
        </NavLink>
    );
};

export default Cards;
