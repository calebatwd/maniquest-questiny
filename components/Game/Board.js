import _ from 'lodash';
import React, {Component} from 'react';
import {Text, View, Image, StyleSheet} from 'react-native';

import Card from './Card';

import spacemanIcon from '../../resources/img/spaceman.png';
import {getCard} from '../../utils';

const avatars = {
  spaceman: spacemanIcon,
};

export default ({players, hands, turnIndex, playerId}) => {
  const playersContent = _.map(players, (player) => {
    if (player.id == playerId) {
      return;
    }

    const cardsContent = _.map(hands[player.id], (card, i) => {
      const {planet, rank} = getCard(card);
      return <Card planet={planet} rank={rank} key={`${player.name}_${i}`} />;
    });

    return (
      <View style={styles.playerContainer} key={player.name}>
        <View style={styles.playerNameAvatarContainer}>
          <Image style={styles.playerAvatar} source={avatars[player.avatar]} />
          <Text style={styles.playerName}>{player.name}</Text>
        </View>
        <View style={styles.playerCardsContainer}>{cardsContent}</View>
      </View>
    );
  });

  return <View style={styles.playersContainer}>{playersContent}</View>;
};

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
