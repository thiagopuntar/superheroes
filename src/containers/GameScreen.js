import React, { Fragment, Component } from 'react';
import styled from 'styled-components';
import CircularProgress from '@material-ui/core/CircularProgress';
import axios from 'axios';

import LeaderboardService from '../services/LeaderboardService';
import {getRandomInt, shuffle } from '../utils/random';
import Character from '../components/Character';
import AnswerOptions from '../components/AnswerOptions';
import GameMessage from '../components/GameMessage';
import Result from '../components/Result';
import failureGif from '../assets/errou.gif';
import successImg from '../assets/acertou.jpg';

const Div = styled.div`
    width: 40%;
    text-align: center;
    display: inline-block;
    position: relative;
`;

const Progress = styled(CircularProgress)`
    && {
        color: 'primary';
        position: 'absolute';
        top: '50%';
        left: '50%';
        marginTop: -12;
        marginLeft: -12;
    }
`;

const CharName = styled.h3`
    visibility: ${props => props.visible ? "visible" : "hidden" }
`;

class GameScreen extends Component {
    constructor(props) {
        super(props);

        this.state = {
            chars: props.chars.filter(x => x.name),
            selectedCharacter: {},
            options: [],
            hit: null,
            rounds: 2,
            actualRound: 1,
            hitNumber: 0,
            isLoading: true,
            disableButtons: true,
            img: '',
            successImg: null,
            failureImg: null,
            error: false,
            saveGame: true
        }
    }

    componentDidMount() {
        const objUpdate = this.selectCharacter();

        const success = axios.get(successImg, { responseType: 'arraybuffer' })
            .then(res => Buffer.from(res.data).toString('base64'));

        const failure = axios.get(failureGif, { responseType: 'arraybuffer' })
            .then(res => Buffer.from(res.data).toString('base64'));
        
        Promise.all([success, failure])
            .then(result => {
                const [ successImg, failureImg ] = result;
                this.setState({ ...objUpdate, successImg, failureImg });
            });
    }

    selectCharacter = () => {
        const newChars = this.state.chars.slice();
        const randomIndex = getRandomInt(0, newChars.length);
        const [ selectedCharacter ] = newChars.splice(randomIndex, 1);
        const randomIndex1 = getRandomInt(0, newChars.length);
        const randomIndex2 = getRandomInt(0, newChars.length);

        const options = shuffle([
            {...newChars[randomIndex1] },
            {...newChars[randomIndex2] },
            {...selectedCharacter}
        ]);

        return {
            selectedCharacter,
            options,
            chars: newChars
        };
    }

    handleAnswer = id => {
        let { selectedCharacter, hitNumber } = this.state;
        const hit = id === selectedCharacter.id;
        
        const points = hit ? 20 : 0;
        hitNumber += hit ? 1 : 0;

        this.setState({ hit, hitNumber, disableButtons: true });
        this.props.onAnswer(points);
    }

    handleNext = () => {
        const actualRound = this.state.actualRound + 1;
        const nextRound = this.selectCharacter();
        this.setState({ ...nextRound, hit: null, actualRound, isLoading: true });
    }

    computeHitPercentage() {
        const { rounds, hitNumber } = this.state;
        return parseInt((hitNumber / rounds) * 100, 10);
    }

    componentDidUpdate() {
        const { 
            selectedCharacter, 
            isLoading, 
            actualRound, 
            rounds,
            hitNumber
        } = this.state;

        const { player, points } = this.props;

        if (isLoading) {
            const imgUrl = selectedCharacter.images.md;
            axios.get(imgUrl, { responseType: 'arraybuffer' })
                .then(res => {
                    const img = Buffer.from(res.data).toString('base64');
                    this.setState({ img, isLoading: false, disableButtons: false });
                })
                .catch(error => {
                    this.setState({ error, isLoading: false });
                });

            if (actualRound > rounds) {
                const service = new LeaderboardService();
                const record = {
                    player,
                    points,
                    hitNumber,
                    percentage: this.computeHitPercentage()
                }
    
                service.save(record);
            }
        }

        
    }

    render() {
        const { 
            selectedCharacter, 
            hit, 
            options, 
            rounds, 
            actualRound, 
            isLoading,
            img,
            disableButtons,
            successImg,
            failureImg,
            error
        } = this.state;

        const { points, onRestart } = this.props;

        return (
            actualRound > rounds ?
            <Result 
                points={points}
                percentage={this.computeHitPercentage()}
                onRestart={onRestart}
            /> :
            <Fragment>
                <Div>
                    <CharName visible={hit !== null}>{selectedCharacter.name}</CharName>
                    {isLoading ? 
                        <Progress size={48} /> :
                        <Character imageUrl={img} />
                    }
                    {error && 
                        <p>Erro na aplicação. Tente novamente mais tarde ou verifique sua conexão com a internet</p>
                    }
                    <div>
                        <AnswerOptions 
                            disable={disableButtons}
                            options={options}
                            onAnswer={this.handleAnswer}
                        />
                    </div>
                    
                </Div>
                <GameMessage 
                    hit={hit}
                    onNext={this.handleNext}
                    name={selectedCharacter.name}
                    success={successImg}
                    failure={failureImg}
                />
            </Fragment>
        );
    }
}
 
export default GameScreen;
