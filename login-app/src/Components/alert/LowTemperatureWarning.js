// LowTemperatureWarning.js
import React from 'react';
import { Dialog, DialogTitle, Typography, DialogActions, Button } from '@mui/material';
import { blue } from '@mui/material/colors';
import WarningIcon from '@mui/icons-material/Warning';

function LowTemperatureWarning({ isOpen, onClose }) {
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
              <Typography variant="h5" component="span" fontWeight="bold">
                  Caution
              </Typography>
          </DialogTitle>
          <Typography variant="h6" align="center" sx={{ padding: 2 }}>
              온도가 너무 낮습니다!
          </Typography>
          <DialogActions>
              <Button onClick={onClose} color="primary">
                  Cancel
              </Button>
          </DialogActions>
        </Dialog>
    );
}

export default LowTemperatureWarning;
