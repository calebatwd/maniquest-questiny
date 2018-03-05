import React from 'react';
import {Text, View, Image, StyleSheet} from 'react-native';

import crashIcon from '../../../resources/img/crash.png';

import colors from '../../../resources/colors.json';

export default ({crashesRemaining}) => (
  <View style={styles.crashContainer}>
    <Image style={styles.crashIcon} source={crashIcon} />
    <Text style={styles.crashText}>{crashesRemaining}/3</Text>
  </View>
);

const styles = StyleSheet.create({
  crashContainer: {
    flex: 1,
    alignItems: 'center',
    flexDirection: 'row',
  },
  crashIcon: {
    width: 32,
    height: 32,
    marginRight: 4,
  },
  crashText: {
    fontSize: 20,
    color: colors.slate,
    fontFamily: 'SpaceMono',
  },
});
