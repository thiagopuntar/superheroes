import React from 'react';
import styled from 'styled-components';

const Image = styled.img`
    height: 400px;
    margin-bottom: 10px;
`;

const Character = ({ imageUrl }) => (
    <Image src={`data:image/jpg;base64,${imageUrl}`} alt="Character" />
);

export default Character;