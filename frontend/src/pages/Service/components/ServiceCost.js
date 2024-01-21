import { Tooltip as ReactTooltip } from 'react-tooltip'
import { PictureOutlined, CloudServerOutlined, SaveOutlined } from "@ant-design/icons";

const ServiceCost = ({ resource: { resourceType, resourceName, date, TotalCost } }) => {
    return (
        <>
            <div className='bg-zinc-300 rounded-lg w-full p-5 flex justify-between' data-tooltip-id="resource-type" data-tooltip-content="Click to add action">
                <div data-tooltip-id="resource-type-tooltip" data-tooltip-content={String(resourceType).toUpperCase()}>
                    {
                        resourceType === 'disk' ? <SaveOutlined style={{
                            color: '#3e3e3e',
                            fontSize: '1.5rem'
                        }} /> : resourceType === 'instance' ? <CloudServerOutlined style={{
                            color: '#3e3e3e',
                            fontSize: '1.5rem'
                        }} /> : <PictureOutlined style={{
                            color: '#3e3e3e',
                            fontSize: '1.5rem'
                        }} />
                    }
                </div>
                <ReactTooltip id="resource-type-tooltip" />
                <span className="text-zinc-950 bold max-w-xs overflow-hidden text-ellipsis whitespace-nowrap">{resourceName}</span>
                <span className="text-zinc-950"><span className="text-green-600">${Number(TotalCost).toFixed(2)}</span> from the start of month</span>
            </div>
            <ReactTooltip id="resource-type-tooltip" content="Click to add action" place="bottom" />
        </>
    )
};

export default ServiceCost;