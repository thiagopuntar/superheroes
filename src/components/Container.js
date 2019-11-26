import React from 'react';
import styled from 'styled-components';

const StyledContainer = styled.div`
    position: fixed;
    left: 0;
    height: 100vh;
    width: 100%;
    background: #ccc;
    padding: 20px 50px 50px 80px;
`;

const MyContainer = ({ children }) => {
    return (
        <StyledContainer>
            { children }
        </StyledContainer>
    )
};

export default MyContainer;