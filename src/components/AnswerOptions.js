import React from 'react';
import Button from '@material-ui/core/Button';
import styled from 'styled-components';

const AnswerButton = styled(Button)`
    && {
        margin: 5px;
    }
`;

const AnswerOptions = ({ options, onAnswer, disable }) => (
    disable === null && options.map(char => (
            <AnswerButton
                variant="contained"
                key={char.id} 
                onClick={() => onAnswer(char.id)}
                color="primary"
            >
                {char.name}
            </AnswerButton>
        ))
);

export default AnswerOptions;