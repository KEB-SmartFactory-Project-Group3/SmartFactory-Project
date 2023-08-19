import React , { useEffect, useState }from 'react';
import { Dialog, DialogTitle, Typography, DialogActions, Button , DialogContent } from '@mui/material';
import { yellow } from '@mui/material/colors';
import WarningIcon from '@mui/icons-material/Warning';
import { keyframes } from '@mui/system';

const blinkAnimation = keyframes`
  0% { opacity: 1; }
  50% { opacity: 0.4; }
  100% { opacity: 1; }
`;

function HighTemperatureWarning({ isOpen, onClose }) {
    // localstorage 
    const [wasClosed, setWasClosed] = useState(false);
    const [showConfirm, setShowConfirm] = useState(false)

    useEffect(() => {
        if (localStorage.getItem('highTempWarningClosed')) {
            setWasClosed(true);
        }
    }, []);

    const handleClose = () => {
        localStorage.setItem('highTempWarningClosed', 'true');
        setWasClosed(true);
        onClose();
    };

    const handleShowConfirm = () => {
      setShowConfirm(true);
    };

    const handleCancelConfirm = () => {
        setShowConfirm(false);
    }

    if (wasClosed) return null;


    return (
        // <Dialog 
        //     open={isOpen} 
        //     maxWidth="sm" 
        //     fullWidth={true} 
        //     PaperProps={{
        //         style: {
        //             animation: `${blinkAnimation} 1s infinite`,
        //             backgroundColor: 'rgba(255, 255, 255, 0.4)', 
        //             backdropFilter: 'blur(5px)', 
        //             borderRadius: '15px', 
        //             border: '1px solid rgba(0, 0, 0, 0.12)'  
        //         }
        //     }}
        // >
        //   <DialogTitle sx={{ 
        //       color: '#FFF',
        //       display: 'flex',
        //       alignItems: 'center'
        //   }}>
        //       <WarningIcon sx={{ color: yellow[500], fontSize: 40, marginRight: 1 }}/>
        //       <Typography variant="h4" component="span" fontWeight="bold" color='red'>
        //           Warning
        //       </Typography>
        //   </DialogTitle>
        //   <Typography variant="h5" align="center" sx={{ padding: 2,  fontWeight: 'bold', color: '#e53935' }}>
        //       온도가 너무 높습니다!
        //   </Typography>
        //   <DialogActions>
        //       <Button onClick={onClose} color="primary">
        //           다시보지않기
        //       </Button>
        //   </DialogActions>
        // </Dialog>

            <Dialog 
            open={isOpen} 
            maxWidth="sm" 
            fullWidth={true} 
            PaperProps={{
                style: {
                    animation: `${blinkAnimation} 1s infinite`,
                    backgroundColor: 'rgba(255, 255, 255, 0.4)', 
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
            <WarningIcon sx={{ color: yellow[500], fontSize: 40, marginRight: 1 }}/>
            <Typography variant="h4" component="span" fontWeight="bold" color='red'>
                Warning
            </Typography>
            </DialogTitle>
            <DialogContent>
            {showConfirm ? (
                <Typography variant="body1" align="center">
                    다시 알리지 않습니다. 계속하시겠습니까?
                </Typography>
            ) : (
                <Typography variant="h5" align="center" sx={{ padding: 2, fontWeight: 'bold', color: '#e53935' }}>
                    온도가 너무 높습니다!
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

export default HighTemperatureWarning;
