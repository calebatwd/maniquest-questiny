import * as firebase from 'firebase';
import React, {Component} from 'react';
import {withRouter} from 'react-router';
import {Link} from 'react-router-native';
import {StyleSheet, Text, View, TextInput, ScrollView, TouchableHighlight} from 'react-native';

import colors from '../resources/colors.json';

class NewGame extends Component {
  state = {gameId: ''};

  createGame() {
    const {gameId} = this.state;
    const {history, setGameId} = this.props;

    if (gameId === '') {
      // TODO: display an error if the game ID is empty or invalid
      console.log('No game ID provided on new game screen...');
    } else {
      firebase
        .database()
        .ref(`games/${gameId}`)
        .set({exists: true})
        .then(() => {
          setGameId(gameId);
          history.push({
            pathname: '/name',
            search: `?from=${this.props.match.path.slice(1)}`,
          });
        })
        .catch((error) => {
          console.log(`Error creating new game with ID "${error}":`, error);
        });
    }
  }

  render() {
    return (
      <View style={styles.container}>
        <Link to="/" underlayColor={colors.slate}>
          <Text style={styles.backButtonText}>&lt; Home</Text>
        </Link>
        <ScrollView contentContainerStyle={styles.innerContainer}>
          <Text style={styles.title}>What would you like to name your game?</Text>
          <TextInput
            style={styles.input}
            returnKeyType="done"
            autoCapitalize="none"
            selectTextOnFocus={true}
            placeholder="e.g. mars-rover"
            placeholderTextColor={colors.lightGray}
            onChangeText={(gameId) => this.setState({gameId: gameId.trim()})}
          />
          <TouchableHighlight
            style={styles.newButton}
            underlayColor={colors.slate}
            onPress={() => this.createGame()}
          >
            <Text style={styles.newButtonText}>Create Game</Text>
          </TouchableHighlight>
        </ScrollView>
      </View>
    );
  }
}

export default withRouter(NewGame);

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
    fontSize: 24,
    width: 220,
    fontFamily: 'SpaceMono',
    textAlign: 'center',
    color: colors.purple,
    marginBottom: 32,
  },
  input: {
    height: 60,
    width: 300,
    fontSize: 24,
    padding: 10,
    borderColor: colors.slate,
    borderWidth: 1,
    marginBottom: 20,
  },
  newButton: {
    alignItems: 'center',
    backgroundColor: colors.orange,
    padding: 10,
    margin: 16,
    width: 200,
    height: 60,
    justifyContent: 'center',
  },
  newButtonText: {
    fontSize: 20,
    color: colors.white,
  },
});
