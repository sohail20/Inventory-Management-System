import { LineChart, Line } from 'recharts';
const data = [
    {name: 'Page A', uv: 400, pv: 2400, amt: 2400},
    {name: 'Page B', uv: 700, pv: 2670, amt: 400}

];

function LineCharts(props) {
    return (
        <LineChart width={400} height={400} data={data}>
            <Line type="monotone" dataKey="uv" stroke="#8884d8" />
            <Line type="monotone" dataKey="uv" stroke="#8884d8" />
        </LineChart>
    );
}

export default LineCharts;
