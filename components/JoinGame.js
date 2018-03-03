import React, {Component} from 'react';
import {StyleSheet, Text, View} from 'react-native';
import {Link} from 'react-router-native';

import colors from '../resources/colors.json';

class JoinGame extends Component {
  render() {
    return (
      <View style={styles.container}>
        <Link to="/" style={styles.button} underlayColor={colors.slate}>
          <Text style={styles.buttonText}>Back</Text>
        </Link>
        <Text style={styles.title}>Join Game</Text>
      </View>
    );
  }
}

export default JoinGame;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
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
