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
    const {gameId} = this.props;

    return (
      <View style={styles.container}>
        <ProgressBar />
        <Board />
        <Hand />
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
