import _ from 'lodash';
import React, {Component} from 'react';
import {Text, View, StyleSheet} from 'react-native';

import Card from './Card';

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
    <View style={styles.outerContainer}>
      <Text style={styles.yourHandText}>Your Hand</Text>
      <View style={styles.innerContainer}>{cardsContent}</View>
    </View>
  );
};

const styles = StyleSheet.create({
  outerContainer: {
    alignItems: 'center',
    marginBottom: 10,
  },
  innerContainer: {
    flexDirection: 'row',
  },
  yourHandText: {
    fontSize: 20,
    fontFamily: 'SpaceMonoBold',
  },
});
