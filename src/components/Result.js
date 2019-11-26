import React from 'react';
import styled from 'styled-components';
import Button from '@material-ui/core/Button';

const Div = styled.div`
    text-align: center;
`;


const Result = ({ points, hits, rounds, onRestart }) => {
    return ( 
        <Div>
            <h2>Acabou!</h2>
            <p>{points} pontos.</p>
            <p>Acerto de {parseInt((hits / rounds) * 100, 10)} %</p>

            <Button 
                variant="contained" 
                color="primary"
                onClick={onRestart}
            >Jogar novamente</Button>
        </Div>
     );
}
 
export default Result;