import { lazy, useEffect, useState } from 'react';

const ServiceCost = lazy(() => import('./ServiceCost'));

const ServiceCostList = ({ list }) => {
    const [finalList, setFinalList] = useState([]);

    const computeList = () => {
        const instanceList = list
            ?.filter(({ resourceType }) => resourceType === 'instance')
            ?.splice(0, 5);
        const diskList = list
            ?.filter(({ resourceType }) => resourceType === 'disk')
            ?.splice(0, 5);
        const snapshotList = list
            ?.filter(({ resourceType }) => resourceType === 'snapshot')
            ?.splice(0, 5);

        setFinalList(
            [...instanceList, ...diskList, ...snapshotList].sort(
                (a, b) => b.TotalCost - a.TotalCost,
            ),
        );
    };

    useEffect(() => {
        computeList();
    }, [list]);

    return (
        <div className='bg-zinc-600 p-6 flex flex-col items-center gap-6 relative max-h-[25rem] overflow-y-scroll flex-1 rounded-lg'>
            {finalList?.map((resource, index) => (
                <ServiceCost key={index} resource={resource} />
            ))}
        </div>
    );
};

export default ServiceCostList;
