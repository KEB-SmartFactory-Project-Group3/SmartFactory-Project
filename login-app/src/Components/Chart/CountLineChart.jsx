import React, { useState } from 'react';
import { LineChart } from '@mui/x-charts/LineChart';

export default function CountLineChart({ data }) {
  const initialData = [0]; // 초기 데이터
  const [chartData, setChartData] = useState(initialData);

  React.useEffect(() => {
    // 실시간 데이터가 들어왔을 때, 새로운 데이터를 추가하고 이전 데이터를 제거하여 최근 몇 개의 데이터만 보여주도록 함
    if (data !== null) {
      setChartData(prevData => [...prevData, data].slice(-10)); // 최근 10개의 데이터만 보여주도록 함
    }
  }, [data]);

  return (
    <LineChart
      xAxis={[{ data: Array.from({ length: chartData.length }, (_, i) => i + 1) }]} // x축에 1부터 순차적인 값 사용
      series={[
        {
          data: chartData,
        },
      ]}
      width={500}
      height={300}
    />
  );
}