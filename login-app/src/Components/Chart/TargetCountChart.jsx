import React, {useEffect,useState} from 'react';
import { PieChart, Pie, Cell } from 'recharts';
import Snackbar from '@mui/material/Snackbar';
import Alert from '@mui/material/Alert';
import useMachineRate from '../hooks/useMachineRate';

function TargetDonutChart() {
    const {nowRate} = useMachineRate()
    const [open, setOpen] = useState(false)
    // const percentage = parseFloat((nowRate * 100).toFixed(1));
    const percentage = nowRate

    useEffect(() => {
        if (nowRate >= 90 && !open) {
            setOpen(true);
        }
    }, [nowRate]);

    const getAchievedColor = (percentage) => {
        if (percentage < 50) return '#f50057'; //yellow
        if (percentage < 70) return '#b388ff'; // green
        return '#f50057'; // red
    };

    // const data = [
    //     { name: 'Achieved', value: percentage },
    //     { name: 'Remaining', value: 100 - percentage }
    // ];

    const data = [
        { name: 'Achieved', value: percentage, color: getAchievedColor(percentage) },
        { name: 'Remaining', value: 100 - percentage, color: '#b388ff' }
    ];

    // const COLORS = ['#f50057', '#b388ff']; //Achieved, Remaining

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
                        <Cell key={`cell-${index}`} fill={entry.color} style={{ filter: 'brightness(1.2)' }} />
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

            <Snackbar open={open} autoHideDuration={6000} onClose={() => setOpen(false)}>
                <Alert onClose={() => setOpen(false)} severity="warning" variant="filled">
                    도달률이 90% 이상입니다!
                </Alert>
            </Snackbar>
       
        </div>
    );
}

export default TargetDonutChart;
