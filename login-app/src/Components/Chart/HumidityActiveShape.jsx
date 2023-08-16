import React from 'react';
import { PieChart, Pie, Sector, Tooltip, Cell } from 'recharts';
import useTemperature from '../hooks/useTemperature';

const colorRange = (value) => {
  if (value < 30) return '#FF0000'; // 빨강 (낮음)
  if (value < 60) return '#00FF00'; // 초록 (적정)
  return '#0000FF'; // 파랑 (높음)
};

const HumActiveShape = (props) => {
  const { cx, cy, innerRadius, outerRadius, startAngle, endAngle, fill, value } = props;
  
  const middle = (startAngle + endAngle) / 2;
  
  return (
    <>
      <Sector
        cx={cx}
        cy={cy}
        innerRadius={innerRadius}
        outerRadius={outerRadius}
        startAngle={startAngle}
        endAngle={endAngle}
        fill={fill}
      />
      <Sector 
        cx={cx}
        cy={cy}
        startAngle={middle}
        endAngle={middle}
        innerRadius={0}
        outerRadius={outerRadius}
        fill="white" // 선 색상
      />
    </>
  );
};

export default function HumGaugeChart() {
  const { factoryHumidity } = useTemperature();
  const maxHum = 100;

  const data = [
    { value: factoryHumidity, name: `현재 습도: ${factoryHumidity}`, fill: colorRange(factoryHumidity) },
    { value: maxHum - factoryHumidity, fill: '#d3d3d3' }
  ];

  return (
    <PieChart width={200} height={125}>
      <Pie 
        activeIndex={0}
        activeShape={HumActiveShape} 
        data={data} 
        cx={100} 
        cy={100} 
        startAngle={180}
        endAngle={0}
        innerRadius={60}
        outerRadius={80} 
        dataKey="value"
      >
        <Cell key={`cell-${0}`} fill={data[0].fill} />
        <Cell key={`cell-${1}`} fill={data[1].fill} />
      </Pie>
      <Tooltip />
    </PieChart>
  );
}
