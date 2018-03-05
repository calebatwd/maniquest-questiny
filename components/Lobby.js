import _ from 'lodash';
import React, {Component} from 'react';
import {Link} from 'react-router-native';
import {StyleSheet, Text, View, Image, TouchableHighlight} from 'react-native';

import * as firebase from 'firebase';
import * as actions from '../actions';

import colors from '../resources/colors.json';
import spaceman from '../resources/img/spaceman.png';
import {submitTurn} from '../utils';

class Lobby extends Component {
  componentWillMount() {
    const {fetchPlayers, fetchTurns, gameId, history} = this.props;
    fetchPlayers(gameId);
    fetchTurns(gameId, history);
  }

  startGame() {
    const {players, gameId} = this.props;

    if (gameId === '') {
      // TODO: display an error if the game ID is empty or invalid
      console.log('No game ID provided on new game screen...');
    } else {
      var cards = [];
      const planets = ['jupiter', 'mars', 'mercury', 'saturn', 'venus'];
      const ranks = ['1_1', '1_2', '1_3', '2_1', '2_2', '3_1', '3_2', '4_1', '4_2', '5_1'];
      planets.forEach((planet) => {
        ranks.forEach((rank) => {
          cards.push(`${planet}_${rank}`);
        });
      });

      cards = _.shuffle(cards);
      const order = _.shuffle(_.keys(players));

      submitTurn(gameId, {type: actions.SHUFFLE_DECK, cards, order});
    }
  }

  renderPlayerList(players) {
    // Add player placeholders for non-existent players
    while (players.length < 5) {
      players.push({avatar: 'spaceman', name: '...'});
    }

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
    const {gameId, players, isFetchingPlayers} = this.props;

    let mainContent;
    if (isFetchingPlayers) {
      mainContent = <Text>Loading...</Text>;
    } else {
      mainContent = this.renderPlayerList(_.values(players));
    }

    return (
      <View style={styles.container}>
        <Link to="/" underlayColor={colors.slate}>
          <Text style={styles.backButtonText}>&lt; Home</Text>
        </Link>
        <View style={styles.innerContainer}>
          <Text style={styles.title}>Lobby</Text>

          <Text style={styles.subtitle}>Room: {gameId}</Text>

          {mainContent}

          <TouchableHighlight
            style={styles.launchButton}
            underlayColor={colors.slate}
            onPress={() => this.startGame()}
          >
            <Text style={styles.launchButtonText}>Start</Text>
          </TouchableHighlight>
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
  launchButton: {
    alignItems: 'center',
    backgroundColor: colors.orange,
    padding: 10,
    margin: 16,
    width: 200,
    height: 60,
    justifyContent: 'center',
  },
  launchButtonText: {
    fontSize: 20,
    color: colors.white,
  },
});
