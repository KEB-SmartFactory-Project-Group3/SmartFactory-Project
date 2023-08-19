import React, { useEffect, useState }from 'react';
import { Dialog, DialogTitle, Typography, DialogActions, Button , DialogContent} from '@mui/material';
import { blue } from '@mui/material/colors';
import WarningIcon from '@mui/icons-material/Warning';

function LowTemperatureWarning({ isOpen, onClose }) {

  // localstorage
  const [wasClosed, setWasClosed] = useState(false)
  const [showConfirm, setShowConfirm] = useState(false) // 재확인 

  useEffect(() => {
    if (localStorage.getItem('lowTempWarningClosed') === 'true') {
        setWasClosed(true);
    }
}, []);

  const handleClose = () => {
      localStorage.setItem('lowTempWarningClosed', 'true');
      setWasClosed(true);
      onClose();
  };

    const handleShowConfirm = () => {
      setShowConfirm(true);
  };

    const handleCancelConfirm = () => {
        setShowConfirm(false);
    }

    if (wasClosed) return null

    return (
        <Dialog 
            open={isOpen} 
            maxWidth="sm" 
            fullWidth={true} 
            PaperProps={{
                style: {
                    backgroundColor: 'rgba(255, 255, 255, 0.8)', 
                    backdropFilter: 'blur(5px)', 
                    borderRadius: '15px', 
                    border: '1px solid rgba(0, 0, 0, 0.12)'  
                }
            }}
        >
          <DialogTitle sx={{ 
              color: '#FFF',
              display: 'flex',
              alignItems: 'center'
          }}>
              <WarningIcon sx={{ color: blue[500], fontSize: 40, marginRight: 1 }}/>
              <Typography variant="h4" component="span" fontWeight="bold" color='red'>
                  Caution
              </Typography>
          </DialogTitle>
          <DialogContent>
            {showConfirm ? (
                <Typography variant="body1" align="center">
                    다시 알리지 않습니다. 계속하시겠습니까?
                </Typography>
            ) : (
                <Typography variant="h6" align="center" sx={{ padding: 2 }}>
                    온도가 너무 낮습니다!
                </Typography>
            )}
          </DialogContent>
          <DialogActions>
          {showConfirm ? (
                  <>
                      <Button onClick={handleClose} color="primary">
                          확인
                      </Button>
                      <Button onClick={handleCancelConfirm} color="secondary">
                          취소
                      </Button>
                  </>
              ) : (
                  <Button onClick={handleShowConfirm} color="primary">
                      cancel
                  </Button>
              )}
          </DialogActions>
        </Dialog>
    );
}

export default LowTemperatureWarning;
