import React from 'react';
import Box from '@mui/material/Box';
import { DataGrid } from '@mui/x-data-grid';
import useTempDB from '../hooks/useTempDB';  
import { createTheme, ThemeProvider } from '@mui/material/styles';

const customTheme = createTheme({
  components: {
    MuiDataGrid: {
      styleOverrides: {
        root: {
          '& .MuiDataGrid-columnHeaderTitle': {
            color: 'white',  // 컬럼 헤더의 글자색 변경
          },
          '& .MuiDataGrid-footerContainer': {
            color: 'white',
          },
          '& .MuiIconButton-root': {
            color: 'white',
          }   
        },
      },
    },
  },
});


const columns = [
  { 
    field: 'dbTime', 
    headerName: '기록시간', 
    width: 145, 
    type: 'string',
    renderCell: (params) => <span style={{ color: 'white' }}>{params.formattedValue}</span>
  },
  { 
    field: 'dbTemp', 
    headerName: '온도', 
    type: 'number', 
    width: 50,
    renderCell: (params) => <span style={{ color: 'white' }}>{params.value}</span>
  },
  { 
    field: 'dbHum', 
    headerName: '습도', 
    type: 'number', 
    width: 50,
    renderCell: (params) => <span style={{ color: 'white' }}>{params.value}</span>
  },
  { 
    field: 'dbVaild', 
    headerName: '적정 범위 내', 
    type: 'boolean', 
    width: 100,
    renderCell: (params) => 
      params.value ? 
      <span style={{ color: 'green' }}>true</span> : 
      <span style={{ color: 'red' }}>false</span>
  }
];

function TemperatureData() {
  const {
    dbTime,
    dbTemp,
    dbHum,
    dbVaild
  } = useTempDB();

  const rows = dbTime.map((time, index) => ({
    id: index,
    dbTime: time,
    dbTemp: dbTemp[index],
    dbHum: dbHum[index],
    dbVaild: dbVaild[index]
  }));
  

  console.log("DB rows:", rows)
  return (
    <ThemeProvider theme={customTheme}>
      <Box sx={{ 
              // height: '100%',
              height: '100%', 
              width: '100%', 
              backgroundColor: 'white',
              // border: '2px solid white',
              borderRadius: '4px',
              backgroundColor: 'rgba(255, 255, 255, 0.1)', 
              backdropFilter: 'blur(8px)' 
            }}>
        <DataGrid
          rows={rows}
          columns={columns}
          pagination={false}
          // initialState={{
          //   pagination: {
          //     paginationModel: {
          //       pageSize: 5,
          //     },
          //   },
          // }}
          pageSizeOptions={[5]}
          checkboxSelection
          disableRowSelectionOnClick
        />
      </Box>
    </ThemeProvider>
  );
}

export default TemperatureData;
