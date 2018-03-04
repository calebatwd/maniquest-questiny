import React, {Component} from 'react';
import {Link} from 'react-router-native';
import {StyleSheet, Text, View, Image} from 'react-native';

import * as firebase from 'firebase';

import colors from '../resources/colors.json';

class Game extends Component {
  state = {};

  giveHint(player, cards) {
    // Make sure the hint is valid
    this.submitTurn({type: actions.GIVE_HINT, player, cards});
  }

  playCard(card) {
    // Make sure the card is valid to play
    this.submitTurn({type: action.PLAY_CARD, card});
  }

  discardCard(card) {
    // Make sure the card is valid to discard
    this.submitTurn({type: actions.DISCARD_CARD, card});
  }

  submitTurn(turn) {
    firebase
      .database()
      .ref(`/games/${gameId}/turns`)
      .push(turn, (error) => {
        if (error) console.log('Error pushing turn', error);
        else console.log('Turn submitted');
      });
  }

  componentWillMount() {
    const {gameId} = this.props;

    const gameRef = firebase.database().ref(`games/${gameId}`);
    gameRef.on(
      'child_added',
      (snap) => {
        const name = snap.val().name;
        console.log('Got game data from Firebase');
        // this.setState((prevState) => {
        //   return {
        //     players: [...prevState.players, {key: name}],
        //   };
        // });
      },
      (error) => {
        console.log('Failed to fetch players. ' + error);
      }
    );
  }

  render() {
    const {gameId} = this.props;

    return (
      <View style={styles.container}>
        <Link to="/" underlayColor={colors.slate}>
          <Text style={styles.backButtonText}>&lt; Home</Text>
        </Link>

        <View>
          <Text>Top</Text>
        </View>
        <View>
          <Text>Other players hand</Text>
        </View>
        <View>
          <Text>Your hand</Text>
        </View>
        <Text style={styles.title}>Game: {gameId}</Text>
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
  backButtonText: {
    marginTop: 10,
    fontSize: 24,
    color: colors.orange,
  },
});
