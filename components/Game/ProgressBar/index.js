import React from 'react';
import {View, StyleSheet} from 'react-native';

import Deck from './Deck';
import Score from './Score';
import HintCounter from './HintCounter';
import CrashCounter from './CrashCounter';

// TODO: display discarded cards

export default ({deck, scores, discardedCards, hintsRemaining, crashesRemaining}) => (
  <View style={styles.outerContainer}>
    <View style={styles.countersContainer}>
      <HintCounter hintsRemaining={hintsRemaining} />
      <CrashCounter crashesRemaining={crashesRemaining} />
    </View>
    <Score scores={scores} />
    <Deck deck={deck} />
  </View>
);

const styles = StyleSheet.create({
  outerContainer: {
    height: 80,
    flexDirection: 'row',
  },
  countersContainer: {
    marginRight: 12,
  },
});
