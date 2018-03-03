import React, {Component} from 'react';
import {StyleSheet, Text, View, Image} from 'react-native';

import * as firebase from 'firebase';

import colors from '../resources/colors.json';

class Game extends Component {
  render() {
    return (
      <View style={styles.container}>
        <Text style={styles.title}>Game</Text>
      </View>
    );
  }
}

export default Game;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.white,
    alignItems: 'center',
    justifyContent: 'center',
    paddingHorizontal: 10,
  },
  title: {
    fontSize: 44,
    fontFamily: 'SpaceMonoBold',
    textAlign: 'center',
    color: colors.purple,
  },
});
