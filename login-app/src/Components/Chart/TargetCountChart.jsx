import React from 'react';
import { PieChart, Pie, Cell } from 'recharts';
import useMachineRate from '../hooks/useMachineRate';

function TargetDonutChart({ nowRate }) {
    // const {nowRate} = useMachineRate()
    const percentage = parseFloat((nowRate * 100).toFixed(1));
    const data = [
        { name: 'Achieved', value: percentage },
        { name: 'Remaining', value: 100 - percentage }
    ];
    const COLORS = ['#f50057', '#b388ff']; //Achieved, Remaining

    return (
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', height: '100%' }}>
        <PieChart width={200} height={180}>
            <Pie
                data={data}
                cx="50%"
                cy="50%"
                innerRadius={50}
                outerRadius={70}
                fill="#8884d8"
                paddingAngle={5}
                dataKey="value"
            >
                {data.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} style={{ filter: 'brightness(1.2)' }} />
                ))}
            </Pie>
        </PieChart>
        <div style={{ position: 'absolute',
                      top: '50%', 
                      left: '50%', 
                      transform: 'translate(-50%, -50%)', 
                      fontSize: '20px', 
                      fontWeight: 'bold',
                      color: percentage < 50 ? 'yellow' : 
                             percentage < 70 ? 'green' : 'red'}}>
            {percentage}%
        </div>
       
        </div>
    );
}

export default TargetDonutChart;
