import _ from 'lodash';
import React, {Component} from 'react';
import {Text, View, Image, StyleSheet, TouchableHighlight} from 'react-native';

import Card from './Card';

import spacemanIcon from '../../resources/img/spaceman.png';
import {getCard} from '../../utils';
import colors from '../../resources/colors.json';

const avatars = {
  spaceman: spacemanIcon,
};

export default class Hand extends Component {
  render() {
    const {
      players,
      hands,
      turnPlayerId,
      loggedInPlayerId,
      selectedHint,
      selectCardToHint,
    } = this.props;
    const playersContent = _.map(players, (player) => {
      if (player.id === loggedInPlayerId) {
        return;
      }

      const isPlayersTurn = turnPlayerId === player.id;

      const cardsContent = _.map(hands[player.id], ({cardId, hint}, i) => {
        const {planet, rank} = getCard(cardId);
        const selected = selectedHint.cardIds.includes(cardId);
        return (
          <TouchableHighlight
            key={`${player.name}_${i}`}
            onPress={() => selectCardToHint({playerId: player.id, cardId})}
          >
            <Card planet={planet} rank={rank} selected={selected} hint={hint} />
          </TouchableHighlight>
        );
      });

      return (
        <View style={styles.playerContainer} key={player.name}>
          <View style={styles.playerNameAvatarContainer}>
            <Image style={styles.playerAvatar} source={avatars[player.avatar]} />
            <Text style={[styles.playerName, isPlayersTurn && styles.playerNameHighlight]}>
              {player.name}
            </Text>
          </View>
          <View style={styles.playerCardsContainer}>{cardsContent}</View>
        </View>
      );
    });

    return <View style={styles.playersContainer}>{playersContent}</View>;
  }
}

const styles = StyleSheet.create({
  playersContainer: {
    flex: 1,
    flexDirection: 'column',
    marginTop: 8,
  },
  playerContainer: {
    flex: 1,
    flexDirection: 'column',
    marginBottom: 12,
  },
  playerNameAvatarContainer: {
    paddingLeft: 12,
    flexDirection: 'row',
  },
  playerName: {
    fontSize: 28,
    fontFamily: 'SpaceMonoBold',
  },
  playerNameHighlight: {
    color: colors.purple,
  },
  playerAvatar: {
    width: 48,
    height: 40,
    marginRight: 12,
  },
  playerCardsContainer: {
    flex: 1,
    flexDirection: 'row',
  },
});
