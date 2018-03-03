import React, {Component} from 'react';
import {StyleSheet, Text, View} from 'react-native';
import {Link} from 'react-router-native';

import colors from '../resources/colors.json';

class JoinGame extends Component {
  state = {gameId: ''};
  render() {
    return (
      <View style={styles.container}>
        <Link to="/" style={styles.button} underlayColor={colors.slate}>
          <Text style={styles.buttonText}>Back</Text>
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
          <Link
            to={`/name?from=${this.props.match.path.slice(1)}&gameId=${this.state.gameId}`}
            style={styles.joinButton}
            underlayColor={colors.slate}
          >
            <Text style={styles.joinButtonText}>Join Game</Text>
          </Link>
        </ScrollView>
      </View>
    );
  }
}

export default JoinGame;

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
    marginBottom: 40,
    textAlign: 'center',
    color: colors.purple,
  },
});
