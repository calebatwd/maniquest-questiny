import React, {Component} from 'react';
import {StyleSheet, Text, View, Image} from 'react-native';
import {Link} from 'react-router-native';

import * as firebase from 'firebase';

import colors from '../resources/colors.json';
import spaceman from '../resources/img/spaceman.png';

class Lobby extends Component {
  componentWillMount() {
    this.gameId = this.props.match.params.gameId;

    this.players = [{key: 'Caleb'}, {key: 'Jake'}];

    const playersRef = firebase.database().ref(`games/${this.gameId}/players`);
    playersRef.on('child_added', function(player) {
      this.players.push({key: player.name});
    });
  }

  render() {
    var playerList = [];
    for (var i = 0; i < 5; i++) {
      playerList.push(
        <View style={styles.slot} key={i}>
          <Image style={styles.avatar} source={spaceman} />
          <Text style={styles.playerName}>{this.players[i] ? this.players[i].key : '...'}</Text>
        </View>
      );
    }

    return (
      <View style={styles.container}>
        <Text style={styles.title}>Lobby</Text>
        <Text style={styles.subtitle}>Room: test</Text>
        <View>{playerList}</View>
        <Link to="/" style={styles.button} underlayColor={colors.slate}>
          <Text style={styles.buttonText}>Start</Text>
        </Link>
      </View>
    );
  }
}

export default Lobby;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.white,
    alignItems: 'center',
    justifyContent: 'center',
    paddingHorizontal: 10,
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
    justifyContent: 'center',
    alignItems: 'center',
    padding: 12,
  },
  avatar: {
    width: 50,
    height: 50,
    marginRight: 20,
  },
  playerName: {
    fontFamily: 'SpaceMonoBold',
    width: 150,
    fontSize: 32,
  },
});
