import _ from 'lodash';
import React, {Component} from 'react';
import {Text, View, Image, StyleSheet} from 'react-native';

import Card from './Card';

import spacemanIcon from '../../resources/img/spaceman.png';

const avatars = {
  spaceman: spacemanIcon,
};

export default ({}) => {
  // TODO: use card array passed in from props
  const players = [
    {
      name: 'Caleb',
      avatar: 'spaceman',
      cards: [
        {planet: 'mars', rank: 4},
        {planet: 'mercury', rank: 5},
        {planet: 'saturn', rank: 4},
        {planet: 'mars', rank: 2},
      ],
    },
    {
      name: 'Lunar Larry',
      avatar: 'spaceman',
      cards: [
        {planet: 'venus', rank: 1},
        {planet: 'mercury', rank: 4},
        {planet: 'jupiter', rank: 1},
        {planet: 'jupiter', rank: 1},
      ],
    },
    {
      name: 'Spaceman Sam',
      avatar: 'spaceman',
      cards: [
        {planet: 'mercury', rank: 3},
        {planet: 'mars', rank: 1},
        {planet: 'saturn', rank: 2},
        {planet: 'saturn', rank: 5},
      ],
    },
  ];

  const playersContent = _.map(players, ({name, avatar, cards}) => {
    const cardsContent = _.map(cards, ({rank, planet}, i) => {
      return <Card planet={planet} rank={rank} key={`${name}_${i}`} />;
    });

    return (
      <View style={styles.playerContainer} key={name}>
        <View style={styles.playerNameAvatarContainer}>
          <Image style={styles.playerAvatar} source={avatars[avatar]} />
          <Text style={styles.playerName}>{name}</Text>
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
