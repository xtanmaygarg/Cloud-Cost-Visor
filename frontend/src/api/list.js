import axios from 'axios';
import { toast } from 'react-toastify';

const http = axios.create({
    baseURL: `${process.env.REACT_APP_BASE_API_URL || 'http://localhost:3000'}`,
    headers: {
        'Content-Type': 'application/json',
        'Access-Control-Allow-Origin': '*',
        Accept: 'application/json',
    },
});

const getComputeList = async () => {
    try {
        const response = await http.get('/cost/compute/list');
        return response;
    } catch (e) {
        console.log(e);
        toast.error(e.message || 'Something Went Wrong!');
    }
};
export { getComputeList };
