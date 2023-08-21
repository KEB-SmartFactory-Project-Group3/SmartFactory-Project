import React from 'react';
import { PieChart, pieArcLabelClasses } from '@mui/x-charts/PieChart';

export default function BasicPie({ count, defectiveCount , width = 400, height = 400  }) {
  const data = [
    { value: count, label: 'Count' },
    { value: defectiveCount, label: 'Defect' },
  ];

  return (
    <div>
      <PieChart
        series={[
          {
            arcLabel: (item) => `${item.label} (${item.value})`,
            arcLabelMinAngle: 45,
    
            data,
            colors: ['pink', 'purple'],
          },
        ]}
        sx={{
          [`& .${pieArcLabelClasses.root}`]: {
            fill: 'white',
            fontWeight: 'bold',
            marginLeft: '20px',
          },
         
        }}
        width={width} 
        height={height}

      />
    </div>
  );
}
