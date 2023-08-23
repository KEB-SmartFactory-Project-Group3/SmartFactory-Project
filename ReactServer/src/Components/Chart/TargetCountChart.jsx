import React, { useEffect, useState } from 'react';
import styled from 'styled-components';
import Snackbar from '@mui/material/Snackbar';
import Alert from '@mui/material/Alert';
import useMachineRate from '../hooks/useMachineRate';
import LinearProgress from '@mui/material/LinearProgress';
import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';
import CheckCircleIcon from '@mui/icons-material/CheckCircle';

const StyledLinearProgress = styled(LinearProgress)`
    && {
        height: 10px;
        border-radius: 12px;
        border: 2px solid white;
        
        /* remaining 부분의 배경색 */
        background-color: white;
        
        /* 차오르는 부분의 색상 */
        & .MuiLinearProgress-bar {
            background-color: ${props => getColorByProgress(props.value)};
        }
    }
`;

function getColorByProgress(progress) {

    if (progress < 50) return 'yellow';
    if (progress < 70) return 'green';
    if (progress < 90) return 'orange';
    return 'red';
}

function LinearProgressWithLabel(props) {
    const color = getColorByProgress(props.value);

    return (
        <Box sx={{ display: 'flex', alignItems: 'center' }}>
            <Box sx={{ width: '100%', mr: 1 }}>
            <StyledLinearProgress 
                    variant="determinate" 
                    value={props.value}
                />
            </Box>
            <Box sx={{ minWidth: 35 }}>
                <Typography variant="body2" color="text.secondary" style={{ color, fontSize: '18px' }}>{`${Math.round(
                    props.value,
                )}%`}</Typography>
            </Box>
        </Box>
    );
}

export default function TargetProgressChart() {
    const { nowRate: progress } = useMachineRate();
    const [open, setOpen] = useState(false);

    useEffect(() => {
        if (progress >= 90 && !open) {
            setOpen(true);
        }
    }, [progress]);

    if (progress === 100) {
        return (
            <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', height: '100%' }}>
                <CheckCircleIcon style={{ fontSize: '50px', color: 'green', animation: 'fadeIn 2s' }} />
                <Typography variant="h6">100% 도달했습니다.</Typography>
            </div>
        );
    }

    return (
        <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', height: '100%' }}>

            <div style={{ fontSize: '16px', fontWeight: 'bold', textAlign: 'center' ,marginBottom:'10px'}}>
                도달률
            </div>

            <Box sx={{ width: '100%', marginBottom: '20px' }}>
                <LinearProgressWithLabel value={progress} />
            </Box>

            <Snackbar open={open} autoHideDuration={6000} onClose={() => setOpen(false)}>
                <Alert onClose={() => setOpen(false)} severity="warning" variant="filled">
                    도달률이 90% 이상입니다!
                </Alert>
            </Snackbar>
        </div>
    );
}
