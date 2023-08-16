import React from 'react';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend } from 'recharts';
import { Typography } from '@mui/material';
import useTemperature from '../hooks/useTemperature';

export default function TempHumidityChart() {
  const { factoryTemperature, factoryHumidity } = useTemperature()
  const currentTime = new Date().toLocaleTimeString() // 현재 시간

  const data = [
    {
      time: currentTime,
      temperature: factoryTemperature,
      humidity: factoryHumidity
    }
  ];

  return (
    <div>
      <Typography variant="h6" gutterBottom>
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
