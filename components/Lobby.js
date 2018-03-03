import React, {Component} from 'react';
import {StyleSheet, Text, View, Image} from 'react-native';
import {Link} from 'react-router-native';

import * as firebase from 'firebase';

import colors from '../resources/colors.json';
import spaceman from '../resources/img/spaceman.png';

class Lobby extends Component {
  state = {
    players: [],
  };

  componentWillMount() {
    this.gameId = this.props.match.params.gameId;

    const playersRef = firebase.database().ref(`games/${this.gameId}/players`);
    playersRef.on(
      'child_added',
      (snap) => {
        const name = snap.val().name;
        this.setState((prevState) => {
          return {
            players: [...prevState.players, {key: name}],
          };
        });
      },
      (error) => {
        console.log('Failed to fetch players. ' + error);
      }
    );
  }

  render() {
    const {players} = this.state;

    var playerList = [];
    for (var i = 0; i < 5; i++) {
      playerList.push(
        <View style={styles.slot} key={i}>
          <Image style={styles.avatar} source={spaceman} />
          <Text style={styles.playerName}>{players[i] ? players[i].key : '...'}</Text>
        </View>
      );
    }

    return (
      <View style={styles.container}>
        <Link to="/" underlayColor={colors.slate}>
          <Text style={styles.backButtonText}>&lt; Home</Text>
        </Link>
        <View style={styles.innerContainer}>
          <Text style={styles.title}>Lobby</Text>
          <Text style={styles.subtitle}>Room: {this.gameId}</Text>
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
