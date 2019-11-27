import React from 'react';
import styled from 'styled-components';

const Table = styled.table`
    border-collapse: collapse;
    width: 90%;
    margin: 10px;
`;

const Tr = styled.tr`
    &:nth-child(even) {
        background: #9fafc9;
    }

    &:hover {
        background: #dae1ed;
    }
`;

const Td = styled.td`
    border: 1px solid #ddd;
    padding: 8px;
`;

const Th = styled.th`
    border: 1px solid #ddd;
    padding: 8px;
`;


const LeaderboardTable = ({ rows }) => {
    return ( 
        <Table>
            <thead>
                <tr>
                    <Th>Player</Th>
                    <Th>Points</Th>
                    <Th>Percentage</Th>
                    <Th>Date</Th>
                </tr>
            </thead>
            <tbody>
                {rows.map(row => (
                    <Tr key={row._id}>
                        <Td>{row.player}</Td>
                        <Td>{row.points}</Td>
                        <Td>{row.percentage}%</Td>
                        <Td>{row.date}</Td>
                    </Tr>
                ))}
            </tbody>
        </Table>    
    );
}
 
export default LeaderboardTable;