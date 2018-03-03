import React from 'react';
import 
import {StyleSheet, Text, View, TouchableHighlight} from 'react-native';

import colors from './resources/colors.json';

export default class App extends React.Component {
  render() {
    return (
      <View style={styles.container}>
        <Text style={styles.title}>Maniquest Questiny</Text>

        <TouchableHighlight
          style={styles.button}
          onPress={() => {
            console.log('New game pressed');
          }}
          underlayColor={colors.slate}
        >
          <Text style={styles.buttonText}>New Game</Text>
        </TouchableHighlight>

        <TouchableHighlight
          style={styles.button}
          onPress={() => {
            console.log('Join game pressed');
          }}
          underlayColor={colors.slate}
        >
          <Text style={styles.buttonText}>Join Game</Text>
        </TouchableHighlight>
      </View>
    );
  }
}

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
    fontSize: 48,
    marginBottom: 40,
    fontWeight: 'bold',
    textAlign: 'center',
    color: colors.purple,
  },
});
