import React, {Component} from 'react';
import {withRouter} from 'react-router';
import {Link} from 'react-router-native';
import {StyleSheet, Text, View, TextInput, ScrollView, TouchableHighlight} from 'react-native';

import colors from '../resources/colors.json';

class JoinGame extends Component {
  state = {gameId: ''};

  joinGame() {
    const {gameId} = this.state;
    const {history, setGameId} = this.props;

    // TODO: verify the game ID exists in Firebase

    if (gameId === '') {
      // TODO: display an error if the game ID is empty or invalid
      console.log('No game ID provided on join game screen...');
    } else {
      setGameId(gameId);

      history.push({
        pathname: '/name',
        search: `?from=${this.props.match.path.slice(1)}&gameId=${gameId}`,
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
          <Text style={styles.title}>What game would you like to join?</Text>
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
            style={styles.joinButton}
            onPress={() => this.joinGame()}
            underlayColor={colors.slate}
          >
            <Text style={styles.joinButtonText}>Join Game</Text>
          </TouchableHighlight>
        </ScrollView>
      </View>
    );
  }
}

export default withRouter(JoinGame);

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
  joinButton: {
    alignItems: 'center',
    backgroundColor: colors.orange,
    padding: 10,
    margin: 16,
    width: 200,
    height: 60,
    justifyContent: 'center',
  },
  joinButtonText: {
    fontSize: 20,
    color: colors.white,
  },
});
