import React, { Component } from 'react';
import LeaderboardService from '../services/LeaderboardService';

class Leaderboard extends Component {
    state = { 
        records: []
    }

    componentDidMount() {
        const service = new LeaderboardService();
        service.list()
            .then(records => this.setState({ records }));
    }

    

    render() { 
        return ( 
            <table>
            </table>
         );
    }
}
 
export default Leaderboard;