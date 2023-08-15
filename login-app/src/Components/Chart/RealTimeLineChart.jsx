import React, { useState, useEffect } from 'react';
import { LineChart, XAxis, YAxis, CartesianGrid, Tooltip, Legend, Line, ReferenceLine } from 'recharts';
import useMachineCount from '../hooks/useMachineCount';

// count 값이 변경 될 때마다 차트 데이터를 업데이트
export default function RealTimeLineChart() {

  const [machineData, setMachineData] = useState([])
  const {count, targetCount} = useMachineCount()

  useEffect(() => {
    const newDataPoint = {
        time: new Date().toLocaleTimeString(),
        count: count // 실시간 데이터 사용
    };

    setMachineData(prevData => [...prevData, newDataPoint]);

    // 데이터가 너무 많아지면 과거 데이터를 제한하여 메모리 이슈 방지 (최근 60개만 보관)
    if (machineData.length > 60) {
        setMachineData(machineData.slice(machineData.length - 60));
    }
}, [count]); // count 값이 변경될 때마다 useEffect 실행

  return (
    <LineChart width={600} height={300} machineData={machineData}>
        <CartesianGrid strokeDasharray="3 3" />
        <XAxis dataKey="time" />
        <YAxis domain={[0, 'dataMax + 10']} />
        <Tooltip />
        <Legend />
        <ReferenceLine y={targetCount} label="Target Count" stroke="red" />
        <Line type="monotone" dataKey="count" stroke="#8884d8" activeDot={{ r: 8 }} />
    </LineChart>
 
  );
}