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

const deleteAlert = async (id) => {
    try {
        const response = await http.delete(`/alerts/${id}`);
        return response;
    } catch (e) {
        console.log(e);
        toast.error(e.message || 'Something Went Wrong!');
    }
};

const deleteAction = async (id) => {
    try {
        const response = await http.delete(`/actions/${id}`);
        return response;
    } catch (e) {
        console.log(e);
        toast.error(e.message || 'Something Went Wrong!');
    }
};

const getTemplates = async (resourceType) => {
    try {
        const response = await http.get(
            `/actions/templates?resourceType=${resourceType}`,
        );
        return response;
    } catch (e) {
        console.log(e);
        toast.error(e.message || 'Something Went Wrong!');
    }
};

const postAlert = async (
    recipientsList,
    alertName,
    resourceType,
    resourceId,
    budget,
) => {
    try {
        const response = await http.post('/alerts', {
            alertName,
            resourceType,
            resourceId,
            recipientsList,
            budget,
        });

        return response;
    } catch (e) {
        console.log(e);
        toast.error(e.message || 'Something Went Wrong!');
    }
};

const postAction = async (
    actionName,
    templateId,
    resourceType,
    resourceId,
    budget,
) => {
    try {
        const response = await http.post('/actions', {
            actionName,
            templateId,
            resourceType,
            resourceId,
            budget,
        });

        return response;
    } catch (e) {
        console.log(e);
        toast.error(e.message || 'Something Went Wrong!');
    }
};

const getAlertList = async () => {
    try {
        const response = await http.get('/alerts');
        return response;
    } catch (e) {
        console.log(e);
        toast.error(e.message || 'Something Went Wrong!');
    }
};

const getActionList = async () => {
    try {
        const response = await http.get('/actions');
        return response;
    } catch (e) {
        console.log(e);
        toast.error(e.message || 'Something Went Wrong!');
    }
};

export {
    getActionList,
    getAlertList,
    getTemplates,
    postAlert,
    postAction,
    deleteAlert,
    deleteAction,
};
