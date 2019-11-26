import React from 'react';
import styled from 'styled-components';
import Button from '@material-ui/core/Button';

const Div = styled.div`
    text-align: center;
`;

const Result = ({ points, percentage, onRestart }) => {
    return ( 
        <Div>
            <h2>Acabou!</h2>
            <p>{points} pontos.</p>
            <p>Acerto de {percentage} %</p>

            <Button 
                variant="contained" 
                color="primary"
                onClick={onRestart}
            >Jogar novamente</Button>
        </Div>
     );
}
 
export default Result;