import { getSum, formatDollar } from './costConverter';

const threeCandleStickOptions = (
    width,
    height,
    computeEngineList = [],
    cloudStorageList = [],
    cloudNetworkList = [],
) => {
    let august = 0;
    let september = 0;
    let october = 0;
    let computeTotal = 0;
    let storageTotal = 0;
    let networkTotal = 0;

    if (
        computeEngineList.length > 0 &&
        cloudStorageList.length > 0 &&
        cloudNetworkList.length > 0
    ) {
        computeTotal = Math.floor(getSum(computeEngineList));
        storageTotal = Math.floor(getSum(cloudStorageList));
        networkTotal = Math.floor(getSum(cloudNetworkList));

        computeEngineList = computeEngineList.map((num) => {
            return Number(formatDollar(num));
        });

        cloudStorageList = cloudStorageList.map((num) => {
            return Number(formatDollar(num));
        });

        cloudNetworkList = cloudNetworkList.map((num) => {
            return Number(formatDollar(num));
        });

        august =
            computeEngineList[0] + cloudStorageList[0] + cloudNetworkList[0];
        september =
            computeEngineList[1] + cloudStorageList[1] + cloudNetworkList[1];
        october =
            computeEngineList[2] + cloudStorageList[2] + cloudNetworkList[2];
    }

    let options = {
        chart: {
            width,
            height,
            backgroundColor: '#ccc',
        },
        title: {
            text: 'Monthly Cost For Each SKU',
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
                name: 'Compute Engine',
                borderRadius: 2,
                borderWidth: 0,
                data: [...computeEngineList],
                color: '#2d2a32',
            },
            {
                type: 'column',
                name: 'Cloud Storage',
                borderRadius: 2,
                borderWidth: 0,
                data: [...cloudStorageList],
                color: '#47026c ',
            },
            {
                type: 'column',
                name: 'Cloud Network',
                borderRadius: 2,
                borderWidth: 0,
                data: [...cloudNetworkList],
                color: '#007e25',
            },
            {
                type: 'line',
                step: 'center',
                name: 'Average',
                data: [
                    Number(formatDollar(august / 3)),
                    Number(formatDollar(september / 3)),
                    Number(formatDollar(october / 3)),
                ],
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
                        name: 'Compute Engine',
                        y: computeTotal,
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
                        name: 'Cloud Storage',
                        y: storageTotal,
                        color: '#47026c', // 2021 color
                    },
                    {
                        name: 'Cloud Network',
                        y: networkTotal,
                        color: '#007e25',
                    },
                ],
                center: [430, 15],
                size: 80,
                innerSize: '80%',
                showInLegend: false,
                dataLabels: {
                    enabled: false,
                },
            },
        ],
    };

    return options;
};

export { threeCandleStickOptions };
