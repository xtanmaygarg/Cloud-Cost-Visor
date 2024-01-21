import React, { memo, useEffect, useState } from 'react';
import Highcharts from 'highcharts';
import HighchartsReact from 'highcharts-react-official';

import { threeCandleStickOptions } from '../../utils/options';

const ThreeCandleStickChart = memo(
    ({
        height,
        width,
        allList = [
            [1, 1, 1],
            [1, 1, 1],
            [1, 1, 1],
        ],
    }) => {
        let [options, setOptions] = useState({});

        useEffect(() => {
            setOptions(
                threeCandleStickOptions(
                    width,
                    height,
                    allList[0],
                    allList[1],
                    allList[2],
                ),
            );
        }, []);

        return (
            <div className={`max-w-[${width}px] invert hue-rotate-180 rounded`}>
                <HighchartsReact highcharts={Highcharts} options={options} />
            </div>
        );
    },
);

export default ThreeCandleStickChart;
