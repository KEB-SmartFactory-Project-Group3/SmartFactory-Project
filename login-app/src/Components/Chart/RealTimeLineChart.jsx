import React, { useState, useEffect } from 'react';
import { LineChart, XAxis, YAxis, CartesianGrid, Tooltip, Legend, Line, ReferenceLine } from 'recharts';
import useMachineCount from '../hooks/useMachineCount';
import styled from 'styled-components';

const CenteredChartContainer = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100%;
`;

// count 값이 변경 될 때마다 차트 데이터를 업데이트
export default function RealTimeLineChart({targetCount}) {

  const [machineData, setMachineData] = useState([])
  const {count} = useMachineCount()

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
    <CenteredChartContainer>
    <LineChart width={600} height={300} data={machineData}>
        <CartesianGrid strokeDasharray="3 3" />
        <XAxis dataKey="time" />
        <YAxis domain={[0, 100000]} />
        <Tooltip />
        <Legend />
        <ReferenceLine y={targetCount} label="Target Count" stroke="red" />
        <Line type="monotone" dataKey="count" stroke="#8884d8" activeDot={{ r: 8 }} />
    </LineChart>
    </CenteredChartContainer>
 
  );
}