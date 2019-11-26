import React from 'react';
import styled from 'styled-components';

import ProgressBar from './ProgressBar';

const Welcome = ({ percentage }) => {
    const H1 = styled.h1`
        font-size: 3rem;
        align-text: center;
        margin: 50px;
        text-transform: uppercase;
        background: linear-gradient(to right, #30CFD0 0%, #e34e09 100%);
        -webkit-background-clip: text;
        -webkit-text-fill-color: transparent;
    `;

    const Div = styled.div`
        background: #0F2027;
        background: -webkit-linear-gradient(to top, #2C5364, #203A43, #0F2027);
        background: linear-gradient(to top, #2C5364, #203A43, #0F2027);
        position: fixed;
        height: 100%;
        width: 100%
        display: flex;
        align-items: center;
        justify-content: center;
        color: #0cc922;
        top: 0;
        left: 0;
    `;

    return (
        <Div>
            <div>
                <H1>SuperHeroes - The ultimate Quiz</H1>
                <ProgressBar percentage={percentage}/>
            </div>
        </Div>
    );
}

export default Welcome;