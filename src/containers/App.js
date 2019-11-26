import React, { Component } from 'react';
import { BrowserRouter as Router, Route, Redirect } from "react-router-dom";

import GameScreen from './GameScreen';
import Home from './Home';
import LeaderBoard from './LeaderBoard';
import Welcome from '../components/Welcome';
import Container from '../components/Container';
import Header from '../components/Header';
import ApiService from '../services/ApiService';

class App extends Component {
    state = {
        isLoading: true,
        loadingProgress: 0,
        chars: [],
        totalPoints: 0,
        player: null,
        hasStarted: false
    }
    
    componentDidMount() {
        const service = new ApiService();
        service.getAllChars(this.handleProgress)
            .then(chars => {
                this.setState({ chars, isLoading: false });
            })
            .catch(err => {
                console.log('Opssss ', err);
            })
    }

    handleProgress = percentage => {
        this.setState({ loadingProgress: percentage });
    }

    handleStart = () => {
        this.setState({ hasStarted: true });
    }

    handleRestart = () => {
        this.setState({ hasStarted: false });
    }

    handlePlayerChange = player => {
        this.setState({ player });
    }

    handleAnswer = points => {
        let { totalPoints } = this.state;
        this.setState({ totalPoints: (totalPoints + points) });
    }

    render() {
        const { isLoading, loadingProgress, chars, player, totalPoints, hasStarted } = this.state;

        return (
            isLoading ?
            <Welcome percentage={loadingProgress}/> :
            <Router>
                <Header 
                    hasStarted={hasStarted}
                    player={player}
                    totalPoints={totalPoints}
                    onRestart={this.handleRestart}
                />
                <Container>
                    <Route exact path="/" render={props => (
                        <Home 
                            onStart={this.handleStart}
                            onChange={this.handlePlayerChange}
                        />
                    )} />

                    <Route path="/play" render={props => {
                        return !hasStarted ? 
                            <Redirect to="/" push={true} /> :
                            <GameScreen 
                            chars={chars} 
                            onAnswer={this.handleAnswer} 
                            onRestart={this.handleRestart}
                            points={totalPoints}/>}
                        }
                    />

                    {hasStarted && <Redirect to="/play" push={true} />}

                    <Route path="/leaderBoard" component={LeaderBoard}/>
                </Container>
            </Router>
        );
    }
}

export default App;