import React from 'react';
import { BarChart, Bar, XAxis, YAxis, Tooltip, Legend, CartesianGrid } from 'recharts';

function TemperatureBarChart({ avgTemperature, maxTemperature, minTemperature }) {
  const data = [
    {
      name: 'Temperature',
      평균온도: avgTemperature,
      최대온도: maxTemperature,
      최소온도: minTemperature,
    },
  ];

  return (
    <BarChart width={450} height={300} data={data} barGap={50} barCategoryGap={50}>
      <CartesianGrid strokeDasharray="3 3" />
      <XAxis dataKey="name" />
      <YAxis />
      <Tooltip />
      <Legend />
      <Bar dataKey="평균온도" fill="#76ff03" barSize={80} />
      <Bar dataKey="최대온도" fill="#ff3d00" barSize={80} />
      <Bar dataKey="최소온도" fill="#2196f3" barSize={80} />
    </BarChart>
  );
}

export default TemperatureBarChart;
