import React from 'react';
import Box from '@mui/material/Box';
import { DataGrid } from '@mui/x-data-grid';
import useOperationStopList from '../hooks/useOperationStopList';  
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

function ProductionManagement( { fieldWidths = {}, boxDimensions = { height: '650px', width: '100%' }} ) {
  const {user, opTime, stopTime, stopReason, rate}= useOperationStopList();

  const columns = [
    { 
      field: 'user', 
      headerName: '관리자', 
      width: fieldWidths.user || 280,
      type: 'string',
      renderCell: (params) => <span style={{ color: 'white' }}>{params.value}</span>
    },
    { 
      field: 'opTime', 
      headerName: '가동시간', 
      type: 'string', 
      width: fieldWidths.opTime || 280,
      renderCell: (params) => <span style={{ color: 'white' }}>{params.formattedValue}</span>
    },
    { 
      field: 'stopTime', 
      headerName: '작동중지시간', 
      type: 'string', 
      width: fieldWidths.stopTime || 300,
      renderCell: (params) => <span style={{ color: 'white' }}>{params.formattedValue}</span>
    },
    { 
      field: 'stopReason', 
      headerName: '작동중지원인', 
      type: 'string', 
      width: fieldWidths.stopReason || 200,
      renderCell: (params) => <span style={{ color: 'white' }}>{params.formattedValue}</span>
    },
    { 
      field: 'rate', 
      headerName: '도달률', 
      type: 'Number', 
      width: fieldWidths.rate || 100,
      renderCell: (params) => <span style={{ color: 'white' }}>{params.value}</span> 
    }
  ];

  const rows = user.map((userItem, index) => ({
    id: index,
    user: userItem,
    opTime: opTime[index],
    stopTime: stopTime[index],
    stopReason: stopReason[index],
    rate: rate[index],
  }));

  console.log("stop list rows:", rows)
  return (
    <ThemeProvider theme={customTheme}>
      <Box sx={{ 
              // height: '100%',
              // height: '650px', //스크롤 바 설정으로 높이 고정
              // width: '100%', 
              height: boxDimensions.height,
              width: boxDimensions.width, 
              backgroundColor: 'white',
              border: '2px solid white',
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

export default ProductionManagement;
