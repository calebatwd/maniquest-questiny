import React, {Component} from 'react';
import {StyleSheet, Text, View, Image} from 'react-native';

import * as firebase from 'firebase';

import colors from '../resources/colors.json';

class Game extends Component {
  state = {};

  componentWillMount() {
    this.gameId = this.props.match.params.gameId;

    const gameRef = firebase.database().ref(`games/${this.gameId}`);
    gameRef.on(
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
    return (
      <View style={styles.container}>
        <View>
          <Text>Top</Text>
        </View>
        <View>
          <Text>Other players hand</Text>
        </View>
        <View>
          <Text>Your hand</Text>
        </View>
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
