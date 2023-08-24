import React from 'react';
import { BarChart, Bar, XAxis, YAxis, Tooltip, Legend, CartesianGrid } from 'recharts';

function HumidityStatsBarChart({ avgHumidity, maxHumidity, minHumidity }) {
  const data = [
    {
      name: 'Humidity',
      평균습도: avgHumidity,
      최대습도: maxHumidity,
      최소습도: minHumidity,
    },
  ];

  return (
    <BarChart width={450} height={300} data={data} barGap={50} barCategoryGap={80}>
      <CartesianGrid strokeDasharray="3 3" />
      <XAxis dataKey="name" />
      <YAxis />
      <Tooltip />
      <Legend />
      <Bar dataKey="평균습도" fill="#4caf50" barSize={80}/>
      <Bar dataKey="최대습도" fill="#304ffe" barSize={80}/>
      <Bar dataKey="최소습도" fill="#fff8e1" barSize={80}/>
    </BarChart>
  );
}

export default HumidityStatsBarChart;
