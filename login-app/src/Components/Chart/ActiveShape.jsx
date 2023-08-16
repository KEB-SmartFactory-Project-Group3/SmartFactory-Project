import React from 'react';
import { PieChart, Pie, Sector } from 'recharts';
import useTemperature from '../hooks/useTemperature';

const ActiveShape = (props) => {
  const { cx, cy, innerRadius, outerRadius, startAngle, endAngle,
    fill} = props;
  
  const middle = (startAngle + endAngle) / 2;
  
  return (
    <Sector
      cx={cx}
      cy={cy}
      innerRadius={innerRadius}
      outerRadius={outerRadius}
      startAngle={startAngle}
      endAngle={endAngle}
      fill={fill}
    />
  );
};

export default function GaugeChart() {

  const { factoryTemperature } = useTemperature();
  const maxTemp = 100; // 최대 온도 설정
  const minTemp = 0;   // 최소 온도 설정

  const data = [
    { value: factoryTemperature, fill: '#82ca9d'},  // 적정 온도는 초록색으로
    { value: maxTemp - factoryTemperature, fill: '#d3d3d3'}  // 나머지 부분은 회색으로
  ];

  return (
    <PieChart width={200} height={130}>
      <Pie 
        activeIndex={0}
        activeShape={ActiveShape} 
        data={data} 
        cx={100} 
        cy={100} 
        startAngle={180}
        endAngle={0}
        innerRadius={60}
        outerRadius={80} 
        fill="#8884d8" 
        dataKey="value"
      />
    </PieChart>
  );
}
