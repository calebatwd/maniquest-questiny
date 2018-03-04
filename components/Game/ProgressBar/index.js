import React, {Component} from 'react';
import {Text, View, StyleSheet} from 'react-native';

import Deck from './Deck';
import Score from './Score';
import HintCounter from './HintCounter';
import CrashCounter from './CrashCounter';

export default class ProgressBar extends Component {
  render() {
    return (
      <View style={styles.outerContainer}>
        <View style={styles.countersContainer}>
          <HintCounter />
          <CrashCounter />
        </View>
        <Score />
        <Deck />
      </View>
    );
  }
}

const styles = StyleSheet.create({
  outerContainer: {
    height: 80,
    flexDirection: 'row',
  },
  countersContainer: {
    marginRight: 12,
  },
});
