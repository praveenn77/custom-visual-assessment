import * as React from "react";
interface BarChartProps {
    data: {
        category: string;
        measure: number;
        columnName: string;
        valueName: string;
    }[];
}
declare const BarChart: React.FunctionComponent<BarChartProps>;
export default BarChart;
