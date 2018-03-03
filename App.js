import React from 'react';
import 
import {StyleSheet, Text, View, TouchableHighlight} from 'react-native';

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
          color="#841584"
        >
          <Text>New Game</Text>
        </TouchableHighlight>
        <TouchableHighlight
          style={styles.button}
          onPress={() => {
            console.log('Join game pressed');
          }}
          color="#841584"
        >
          <Text>Join Game</Text>
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
    backgroundColor: '#DDDDDD',
    padding: 10,
    margin: 10,
    width: 200,
    height: 60,
    justifyContent: 'center',
  },
  title: {
    fontSize: 32,
    marginBottom: 60,
  },
});
