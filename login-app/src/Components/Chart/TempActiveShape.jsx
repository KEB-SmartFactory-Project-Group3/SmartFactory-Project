import React from 'react';
import { PieChart, Pie, Sector, Tooltip, Cell, Text } from 'recharts';
import useTemperature from '../hooks/useTemperature';

const colorRange = (value, max) => {
  if (value < max / 3) return '#0000FF'; // 파랑
  if (value < (2 * max / 3)) return '#00FF00'; // 초록
  return '#FF0000'; // 빨강
};

const TempActiveShape = (props) => {
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


       <Text x={cx} y={cy} dy={-10} textAnchor="middle" fill="white" fontSize={24}>
        {value}
      </Text>
    </>
  );
};

export default function TempGaugeChart() {
  const { factoryTemperature } = useTemperature();
  const maxTemp = 100;

  const data = [
    { value: factoryTemperature, name: `현재 온도: ${factoryTemperature}`, fill: colorRange(factoryTemperature, maxTemp) },
    { value: maxTemp - factoryTemperature, fill: '#d3d3d3' }
  ];

  return (
    <PieChart width={200} height={125}>
      <Pie 
        activeIndex={0}
        activeShape={TempActiveShape} 
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
