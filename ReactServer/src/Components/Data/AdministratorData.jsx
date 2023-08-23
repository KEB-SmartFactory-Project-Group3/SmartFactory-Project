// import * as React from 'react';
// import Box from '@mui/material/Box';
// import { DataGrid } from '@mui/x-data-grid';
// import { createTheme, ThemeProvider } from '@mui/material/styles';
// import { Grid } from '@mui/material';

// const theme = createTheme({
//   palette: {
//     text: {
//       primary: '#ffffff',
//     },
//   },
// });

// const columns = [
//   { field: 'id', headerName: 'ID', width: 90 },
//   {
//     field: 'firstName',
//     headerName: 'First name',
//     width: 150,
//     editable: true,
//   },
//   {
//     field: 'lastName',
//     headerName: 'Last name',
//     width: 150,
//     editable: true,
//   },
//   {
//     field: 'age',
//     headerName: 'Age',
//     type: 'number',
//     width: 110,
//     editable: true,
//   },
//   {
//     field: 'fullName',
//     headerName: 'Full name',
//     description: 'This column has a value getter and is not sortable.',
//     sortable: false,
//     width: 160,
//     valueGetter: (params) =>
//       `${params.row.firstName || ''} ${params.row.lastName || ''}`,
//   },
// ];

// const rows = [
//   { id: 1, lastName: 'Snow', firstName: 'Jon', age: 35 },
//   { id: 2, lastName: 'Lannister', firstName: 'Cersei', age: 42 },
//   { id: 3, lastName: 'Lannister', firstName: 'Jaime', age: 45 },
//   { id: 4, lastName: 'Stark', firstName: 'Arya', age: 16 },
//   { id: 5, lastName: 'Targaryen', firstName: 'Daenerys', age: null },
//   { id: 6, lastName: 'Melisandre', firstName: null, age: 150 },
//   { id: 7, lastName: 'Clifford', firstName: 'Ferrara', age: 44 },
//   { id: 8, lastName: 'Frances', firstName: 'Rossini', age: 36 },
//   { id: 9, lastName: 'Roxie', firstName: 'Harvey', age: 65 },
// ];

// export default function DataGridDemo() {

//    // 현재 뷰포트의 너비를 확인
//    const [viewportWidth, setViewportWidth] = React.useState(window.innerWidth)

//    // resize 이벤트 리스너를 사용하여 뷰포트 너비가 변경될 때마다 상태를 업데이트
//   React.useEffect(() => {
//     const handleResize = () => {
//       setViewportWidth(window.innerWidth);
//     };
//     window.addEventListener("resize", handleResize);

//     return () => {
//       window.removeEventListener("resize", handleResize);
//     };
//   }, []);

//    // 뷰포트의 너비에 따라 컬럼의 너비를 동적으로 설정
//    const responsiveColumns = columns.map((column) => ({
//     ...column,
//     width: column.width * (viewportWidth / 1440),  // 1440은 기본 데스크톱 해상도
//   }));

//   return (
//     <ThemeProvider theme={theme}>
//        <Grid container spacing={2} sx={{ background: 'transparent', border: 'none' , boxShadow: 'none',}}>
//             <Grid item xs={12} sm={12} md={12}>
//               <Box sx={{ height: '100%', width: '100%' ,maxHeight: '90vh', maxWidth: '90vw'}}>
//                 <DataGrid
//                   rows={rows}
//                   columns={columns}
//                   initialState={{
//                     pagination: {
//                       paginationModel: {
//                         pageSize: 5,
//                       },
//                     },
//                   }}
//                   pageSizeOptions={[5]}
//                   checkboxSelection
//                   disableRowSelectionOnClick
//                 />
//               </Box>
//             </Grid>
//         </Grid>
//     </ThemeProvider>
//   );
// }