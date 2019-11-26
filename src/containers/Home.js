import React from 'react';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';

import styled from 'styled-components';

const Section = styled.section`
    text-align: center;
`;

const H1 = styled.h1`
    font-size: 2rem;
`;

const DivButton = styled.div`
    margin-top: 20px;
`;

const Home = ({ onStart, onChange }) => {
    return ( 
        <Section>
            <H1>Superheroes Masters</H1>
            <h2>The Ultimate Quiz Game</h2>
            <div>
                <p>Welcome to the best and awesome Super Heroes Quiz ever!</p>
            </div>

            <TextField onChange={e => onChange(e.target.value)} autoFocus placeholder="Type your name to begin" />
            
            <DivButton>
                <Button 
                    size="large" 
                    variant="outlined" 
                    color="primary"
                    onClick={onStart}
                >Start</Button>
            </DivButton>
        </Section>
     );
}
 
export default Home;