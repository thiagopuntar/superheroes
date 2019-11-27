import React, { Component } from 'react';
import LeaderboardService from '../services/LeaderboardService';
import Table from '../components/Table';

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
        const { records } = this.state;

        return ( 
            <Table rows={records}/>
         );
    }
}
 
export default Leaderboard;