import React from 'react';
import {Text, View, Image, StyleSheet} from 'react-native';

import deckIcon from '../../../resources/img/deck.png';

import colors from '../../../resources/colors.json';

export default ({deck}) => (
  <View style={styles.deckContainer}>
    <Text style={styles.deckText}>{deck.length}</Text>
    <Image style={styles.deckIcon} source={deckIcon} />
  </View>
);

const styles = StyleSheet.create({
  deckContainer: {
    alignItems: 'center',
    justifyContent: 'center',
    flexDirection: 'column',
  },
  deckIcon: {
    width: 32,
    height: 32,
  },
  deckText: {
    fontSize: 20,
    color: colors.slate,
    fontFamily: 'SpaceMono',
  },
});
