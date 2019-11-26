import React, { Fragment, Component } from 'react';
import styled from 'styled-components';
import {getRandomInt, shuffle } from '../utils/random';
import Character from '../components/Character';
import AnswerOptions from '../components/AnswerOptions';
import GameMessage from '../components/GameMessage';
import Result from '../components/Result';

const Div = styled.div`
    width: 40%;
    text-align: center;
    display: inline-block;
`;

const CharName = styled.h3`
    visibility: ${props => props.visible ? "visible" : "hidden" }
`;

class GameScreen extends Component {
    constructor(props) {
        super(props);

        this.state = {
            chars: props.chars.slice(),
            selectedCharacter: { images: { md: null } },
            options: [],
            hit: null,
            rounds: 2,
            actualRound: 1,
            hitNumber: 0
        }
    }

    componentDidMount() {
        const objUpdate = this.selectCharacter();
        this.setState({ ...objUpdate });
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

        this.setState({ hit, hitNumber });
        this.props.onAnswer(points);
    }

    handleNext = () => {
        const actualRound = this.state.actualRound + 1;
        const nextRound = this.selectCharacter();
        this.setState({ ...nextRound, hit: null, actualRound });
    }

    render() {
        const { selectedCharacter, hit, options, rounds, actualRound, hitNumber } = this.state;
        const { points, onRestart } = this.props;

        return (
            actualRound > rounds ?
            <Result 
                points={points}
                rounds={rounds}
                hits={hitNumber}
                onRestart={onRestart}
            /> :
            <Fragment>
                <Div>
                    <CharName visible={hit !== null}>{selectedCharacter.name}</CharName>
                    <Character imageUrl={selectedCharacter.images.md} />
                    <div>
                        <AnswerOptions 
                            disable={hit}
                            options={options}
                            onAnswer={this.handleAnswer}
                        />
                    </div>
                </Div>
                <GameMessage 
                    hit={hit}
                    onNext={this.handleNext}
                    name={selectedCharacter.name}
                />
            </Fragment>
        );
    }
}
 
export default GameScreen;
