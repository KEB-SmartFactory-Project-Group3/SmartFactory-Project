import React , { useEffect, useState }from 'react';
import { Dialog, DialogTitle, Typography, DialogActions, Button , DialogContent } from '@mui/material';
import { yellow } from '@mui/material/colors';
import WarningIcon from '@mui/icons-material/Warning';
import { keyframes } from '@mui/system';
import Avatar from '@mui/material/Avatar';
import Stack from '@mui/material/Stack';

const blinkAnimation = keyframes`
  0% { opacity: 1; }
  50% { opacity: 0.4; }
  100% { opacity: 1; }
`;

function HighTemperatureWarning({ isOpen, onClose, factemperature }) {
    // localstorage 
    const savedTemperature = parseFloat(localStorage.getItem('highTempWarningTemperature') || '-1');
    const wasClosedInStorage = Boolean(localStorage.getItem('highTempWarningClosed')) && savedTemperature === factemperature;
    const [wasClosed, setWasClosed] = useState(wasClosedInStorage);
    const [showConfirm, setShowConfirm] = useState(false);

    const handleClose = () => {
        localStorage.setItem('highTempWarningClosed', 'true');
        localStorage.setItem('highTempWarningTemperature', factemperature.toString());
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
            <Dialog 
            open={isOpen} 
            maxWidth="sm" 
            fullWidth={true} 
            PaperProps={{
                style: {
                    animation: `${blinkAnimation} 1s infinite`,
                    backgroundColor: 'rgba(0, 0, 0, 0.8)',
                    backdropFilter: 'blur(5px)', 
                    borderRadius: '15px', 
                    border: '1px solid rgba(255, 255, 255, 0.8)'  
                }
            }}
            >
            <DialogTitle sx={{ 
            color: '#FFF',
            display: 'flex',
            alignItems: 'center'
            }}>
         
                <WarningIcon sx={{ color: yellow[500], fontSize: 40 }}/>
    
            <Typography variant="h4" component="span" fontWeight="bold" color='red'>
                Warning
            </Typography>
            </DialogTitle>
            <DialogContent>
            {showConfirm ? (
                <Typography variant="body1" align="center"  sx={{ padding: 2, fontWeight: 'bold', color: '#e53935' ,fontSize: 30 }}>
                    다시 알리지 않습니다. <br /> 계속하시겠습니까?
                </Typography>
            ) : (
                <Typography variant="subtitle1" align="center" sx={{ padding: 2, fontWeight: 'bold', color: '#e53935' ,fontSize: 30}}>
                    온도가 너무 높습니다!
                </Typography>
            )}
            </DialogContent>
            <DialogActions>
            {showConfirm ? (
                <>
                    <Button variant="contained" onClick={handleClose}  
                    style={{
                        backgroundColor: 'white', 
                        color: 'red'
                    }}>
                        확인
                    </Button>
                    <Button variant="containde" onClick={handleCancelConfirm}  style={{
                        backgroundColor: 'white', 
                        color: 'black'
                    }}>
                        취소
                    </Button>
                </>
            ) : (
                <Button 
                    variant="contained" 
                    onClick={handleShowConfirm} 
                    style={{
                        backgroundColor: 'white', 
                        color: 'black'
                    }}
                >
                    cancel
                </Button>

            )}
            </DialogActions>
            </Dialog>
    );
}

export default HighTemperatureWarning;
