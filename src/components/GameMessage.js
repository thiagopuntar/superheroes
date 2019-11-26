import React from 'react';
import styled from 'styled-components';
import Button from '@material-ui/core/Button';

const Div = styled.div`
    text-align: center;
    display: inline-block;
`;

const DivImg = styled.div`
    margin-top: 30px;
`;

const GameMessage = ({ hit, onNext, success, failure }) => {
    return (
        hit !== null && 
        (<Div>
            <Button 
                color="secondary"
                variant="contained" 
                onClick={onNext}
            >Go go go!</Button>
            <DivImg>
                <img src={hit ? `data:image/jpg;base64,${success}` 
                    : `data:image/gif;base64,${failure}`} alt="Answer" />
            </DivImg>
        </Div>)
    );
}
 
export default GameMessage;