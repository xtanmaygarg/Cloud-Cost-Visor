import { memo, useState, useEffect } from 'react';
import Highcharts from 'highcharts';
import HighchartsReact from 'highcharts-react-official';

const COMPUTE_ENGINE_TYPES = {
    instance: 'Instance',
    disk: 'Disk',
    snapshot: 'Snapshot',
};

const SeptemberBar = memo(({ list }) => {
    const [computeEngineType, setComputeEngineType] = useState('instance');
    const [options, setOptions] = useState({});

    useEffect(() => {
        const ceList = list?.filter(
            ({ resourceType }) => resourceType === computeEngineType,
        );

        setOptions({
            chart: {
                type: 'column'
            },
            title: {
                text: 'Cost of Compute Engines through September'
            },
            xAxis: {
                type: 'category',
                labels: {
                    rotation: -45,
                }
            },
            yAxis: {
                min: 0,
                title: {
                    text: 'Cost in Dollars'
                }
            },
            legend: {
                enabled: false
            },
            // tooltip: {
            //     pointFormat: 'Cost of <b>{point.x}</b> in September: <b>{point.y:.1f} dollars</b>'
            // },
            series: [{
                name: 'Costs',
                colorByPoint: true,
                groupPadding: 0,
                data: ceList?.filter((ce) => ce.resourceType === "disk" ? ce.TotalCost > 1 : ce.TotalCost > 0)?.sort((a, b) => b.TotalCost - a.TotalCost)?.splice(0, 25)?.map((ce) => ([ce.resourceName, ce.TotalCost])),
                dataLabels: {
                    enabled: true,
                    rotation: -90,
                    color: '#FFFFFF',
                    align: 'right',
                    format: '{point.y:.1f}', // one decimal
                    y: 10, // 10 pixels down from the top
                }
            }]
        });
    }, [computeEngineType, list]);


    return (
        <>
            <div className={`w-4/5 invert-[0.85] hue-rotate-180 rounded`}>
                <HighchartsReact highcharts={Highcharts} options={options} />
            </div>
            <div className='w-1/5 flex flex-col justify-evenly'>
                <div className='form-control !gap-1 items-start'>
                    <label>Compute Engine Type</label>
                    <select
                        name='compute'
                        id='compute'
                        onChange={(e) => setComputeEngineType(e.target.value)}
                    >
                        {Object.keys(COMPUTE_ENGINE_TYPES).map((ce) => (
                            <option value={ce}>
                                {COMPUTE_ENGINE_TYPES[ce]}
                            </option>
                        ))}
                    </select>
                </div>
            </div>
        </>
    );
});

export default SeptemberBar;
