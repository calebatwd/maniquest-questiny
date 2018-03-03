import React from 'react';
import {Font} from 'expo';
import {StyleSheet, Text, View, TouchableHighlight} from 'react-native';

import * as firebase from 'firebase';

import colors from './resources/colors.json';

// Initialize Firebase
const firebaseConfig = {
  apiKey: 'AIzaSyBFHOr5LKNirHqMyWTvpml0MZxVH3-lYD8',
  authDomain: 'maniquest-questiny.firebaseapp.com',
  databaseURL: 'https://maniquest-questiny.firebaseio.com/',
  storageBucket: '<your-storage-bucket>',
};
const firebaseApp = firebase.initializeApp(firebaseConfig);

export default class App extends React.Component {
  state = {
    fontLoaded: false,
  };

  async componentDidMount() {
    await Font.loadAsync({
      SpaceMono: require('./resources/fonts/SpaceMono-Regular.ttf'),
      SpaceMonoBold: require('./resources/fonts/SpaceMono-Bold.ttf'),
      SpaceMonoItalic: require('./resources/fonts/SpaceMono-Italic.ttf'),
      SpaceMonoBoldItalic: require('./resources/fonts/SpaceMono-BoldItalic.ttf'),
    });

    this.setState({fontLoaded: true});
  }

  render() {
    return (
      <View style={styles.container}>
        {this.state.fontLoaded && <Text style={styles.title}>Maniquest Questiny</Text>}

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
    fontSize: 44,
    fontFamily: 'SpaceMonoBold',
    marginBottom: 40,
    textAlign: 'center',
    color: colors.purple,
  },
});
