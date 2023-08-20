import React, {useEffect,useState} from 'react';
import { PieChart, Pie, Cell } from 'recharts';
import Snackbar from '@mui/material/Snackbar';
import Alert from '@mui/material/Alert';
import useMachineRate from '../hooks/useMachineRate';
import LinearProgress from '@mui/material/LinearProgress';
import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';

function LinearProgressWithLabel(props) {
    return (
        <Box sx={{ display: 'flex', alignItems: 'center' }}>
            <Box sx={{ width: '100%', mr: 1 }}>
                <LinearProgress variant="determinate" {...props} />
            </Box>
            <Box sx={{ minWidth: 35 }}>
                <Typography variant="body2" color="text.secondary">{`${Math.round(
                    props.value,
                )}%`}</Typography>
            </Box>
        </Box>
    );
}

export default function TargetDonutChart() {
    const { nowRate: progress } = useMachineRate();
    const [open, setOpen] = useState(false);

    useEffect(() => {
        if (progress >= 90 && !open) {
            setOpen(true);
        }
    }, [progress]);

    return (
        <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', height: '100%' }}>
            <Box sx={{ width: '100%', marginBottom: '20px' }}>
                <LinearProgressWithLabel value={progress} />
            </Box>

            <div style={{ fontSize: '16px', fontWeight: 'bold', textAlign: 'center' }}>
                도달률 
                <div style={{ fontSize: '20px', 
                              color: progress < 50 ? 'yellow' : 
                                     progress < 70 ? 'green' : 'red' }}>
                    {progress}%
                </div>
            </div>

            <Snackbar open={open} autoHideDuration={6000} onClose={() => setOpen(false)}>
                <Alert onClose={() => setOpen(false)} severity="warning" variant="filled">
                    도달률이 90% 이상입니다!
                </Alert>
            </Snackbar>
        </div>
    );
}

