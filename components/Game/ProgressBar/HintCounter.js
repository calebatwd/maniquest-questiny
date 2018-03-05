import React from 'react';
import {Text, View, Image, StyleSheet} from 'react-native';

import hintIcon from '../../../resources/img/hint.png';

import colors from '../../../resources/colors.json';

export default ({hintsRemaining}) => (
  <View style={styles.hintContainer}>
    <Image style={styles.hintIcon} source={hintIcon} />
    <Text style={styles.hintText}>{hintsRemaining}/8</Text>
  </View>
);

const styles = StyleSheet.create({
  hintContainer: {
    flex: 1,
    alignItems: 'center',
    flexDirection: 'row',
  },
  hintIcon: {
    width: 32,
    height: 32,
    marginRight: 4,
  },
  hintText: {
    fontSize: 20,
    color: colors.slate,
    fontFamily: 'SpaceMono',
  },
});
