import React from 'react';
import styled from 'styled-components';
import { withRouter } from 'react-router-dom';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Button from '@material-ui/core/Button';

const Space = styled.div`
    flex: 1;
`;

const TotalPoints = styled.span`
    margin-left: 30px;
`;

const Header = ({ history, totalPoints, player, hasStarted, onRestart }) => {
    return ( 
    <AppBar position="static">
        <Toolbar>
            <Button color="inherit" onClick={() => {
                onRestart();
                history.push('/');
            }}>Play</Button>
            <Button color="inherit" onClick={() => history.push('/leaderBoard')}>Leader Board</Button>
            <Space />
            {hasStarted && <div>
                <span>Jogador: {player}</span>
                <TotalPoints>{totalPoints} pontos</TotalPoints>
            </div>}
        </Toolbar>
      </AppBar>      
    );
}
 
export default withRouter(Header);