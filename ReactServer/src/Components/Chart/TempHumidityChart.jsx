import React, { useRef, useState, useEffect } from 'react';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend } from 'recharts';
import { Typography } from '@mui/material';
import useTemperature from '../hooks/useTemperature';

export default function TempHumidityChart() {

  const chartContainerRef = useRef(null);
  const [chartWidth, setChartWidth] = useState(500)

  const { factoryTemperature, factoryHumidity } = useTemperature()
  const currentTime = new Date().toLocaleTimeString() // 현재 시간

  const data = [
    {
      time: currentTime,
      temperature: factoryTemperature,
      humidity: factoryHumidity
    }
  ];

  useEffect(() => {
    function handleResize() {
      if (chartContainerRef.current) {
        setChartWidth(chartContainerRef.current.offsetWidth);
      }
    }

    handleResize();  // 초기 크기 설정
    window.addEventListener('resize', handleResize);

    return () => {
      window.removeEventListener('resize', handleResize);
    }
  }, [])

  return (
    <div ref={chartContainerRef}>
      <Typography variant="subtitle1" gutterBottom fontWeight="bold">
        실시간 온습도 그래프
      </Typography>
      <LineChart
        width={500}
        height={300}
        data={data}
        margin={{
          top: 5, right: 30, left: 20, bottom: 5,
        }}
      >
        <CartesianGrid strokeDasharray="3 3" />
        <XAxis dataKey="time" />
        <YAxis />
        <Tooltip />
        <Legend />
        <Line type="monotone" dataKey="temperature" stroke="#8884d8" activeDot={{ r: 8 }} />
        <Line type="monotone" dataKey="humidity" stroke="#82ca9d" />
      </LineChart>
    </div>
  );
}
