import _ from 'lodash';
import React, {Component} from 'react';
import {Link} from 'react-router-native';
import {StyleSheet, Text, View, Image} from 'react-native';

import ProgressBar from './Game/ProgressBar';

import colors from '../resources/colors.json';
import spaceman from '../resources/img/spaceman.png';

class Lobby extends Component {
  renderPlayerList(players) {
    const playersList = _.map(players, ({avatar, name}, i) => {
      return (
        <View style={styles.slot} key={i}>
          <Image style={styles.avatar} source={spaceman} />
          <Text style={styles.playerName}>{name}</Text>
        </View>
      );
    });

    return <View>{playersList}</View>;
  }

  render() {
    const {
      players,
      scores,
      gameOutcome,
      deck,
      discardedCards,
      hintsRemaining,
      crashesRemaining,
    } = this.props;

    const playerList = this.renderPlayerList(_.values(players));
    const totalScore = _.sum(_.values(scores));

    return (
      <View style={styles.container}>
        <Link to="/" underlayColor={colors.slate}>
          <Text style={styles.backButtonText}>&lt; Home</Text>
        </Link>
        <View style={styles.innerContainer}>
          <Text style={styles.title}>{gameOutcome}</Text>

          <Text style={styles.subtitle}>Score: {totalScore}</Text>

          <ProgressBar
            deck={deck}
            scores={scores}
            discardedCards={discardedCards}
            hintsRemaining={hintsRemaining}
            crashesRemaining={crashesRemaining}
          />

          {playerList}
        </View>
      </View>
    );
  }
}

export default Lobby;

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  backButtonText: {
    marginTop: 10,
    fontSize: 24,
    color: colors.orange,
  },
  innerContainer: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  title: {
    fontSize: 44,
    fontFamily: 'SpaceMonoBold',
    textAlign: 'center',
    color: colors.purple,
  },
  subtitle: {
    fontFamily: 'SpaceMonoBold',
    fontSize: 18,
  },
  item: {
    padding: 10,
    fontSize: 24,
  },
  slot: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 12,
  },
  avatar: {
    width: 40,
    height: 40,
    marginRight: 20,
  },
  playerName: {
    fontFamily: 'SpaceMonoBold',
    fontSize: 32,
  },
});
