import _ from 'lodash';
import React, {Component} from 'react';
import {Link} from 'react-router-native';
import {StyleSheet, Text, View, Image} from 'react-native';

import * as firebase from 'firebase';

import colors from '../resources/colors.json';
import spaceman from '../resources/img/spaceman.png';

class Lobby extends Component {
  componentWillMount() {
    const {fetchGameState, gameId} = this.props;

    fetchGameState(this.gameId);
  }

  renderPlayerList(players) {
    var playerList = [];
    for (var key in players) {
      playerList.push(
        <View style={styles.slot} key={key}>
          <Image style={styles.avatar} source={spaceman} />
          <Text style={styles.playerName}>{players[key].name}</Text>
        </View>
      );
    }

    for (var i = playerList.length; i < 5; i++) {
      playerList.push(
        <View style={styles.slot} key={i}>
          <Image style={styles.avatar} source={spaceman} />
          <Text style={styles.playerName}>...</Text>
        </View>
      );
    }

    return playerList;
  }

  render() {
    const {players, gameId} = this.props;

    const playerList = this.renderPlayerList(players);

    return (
      <View style={styles.container}>
        <Link to="/" underlayColor={colors.slate}>
          <Text style={styles.backButtonText}>&lt; Home</Text>
        </Link>
        <View style={styles.innerContainer}>
          <Text style={styles.title}>Lobby</Text>
          <Text style={styles.subtitle}>Room: {gameId}</Text>
          <View>{playerList}</View>
          <Link to="/" style={styles.button} underlayColor={colors.slate}>
            <Text style={styles.buttonText}>Start</Text>
          </Link>
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
  button: {
    alignItems: 'center',
    backgroundColor: colors.orange,
    padding: 10,
    margin: 16,
    width: 200,
    height: 60,
    justifyContent: 'center',
  },
  buttonText: {
    fontSize: 20,
    color: '#FFF',
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
