import React from 'react';
import { PieChart, pieArcLabelClasses } from '@mui/x-charts/PieChart';



export default function BasicPie({ count, defectiveCount , width = 400, height = 400  }) {
  const data = [
    { value: count, label: 'Count'},
    { value: defectiveCount, label: 'Defect'},
  ];

  const palette = ['#78909c', '#37474f'];

  return (
    <div style={{ padding: '0px' }}>
       <div style={{ fontWeight: 'bold', color: 'white'}}>
        생산량 대비 불량품 수
      </div>
      <PieChart
        series={[
          {
            arcLabel: (item) => `${item.label} (${item.value})`,
            arcLabelMinAngle: 45,
            data,
          },
        ]}
        sx={{
          [`& .${pieArcLabelClasses.root}`]: {
            fill: 'white',
            fontWeight: 'bold',
          },
         
        }}
        colors={palette}
        width={width} 
        height={height}
        fill="white"
      />

    </div>
  );
}
