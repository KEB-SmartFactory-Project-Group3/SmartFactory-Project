import React, { useState, useEffect }  from 'react';
import { Box, Typography, CircularProgress, Dialog, DialogTitle , DialogActions} from '@mui/material';
import DeviceThermostatIcon from '@mui/icons-material/DeviceThermostat'; // 이 부분은 실제 아이콘 import 경로에 따라 변경해주세요.
import { purple, pink , red ,yellow} from '@mui/material/colors';
import WarningIcon from '@mui/icons-material/Warning';
import Button from '@mui/material/Button';

function getTemperatureColor(value) {
  if (value <= 33) {
    return '#3d5afe';
  } else if (value > 33 && value <= 66) {
    return '#76ff03';
  } else {
    return '#dd2c00';
  }
}

function TemperatureDisplay({ factoryTemperature, CustomCircularProgress }) {

  const [isWarningOpen, setIsWarningOpen] = useState(false)

  useEffect(() => {
    if (factoryTemperature >= 25) {
      setIsWarningOpen(true)
    }
  }, [factoryTemperature])

  return (
    <Box display="flex">
      <Box 
        sx={{
          width: '100%', 
          height: '100%', 
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          border: '2px solid white',
          borderRadius: '5px',
          backgroundColor: 'rgba(255, 255, 255, 0.2)', 
          backdropFilter: 'blur(5px)' 
        }}
      >
        <DeviceThermostatIcon 
            sx={{ fontSize: '5vw', color: getTemperatureColor(factoryTemperature) }}/>
      </Box>

      <Box position="relative" display="inline-flex" ml={2}>
        {/* <CustomCircularProgress  // 배경색용
          variant="determinate"
          value={100}
          size={100}
          thickness={5}
          style={{ color: '#e0e0e0' }} // 이 부분을 원하는 배경색으로 설정
        /> */}
        <CustomCircularProgress 
          variant="determinate" 
          value={factoryTemperature} 
          size={100} 
          thickness={5}
          style={{ color: getTemperatureColor(factoryTemperature) }}
        />
        <Box
          top={0}
          left={0}
          bottom={0}
          right={0}
          position="absolute"
          display="flex"
          alignItems="center"
          justifyContent="center"
        >
          {factoryTemperature
            ? <Typography variant="h5" style={{position: 'absolute', top: '35%'}}>
                {Math.round(factoryTemperature)}°C
              </Typography>
            : <div style={{display: 'flex', justifyContent: 'center', alignItems: 'center'}}>
                <CircularProgress style={{ color: purple[700] }} />
              </div>
          }
        </Box>
      </Box>

      {/* <Dialog open={isWarningOpen}  maxWidth="sm" fullWidth={true} >
          <DialogTitle sx={{ color: '#FFF' ,display: 'flex',
        alignItems: 'center'}}>
            <WarningIcon sx={{ color: yellow[500] , fontSize: 40 , marginRight: 1 }}/>
            <Typography variant="h5" component="span" fontWeight="bold">
              Warning
          </Typography>
          </DialogTitle>
          <Typography variant="h6" align="center" sx={{ padding: 2 }}>
              온도가 너무 높습니다!
          </Typography>
          <DialogActions>
              <Button onClick={() => setIsWarningOpen(false)} color="primary">
                  Cancel
              </Button>
          </DialogActions>
      </Dialog> */}

      <Dialog 
            open={isWarningOpen} 
            maxWidth="sm" 
            fullWidth={true} 
            PaperProps={{
                style: {
                    backgroundColor: 'rgba(255, 255, 255, 0.8)',  // white with opacity
                    backdropFilter: 'blur(5px)',  // blur effect
                    borderRadius: '15px',  // border radius
                    border: '1px solid rgba(0, 0, 0, 0.12)'  // border line with some opacity
                }
            }}
        >
          <DialogTitle sx={{ 
              color: '#FFF',
              display: 'flex',
              alignItems: 'center'
          }}>
              <WarningIcon sx={{ color: yellow[500], fontSize: 40, marginRight: 1 }}/>
              <Typography variant="h5" component="span" fontWeight="bold">
                  Warning
              </Typography>
          </DialogTitle>
          <Typography variant="h6" align="center" sx={{ padding: 2 }}>
              온도가 너무 높습니다!
          </Typography>
          <DialogActions>
              <Button onClick={() => setIsWarningOpen(false)} color="primary">
                  Cancel
              </Button>
          </DialogActions>
      </Dialog>

    </Box>
  );
}

export default TemperatureDisplay;
