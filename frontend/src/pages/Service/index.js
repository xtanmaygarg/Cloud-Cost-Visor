import { lazy, useState, useEffect } from 'react';
import { useQuery } from "react-query";
import { useParams, Navigate } from "react-router-dom";

import useAPI from '../../api';

const ServiceCostList = lazy(() => import('./components/ServiceCostList'));
const MonthlyBarChart = lazy(() => import('./components/MonthlyBarChart'));
const SeptemberBar = lazy(() => import('./components/SeptemberBar'));

const Service = () => {
    const { service } = useParams();

    const api = useAPI();
    const {
        data: {data}
    } = useQuery('service-cost-list', () => api.cost.getServiceList(service))

    const [list, setList] = useState([]);

    useEffect(() => {
        setList(data?.data);
        console.log("okau")
    }, [data]);

    return ['compute', 'storage', 'networking'].includes(service) ? (
        <article className='flex flex-col px-24 gap-6'>
            <h1 className="main-heading-text text-purple-600">Cloud {service === 'compute' ? 'Compute Engine' : service === "storage" ? 'Storage' : 'Network'} Service</h1>
            <section className='flex gap-12'>
                <ServiceCostList list={list} />
                <MonthlyBarChart list={list}/>
            </section>
            <section className='flex gap-12'>
                <SeptemberBar list={list}/>
            </section>
        </article>
    ) : <Navigate to='/' replace />;
};

export default Service;