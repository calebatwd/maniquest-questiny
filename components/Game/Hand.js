import _ from 'lodash';
import color from 'color';
import React, {Component} from 'react';
import {Text, View, Image, StyleSheet} from 'react-native';

import Card from './Card';

import spacemanIcon from '../../resources/img/spaceman.png';

const avatars = {
  spaceman: spacemanIcon,
};

import colors from '../../resources/colors.json';

export default ({}) => {
  // TODO: use card array passed in from props
  const cards = [
    {planet: 'mars', rank: 4},
    {planet: 'mercury', rank: 5},
    {planet: 'saturn', rank: 4},
    {planet: 'mars', rank: 2},
  ];

  const cardsContent = _.map(cards, ({rank, planet}, i) => {
    return <Card planet={planet} rank={rank} key={i} />;
  });

  return (
    <View style={styles.playerContainer}>
      <View style={styles.nameAvatarContainer}>
        <Image style={styles.avatar} source={avatars.spaceman} />
        <Text style={styles.name}>Me</Text>
      </View>
      <View style={styles.cardsContainer}>{cardsContent}</View>
    </View>
  );
};

const styles = StyleSheet.create({
  playerContainer: {
    backgroundColor: color(colors.slate).fade(0.5),
    marginBottom: 10,
  },
  nameAvatarContainer: {
    marginTop: 6,
    marginLeft: 12,
    flexDirection: 'row',
  },
  name: {
    fontSize: 28,
    fontFamily: 'SpaceMonoBold',
  },
  avatar: {
    width: 48,
    height: 40,
    marginRight: 12,
  },
  cardsContainer: {
    flexDirection: 'row',
  },
});
