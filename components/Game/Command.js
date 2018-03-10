import React, {Component} from 'react';
import {Text, View, StyleSheet, TouchableHighlight} from 'react-native';
import _ from 'lodash';

import colors from '../../resources/colors.json';
import {getCard} from '../../utils';

export default class Command extends Component {
  render() {
    const {
      turnPlayerId,
      loggedInPlayerId,
      selectedCardToPlay,
      selectedHint,
      discardCard,
      playCard,
      giveHint,
    } = this.props;

    // If it's not the logged in players turn, don't draw commands
    if (loggedInPlayerId !== turnPlayerId) {
      return null;
    }

    if (selectedCardToPlay) {
      return (
        <View style={styles.commandContainer}>
          <TouchableHighlight
            style={styles.button}
            onPress={() => discardCard(selectedCardToPlay, turnPlayerId)}
          >
            <Text style={styles.buttonText}>Scuttle</Text>
          </TouchableHighlight>
          <TouchableHighlight
            style={styles.button}
            onPress={() => playCard(selectedCardToPlay, turnPlayerId)}
          >
            <Text style={styles.buttonText}>Launch</Text>
          </TouchableHighlight>
        </View>
      );
    } else if (selectedHint.cardIds.length > 0) {
      const selectedCards = selectedHint.cardIds.forEach((cId) => getCard(cId));
      const planetHintEnabled = _.uniq(selectedCards.map((card) => card.planet)).length === 1;
      const rankHintEnabled = _.uniq(selectedCards.map((card) => card.rank)).length === 1;

      return (
        <View style={styles.commandContainer}>
          {planetHintEnabled && (
            <TouchableHighlight
              style={styles.button}
              onPress={() =>
                giveHint(selectedHint.cardIds, 'planet', selectedHint.playerId, turnPlayerId)
              }
            >
              <Text style={styles.buttonText}>Hint Planet</Text>
            </TouchableHighlight>
          )}
          {rankHintEnabled && (
            <TouchableHighlight
              style={styles.button}
              onPress={() =>
                giveHint(selectedHint.cardIds, 'rank', selectedHint.playerId, turnPlayerId)
              }
            >
              <Text style={styles.buttonText}>Hint Rank</Text>
            </TouchableHighlight>
          )}
        </View>
      );
    } else {
      return null;
    }
  }
}

const styles = StyleSheet.create({
  button: {
    alignItems: 'center',
    backgroundColor: colors.orange,
    padding: 10,
    margin: 10,
    width: 200,
    height: 60,
    justifyContent: 'center',
  },
  buttonText: {
    fontSize: 20,
    color: colors.white,
  },
  commandContainer: {
    position: 'absolute',
    bottom: 150,
    alignSelf: 'center',
  },
});
