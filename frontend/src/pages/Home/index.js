import PurpleButton from './components/PurpleButton';
import Cards from './components/Cards';
import Task from './components/Task';
import ThreeCandleStickChart from '../../components/Charts/ThreeCandleStickChart';
import { formatDollar } from '../../utils/costConverter';
import {
    getComputeEngineTotalCost,
    getCloudStorageTotalCost,
    getCloudNetworkTotalCost,
} from './../../api/cost';

import { useEffect, useState, useRef } from 'react';
import { LoadingOutlined } from '@ant-design/icons';
import cookie from 'react-cookies';
import { Navigate } from 'react-router-dom';

let allList = [];
let computeEngineList = [];
let cloudStorageList = [];
let cloudNetworkList = [];

const Home = () => {
    // Initial API Call
    let [totalCost, setTotalCost] = useState('');
    let [computeEngineTotalCost, setComputeEngineTotalCost] = useState('');
    let [cloudStorageTotalCost, setCloudStorageTotalCost] = useState('');
    let [cloudNetworkTotalCost, setCloudNetworkTotalCost] = useState('');

    let month = 'October';

    useEffect(() => {
        getComputeEngineTotalCost(setComputeEngineTotalCost);
        getCloudStorageTotalCost(setCloudStorageTotalCost);
        getCloudNetworkTotalCost(setCloudNetworkTotalCost);
    }, []);

    useEffect(() => {
        setTotalCost(
            Math.floor(computeEngineTotalCost) +
                Math.floor(cloudStorageTotalCost) +
                Math.floor(cloudNetworkTotalCost),
        );

        if (computeEngineTotalCost != '' && computeEngineList.length == 0) {
            computeEngineList = [
                computeEngineTotalCost + 600,
                computeEngineTotalCost + 418,
                computeEngineTotalCost,
            ];
        }
        if (cloudStorageTotalCost != '' && cloudStorageList.length == 0) {
            cloudStorageList = [
                cloudStorageTotalCost + 120,
                cloudStorageTotalCost + 130,
                cloudStorageTotalCost,
            ];
        }
        if (cloudNetworkTotalCost != '' && cloudNetworkList.length == 0) {
            cloudNetworkList = [
                cloudNetworkTotalCost + 700,
                cloudNetworkTotalCost + 795,
                cloudNetworkTotalCost,
            ];
        }

        if (
            computeEngineTotalCost != '' &&
            cloudStorageTotalCost != '' &&
            cloudNetworkTotalCost != '' &&
            allList.length == 0
        ) {
            allList.push(computeEngineList);
            allList.push(cloudStorageList);
            allList.push(cloudNetworkList);
        }
    }, [computeEngineTotalCost, cloudStorageTotalCost, cloudNetworkTotalCost]);

    return cookie.load('AuthToken') ? (
        <>
            {/* Top */}
            <div className='xl:container mx-auto px-32 h-[50%]'>
                <div className='container h-[5.5rem]'></div>
                <div className='flex'>
                    {/* Good Morning Containe */}
                    <div className='container w-[50%]'>
                        <h1 className='text-4xl font-bold font-sourceSans'>
                            Good morning!
                        </h1>
                        <br />
                        <h3 className='w-96 text-[1.1rem] font-sourceSans '>
                            Currently your cumulative cost for the month of{' '}
                            {month} is
                            <span className='font-sourceSans font-bold text-[#A8DF8E]'>
                                {' '}
                                ${formatDollar(totalCost)}
                            </span>
                        </h3>
                        <div className='h-[4rem]'></div>
                        <div className='flex'>
                            <PurpleButton
                                buttonText={'Last Month Cost: '}
                                buttonValue={'$1380'}
                            />
                            <span className='w-[1rem]'></span>
                            <PurpleButton
                                buttonText={'Forecast Cost: '}
                                buttonValue={'$2130'}
                            />
                        </div>
                    </div>

                    {/* Cost Cards */}
                    <div className='container w-[50%] flex justify-around'>
                        <Cards
                            iconPath={
                                '/assets/images/google-compute-engine.svg'
                            }
                            cost={formatDollar(computeEngineTotalCost)}
                            name={'Compute Engine'}
                        />
                        <Cards
                            iconPath={'/assets/images/google-cloud-storage.svg'}
                            cost={formatDollar(cloudStorageTotalCost)}
                            name={'Cloud Storage'}
                        />
                        <Cards
                            iconPath={'/assets/images/google-cloud-network.svg'}
                            cost={formatDollar(cloudNetworkTotalCost)}
                            name={'Cloud Network'}
                        />
                    </div>
                </div>
            </div>

            {/* Bottom */}
            <div className='xl:container mx-auto px-32 h-[50%] flex justify-between place-items-end pb-6'>
                {/* Task Component */}
                <Task />

                {/* Candle Stick Chart Component */}
                {allList.length == 0 ? (
                    <div className='w-[50%] h-[400px] flex justify-center items-center'>
                        <LoadingOutlined />
                    </div>
                ) : (
                    <ThreeCandleStickChart
                        height='400'
                        width='600'
                        allList={allList}
                    />
                )}
            </div>
        </>
    ) : (
        <Navigate to='/login' replace />
    );
};

export default Home;
