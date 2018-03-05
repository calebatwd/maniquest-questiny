import _ from 'lodash';
import React, {Component} from 'react';
import {Link} from 'react-router-native';
import {StyleSheet, Text, View, Image} from 'react-native';

import * as firebase from 'firebase';
import * as actions from '../../actions';

import Hand from './Hand';
import Board from './Board';
import ProgressBar from './ProgressBar';
import {getCard} from '../../utils';

class Game extends Component {
  state = {};

  giveHint(playerId, cards, hint) {
    const {hands} = this.props;
    const playerHand = hands[playerId];

    // Make sure that the cards are actually a part of that players hand
    if (_.difference(cards, playerHand).length !== 0) {
      //TODO: if false, alert
      console.log('Invalid hint. Cards were not in the target players hand');
      return;
    }

    // Build an array of cards that were not selected for reference
    const nonHintedCards = _.difference(playerHand, cards);

    // Make sure that the hinted cards actually possess the hint property
    if (_.uniq(_.get(cards, hint)).length !== 1) {
      //TODO: if false, alert
      console.log('Invalid hint. The cards selected did not share the hint');
      return;
    }

    // Since the cards share the hint property, get the property
    const hintProperty = cards[hint];

    // Make sure that no other cards match the rule
    if (_.find(nonHintedCards, [hint, hintProperty])) {
      //TODO: if false, alert
      console.log('Invalid hint. Other cards in the players hand also contain the selected hint');
      return;
    }

    this.submitTurn({type: actions.GIVE_HINT, playerId, cards, hint});
  }

  playCard(card) {
    const {deck, scores} = this.props;
    const {planet, rank} = getCard(card);

    // Check for success
    const expected = scores[planet] + 1;
    const successful = expected.toString() == rank;

    // Draw a new card from the deck
    const newCard = deck.shift();
    this.submitTurn({type: action.PLAY_CARD, successful, card, newCard});
  }

  discardCard(card) {
    // Draw a new card from the deck
    const {deck} = this.props;
    const newCard = deck.shift();

    submitTurn({type: actions.DISCARD_CARD, card, newCard});
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
