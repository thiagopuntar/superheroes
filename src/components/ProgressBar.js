import React from 'react';
import styled from 'styled-components';
import LinearProgress from '@material-ui/core/LinearProgress';

const Progress = styled(LinearProgress)`
    width: 100%;
    && {
        height: 15px;
    }
`;

const ProgressBar = ({ percentage }) => {
    return (
        <Progress variant="determinate" value={percentage} />
    );
}

export default ProgressBar;