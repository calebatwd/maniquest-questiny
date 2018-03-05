import _ from 'lodash';
import React, {Component} from 'react';
import {Link} from 'react-router-native';
import {StyleSheet, Text, View, Image} from 'react-native';

import * as firebase from 'firebase';
import * as actions from '../../actions';

import Hand from './Hand';
import Board from './Board';
import ProgressBar from './ProgressBar';

class Game extends Component {
  state = {};

  giveHint(player, cards) {
    // Make sure the hint is valid
    this.submitTurn({type: actions.GIVE_HINT, player, cards});
  }

  playCard(card) {
    // Make sure the card is valid to play
    this.submitTurn({type: action.PLAY_CARD, card});
  }

  discardCard(card) {
    // Make sure the card is valid to discard
    submitTurn({type: actions.DISCARD_CARD, card});
  }

  componentWillMount() {}

  render() {
    const {
      deck,
      hands,
      gameId,
      scores,
      playerId,
      players,
      discardedCards,
      hintsRemaining,
      crashesRemaining,
      turnIndex,
    } = this.props;

    const currentPlayer = _.find(players, ['id', playerId]);

    return (
      <View style={styles.container}>
        <ProgressBar
          deck={deck}
          scores={scores}
          discardedCards={discardedCards}
          hintsRemaining={hintsRemaining}
          crashesRemaining={crashesRemaining}
        />
        <Board players={players} hands={hands} turnIndex={turnIndex} playerId={playerId} />
        <Hand hand={hands[playerId]} player={currentPlayer} turnIndex={turnIndex} />
      </View>
    );
  }
}

export default Game;

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});
