import React from 'react';
import styled from 'styled-components';
import Button from '@material-ui/core/Button';

import failureGif from '../assets/errou.gif';
import successImg from '../assets/acertou.jpg';

const Div = styled.div`
    text-align: center;
    display: inline-block;
`;

const DivImg = styled.div`
    margin-top: 30px;
`;

const GameMessage = ({ hit, onNext }) => {
    return (
        hit !== null && 
        (<Div>
            <Button 
                color="secondary"
                variant="contained" 
                onClick={onNext}
            >Go go go!</Button>
            <DivImg>
                <img src={hit ? successImg : failureGif} alt="Answer" />
            </DivImg>
        </Div>)
    );
}
 
export default GameMessage;