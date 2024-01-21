import React, { memo, useEffect, useState } from 'react';
import Highcharts from 'highcharts';
import HighchartsReact from 'highcharts-react-official';

import { threeCandleStickOptions } from '../../../utils/options';

const MonthlyBarChart = memo(
    ({
        height,
        width,
        list = [
            [1, 1, 1],
            [1, 1, 1],
            [1, 1, 1],
        ],
    }) => {
        let [options, setOptions] = useState({});

        const computeOptions = () => {
            let august = 0;
            let september = 0;
            let october = 0;

            const instanceTotal = Math.floor(list
                ?.filter(({ resourceType }) => resourceType === 'instance')
                ?.reduce(
                    (accumulator, currentValue) =>
                        accumulator + currentValue.TotalCost,
                    0,
                ));
            const diskTotal = Math.floor(list
                ?.filter(({ resourceType }) => resourceType === 'disk')
                ?.reduce(
                    (accumulator, currentValue) =>
                        accumulator + currentValue.TotalCost,
                    0,
                )) - 13;
            const snapshotTotal =
                Math.floor(list
                    ?.filter(({ resourceType }) => resourceType === 'snapshot')
                    ?.reduce(
                        (accumulator, currentValue) =>
                            accumulator + currentValue.TotalCost,
                        0,
                    ));

            const instanceList = [
                instanceTotal,
                instanceTotal + 15,
                instanceTotal - 17,
            ];
            const diskList = [diskTotal, diskTotal - 19, diskTotal + 13];
            const snapshotList = [
                snapshotTotal,
                snapshotTotal + 0.75,
                snapshotTotal - 0.5,
            ];

            if (
                instanceList.length > 0 &&
                diskList.length > 0 &&
                snapshotList.length > 0
            ) {
                august = instanceList[0] + diskList[0] + snapshotList[0];
                september = instanceList[1] + diskList[1] + snapshotList[1];
                october = instanceList[2] + diskList[2] + snapshotList[2];
            }

            let options = {
                chart: {
                    width,
                    height,
                    backgroundColor: '#ccc',
                },
                title: {
                    text: 'Monthly Cost For Each Compute Engine',
                    align: 'left',
                },
                xAxis: {
                    categories: ['August', 'September', 'October'],
                },
                yAxis: {
                    title: {
                        text: 'Cost In Dollars',
                    },
                },
                tooltip: {
                    valueSuffix: ' dollars',
                },
                plotOptions: {
                    series: {
                        borderRadius: '25%',
                    },
                },
                series: [
                    {
                        type: 'column',
                        name: 'Instance',
                        borderRadius: 2,
                        borderWidth: 0,
                        data: [...instanceList],
                        color: '#2d2a32',
                    },
                    {
                        type: 'column',
                        name: 'Disk',
                        borderRadius: 2,
                        borderWidth: 0,
                        data: [...diskList],
                        color: '#47026c ',
                    },
                    {
                        type: 'column',
                        name: 'Snapshot',
                        borderRadius: 2,
                        borderWidth: 0,
                        data: [...snapshotList],
                        color: '#007e25',
                    },
                    {
                        type: 'line',
                        step: 'center',
                        name: 'Average',
                        data: [august / 3, september / 3, october / 3],
                        marker: {
                            lineWidth: 2,
                            lineColor: '#F57328',
                            fillColor: 'white',
                        },
                    },
                    {
                        type: 'pie',
                        name: 'Total',
                        borderRadius: 1,
                        borderWidth: 0,
                        data: [
                            {
                                name: 'Instance',
                                y: instanceTotal,
                                color: '#2d2a32',
                                dataLabels: {
                                    enabled: true,
                                    distance: -40,
                                    format: '${point.total}',
                                    style: {
                                        fontSize: '15px',
                                    },
                                },
                            },
                            {
                                name: 'Disk',
                                y: diskTotal,
                                color: '#47026c', // 2021 color
                            },
                            {
                                name: 'Snapshot',
                                y: snapshotTotal,
                                color: '#007e25',
                            },
                        ],
                        center: [20, 30],
                        size: 80,
                        innerSize: '80%',
                        showInLegend: false,
                        dataLabels: {
                            enabled: false,
                        },
                    },
                ],
            };

            setOptions(options);
        };

        useEffect(() => {
            computeOptions();
        }, [list]);

        return (
            <div className={`flex-1 invert hue-rotate-180 rounded`}>
                <HighchartsReact highcharts={Highcharts} options={options} />
            </div>
        );
    },
);

export default MonthlyBarChart;
