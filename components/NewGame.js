import React, {Component} from 'react';
import {StyleSheet, Text, View} from 'react-native';
import {Link} from 'react-router-native';

import colors from '../resources/colors.json';

class NewGame extends Component {
  render() {
    return (
      <View style={styles.container}>
        <Link to="/" style={styles.button} underlayColor={colors.slate}>
          <Text style={styles.buttonText}>Back</Text>
        </Link>
        <Text style={styles.title}>New Game</Text>
      </View>
    );
  }
}

export default NewGame;

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
