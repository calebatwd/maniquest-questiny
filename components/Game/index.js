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
  giveHint(hintCardIds, hint, targetPlayerId, actorPlayerId) {
    const {hands, gameId} = this.props;
    const playerCardIds = hands[targetPlayerId].map((c) => c.cardId);

    // Make sure that the cards are actually a part of that players hand
    if (_.difference(hintCardIds, playerCardIds).length !== 0) {
      //TODO: if false, alert
      console.log('Invalid hint. Cards were not in the target players hand');
      return;
    }

    // Make sure that the hinted cards actually possess the hint property
    if (_.uniq(hintCardIds.map((id) => getCard(id)[hint])).length !== 1) {
      //TODO: if false, alert
      console.log('Invalid hint. The cards selected did not share the hint');
      return;
    }

    // Since the cards share the hint property, get the property
    const targetHintValue = getCard(hintCardIds[0])[hint];

    // Make sure that no other cards match the rule
    const nonHintedCardIds = _.difference(playerCardIds, hintCardIds);
    const otherCardHintValues = nonHintedCardIds.map((id) => getCard(id)[hint]);
    if (otherCardHintValues.includes(targetHintValue)) {
      //TODO: if false, alert
      console.log('Invalid hint. Other cards in the players hand also contain the selected hint');
      return;
    }

    submitTurn(
      gameId,
      {type: actions.GIVE_HINT, actor: actorPlayerId, targetPlayerId, hintCardIds, hint},
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

  componentWillReceiveProps(nextProps) {
    const {history, gameOutcome} = nextProps;
    //TODO: Move this to gamestate middleware post-reducers
    if (gameOutcome) {
      history.push('/end');
    }
  }

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
      gameOutcome,
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
          gameOutcome={gameOutcome}
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
