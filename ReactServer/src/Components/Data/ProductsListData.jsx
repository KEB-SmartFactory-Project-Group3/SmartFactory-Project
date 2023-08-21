import React from 'react';
import Box from '@mui/material/Box';
import { DataGrid } from '@mui/x-data-grid';
import useProductsList from '../hooks/useProductsList';  
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
    field: 'serialnum', 
    headerName: '일련번호', 
    width: 120, 
    type: 'string',
    renderCell: (params) => <span style={{ color: 'white' }}>{params.value}</span>
  },
  { 
    field: 'listcount', 
    headerName: '생산량', 
    type: 'number', 
    width: 100,
    renderCell: (params) => <span style={{ color: 'white' }}>{params.value}</span>
  },
  { 
    field: 'listdefect', 
    headerName: '불량품 량', 
    type: 'number', 
    width: 120,
    renderCell: (params) => <span style={{ color: 'white' }}>{params.value}</span>
  },
  { 
    field: 'productionTime', 
    headerName: '제조 시간', 
    type: 'string', 
    width: 200,
    renderCell: (params) => <span style={{ color: 'white' }}>{params.formattedValue}</span>
  },
  { 
    field: 'liststate', 
    headerName: '상태', 
    type: 'string', 
    width: 120,
    renderCell: (params) => {
      let color = 'white';
      if (params.value === 'defective') color = 'red';
      else if (params.value === 'normal') color = 'green';
      return <span style={{ color: color }}>{params.value}</span>;
    }
  }
];

function ProductListData() {
  const {
    serialnum,
    liststate,
    listcount,
    listdefect,
    productionTime
  } = useProductsList();

  const rows = serialnum.map((num, index) => ({
    id: index,
    serialnum: num,
    liststate: liststate[index],
    listcount: listcount[index],
    listdefect: listdefect[index],
    productionTime: productionTime[index]
  }));

  // console.log("rows:", rows)
  return (
    <ThemeProvider theme={customTheme}>
      <Box sx={{ 
              // height: '100%',
              height: '650px', //스크롤 바 설정으로 높이 고정
              width: '100%', 
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

export default ProductListData;
