import React from 'react';
import {StyleSheet, Text, View} from 'react-native';
import {Link} from 'react-router-native';

import colors from '../resources/colors.json';

export default class Title extends React.Component {
  render() {
    return (
      <View style={styles.container}>
        <Text style={styles.title}>Maniquest Questiny</Text>

        <Link to="/new" style={styles.button} underlayColor={colors.slate}>
          <Text style={styles.buttonText}>New Game</Text>
        </Link>

        <Link to="/join" style={styles.button} underlayColor={colors.slate}>
          <Text style={styles.buttonText}>Join Game</Text>
        </Link>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
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
    color: colors.white,
  },
  title: {
    fontSize: 44,
    fontFamily: 'SpaceMonoBold',
    marginBottom: 40,
    textAlign: 'center',
    color: colors.purple,
  },
});
