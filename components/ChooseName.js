import firebase from 'firebase';
import queryString from 'query-string';
import React, {Component} from 'react';
import {withRouter} from 'react-router';
import {Link} from 'react-router-native';
import {StyleSheet, Text, View, TextInput, ScrollView, TouchableHighlight} from 'react-native';

import colors from '../resources/colors.json';

class ChooseName extends Component {
  state = {playerName: ''};

  constructor(props) {
    super(props);

    const {from, gameId} = queryString.parse(props.location.search);
    this.from = from;
    this.gameId = gameId;
  }

  addPlayer() {
    const {history} = this.props;
    const {playerName} = this.state;

    if (playerName === '') {
      // TODO: display an error if the player name is empty or invalid
      console.log('No player name provided on choose name screen...');
    } else {
      firebase
        .database()
        .ref(`games/${this.gameId}/players`)
        .push({
          name: playerName.trim(),
          avatar: 'spaceman',
        })
        .then((snapshot) => {
          history.push({
            pathname: `/lobby/${this.gameId}`,
            search: `?playerId=${snapshot.key}}`,
          });
        })
        .catch((error) => {
          console.log(`Error creating new game with ID "${error}":`, error);
        });
    }
  }

  render() {
    const backButtonLinkText = this.from === 'new' ? 'New Game' : 'Join Game';

    return (
      <View style={styles.container}>
        <Link to={`/${this.from}`} underlayColor={colors.slate}>
          <Text style={styles.backButtonText}>&lt; {backButtonLinkText}</Text>
        </Link>
        <ScrollView contentContainerStyle={styles.innerContainer}>
          <Text style={styles.title}>What is your name?</Text>
          <TextInput
            style={styles.input}
            returnKeyType="done"
            autoCapitalize="none"
            selectTextOnFocus={true}
            placeholder="e.g. Lunar Larry"
            placeholderTextColor={colors.lightGray}
            onChangeText={(playerName) => this.setState({playerName})}
          />
          <TouchableHighlight
            onPress={() => this.addPlayer()}
            style={styles.launchButton}
            underlayColor={colors.slate}
          >
            <Text style={styles.launchButtonText}>Launch!</Text>
          </TouchableHighlight>
        </ScrollView>
      </View>
    );
  }
}

export default withRouter(ChooseName);

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
