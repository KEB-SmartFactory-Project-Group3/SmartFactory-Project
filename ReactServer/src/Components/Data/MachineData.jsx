import * as React from 'react';
import PropTypes from 'prop-types';
import CircularProgress from '@mui/material/CircularProgress';
import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';
import useMachineRate from '../hooks/useMachineRate';

function CircularProgressWithLabel(props) {
  const { value } = props; // 프롭스로 받은 value 값
  const {nowRate} = useMachineRate()

  return (
    <Box sx={{ position: 'relative', display: 'inline-flex' }}>
      <CircularProgress variant="determinate" value={value} /> {/* value 값 적용 */}
      <Box
        sx={{
          top: 0,
          left: 0,
          bottom: 0,
          right: 0,
          position: 'absolute',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
        }}
      >
        <Typography variant="caption" component="div" color="text.secondary">
          {`${Math.round(value)}%`}
        </Typography>
      </Box>
    </Box>
  );
}

CircularProgressWithLabel.propTypes = {
  value: PropTypes.number.isRequired,
};

export default function CircularWithValueLabel({ nowRate }) {
  const [progress, setProgress] = React.useState(nowRate); // 초기값으로 nowRate 사용

  React.useEffect(() => {
    setProgress(nowRate); // nowRate 값을 사용하여 progress 업데이트
  }, [nowRate]);

  return <CircularProgressWithLabel value={progress} />;
}
