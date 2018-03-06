import _ from 'lodash';
import React, {Component} from 'react';
import {StyleSheet, View, Image} from 'react-native';

import * as actions from '../../actions';

import ProgressBar from './ProgressBar';
import {getCard, submitTurn} from '../../utils';
import HandContainer from '../../containers/HandContainer';
import BoardContainer from '../../containers/BoardContainer';
import CommandContainer from '../../containers/CommandContainer';

import earthIcon from '../../resources/img/planets/earth.png';

class Game extends Component {
  giveHint(cardIds, hint, targetPlayerId, actorPlayerId) {
    const {hands, gameId} = this.props;
    const playerCardIds = hands[targetPlayerId].map((c) => c.cardId);

    // Make sure that the cards are actually a part of that players hand
    if (_.difference(cardIds, playerCardIds).length !== 0) {
      //TODO: if false, alert
      console.log('Invalid hint. Cards were not in the target players hand');
      return;
    }

    // Build an array of cards that were not selected for reference
    const nonHintedCardIds = _.difference(playerCardIds, cardIds);

    // Make sure that the hinted cards actually possess the hint property
    if (_.uniq(cardIds.map((id) => getCard(id).planet)).length !== 1) {
      //TODO: if false, alert
      console.log('Invalid hint. The cards selected did not share the hint');
      return;
    }

    // Since the cards share the hint property, get the property
    const {planet, rank} = getCard(cardIds[0]);

    // Make sure that no other cards match the rule
    nonHintedCardIds.forEach((nonHintedCardId) => {
      const nonHintedCard = getCard(nonHintedCardId);
      if (hint === 'planet' && nonHintedCard.planet === planet) {
        //TODO: if false, alert
        console.log(
          'Invalid hint. Other cards in the players hand also contain the selected planet hint'
        );
        return;
      } else if (hint === 'rank' && nonHintedCard.rank === rank) {
        //TODO: if false, alert
        console.log(
          'Invalid hint. Other cards in the players hand also contain the selected rank hint'
        );
        return;
      }
    });

    submitTurn(
      gameId,
      {type: actions.GIVE_HINT, actor: actorPlayerId, targetPlayerId, cardIds, hint},
      {hands}
    );
  }

  playCard(cardId, actorPlayerId) {
    const {deck, hands, scores, gameId} = this.props;
    const {planet, rank} = getCard(cardId);

    // Check for success
    const expected = scores[planet] + 1;
    const successful = expected.toString() === rank;

    // Draw a new card from the deck
    submitTurn(
      gameId,
      {type: actions.PLAY_CARD, successful, cardId, actor: actorPlayerId},
      {hands, deck}
    );
  }

  discardCard(cardId, actorPlayerId) {
    // Draw a new card from the deck
    const {deck, hands, gameId} = this.props;
    submitTurn(gameId, {type: actions.DISCARD_CARD, cardId, actor: actorPlayerId}, {hands, deck});
  }

  componentWillMount() {}

  render() {
    const {
      deck,
      hands,
      gameId,
      scores,
      loggedInPlayerId,
      players,
      discardedCards,
      hintsRemaining,
      crashesRemaining,
      turnIndex,
    } = this.props;

    const me = _.find(players, ['id', loggedInPlayerId]);
    const turnPlayerId = players[turnIndex % players.length].id;

    return (
      <View style={styles.container}>
        <Image style={styles.earthIcon} source={earthIcon} />
        <ProgressBar
          deck={deck}
          scores={scores}
          discardedCards={discardedCards}
          hintsRemaining={hintsRemaining}
          crashesRemaining={crashesRemaining}
        />
        <BoardContainer
          players={players}
          hands={hands}
          turnPlayerId={turnPlayerId}
          loggedInPlayerId={loggedInPlayerId}
        />
        <HandContainer
          hand={hands[loggedInPlayerId]}
          player={me}
          turnPlayerId={turnPlayerId}
          gameId={gameId}
        />
        <CommandContainer
          turnPlayerId={turnPlayerId}
          loggedInPlayerId={loggedInPlayerId}
          discardCard={this.discardCard.bind(this)}
          playCard={this.playCard.bind(this)}
          giveHint={this.giveHint.bind(this)}
        />
      </View>
    );
  }
}

export default Game;

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  earthIcon: {
    position: 'absolute',
    left: -120,
    bottom: -420,
    width: 600,
    height: 600,
    transform: [{rotateX: '20deg'}],
  },
});
