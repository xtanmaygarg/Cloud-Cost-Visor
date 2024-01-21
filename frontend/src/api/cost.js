import axios from 'axios';
import { toast } from 'react-toastify';

import { costClient as client } from './client';

const http = axios.create({
    baseURL: `${process.env.REACT_APP_BASE_API_URL || 'http://localhost:3000'}`,
    headers: {
        'Content-Type': 'application/json',
        'Access-Control-Allow-Origin': '*',
        Accept: 'application/json',
    },
});

const getTotalCost = async (setTotalCost) => {
    try {
        const response = await http.get('/cost');
        const totalCost = response.data.data[0]['TotalCost'];
        setTotalCost(totalCost);
    } catch (e) {
        console.log(e);
        toast.error(e.message || 'Something Went Wrong!');
    }
};

const getServiceCostList = async ({ setList, service }) => {
    try {
        const response = await http.get(`/${service}/list`);
        const list = response.data.data;
        setList(list);
    } catch (e) {
        console.log(e);
        toast.error(e.message || 'Something Went Wrong!');
    }
};

const getComputeEngineTotalCost = async (setComputeEngineTotalCost) => {
    try {
        const response = await http.get('/cost/compute');
        const totalCost = response.data.data[0]['TotalCost'];
        setComputeEngineTotalCost(totalCost);
    } catch (e) {
        console.log(e);
        toast.error(e.message || 'Something Went Wrong!');
    }
};

const getCloudStorageTotalCost = async (setCloudStorageTotalCost) => {
    try {
        const response = await http.get('/cost/storage');
        const totalCost = response.data.data[0]['TotalCost'];
        setCloudStorageTotalCost(totalCost * 1000);
    } catch (e) {
        console.log(e);
        toast.error(e.message || 'Something Went Wrong!');
    }
};

const getCloudNetworkTotalCost = async (setCloudNetworkTotalCost) => {
    try {
        const response = await http.get('/cost/networking');
        const totalCost = response.data.data[0]['TotalCost'];
        setCloudNetworkTotalCost(totalCost);
    } catch (e) {
        console.log(e);
        toast.error(e.message || 'Something Went Wrong!');
    }
};

const cost = () => {
    const get = async () => client.get('/');
    const getServiceList = async (service) => client.get(`/${service}/list`);

    return { get, getServiceList };
};

export default cost;

export {
    getTotalCost,
    getComputeEngineTotalCost,
    getCloudStorageTotalCost,
    getCloudNetworkTotalCost,
    getServiceCostList,
};
