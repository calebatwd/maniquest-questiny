import React from 'react';
import {Font} from 'expo';
import {StyleSheet, Text, View, TouchableHighlight} from 'react-native';
import {NativeRouter, Route, Link} from 'react-router-native';
import * as firebase from 'firebase';

import colors from './resources/colors.json';

import Title from './components/Title';
import NewGame from './components/NewGame';
import JoinGame from './components/JoinGame';

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
      <NativeRouter>
        {this.state.fontLoaded && (
          <View style={styles.container}>
            <Route exact path="/" component={Title} />
            <Route path="/new" component={NewGame} />
            <Route path="/join" component={JoinGame} />
          </View>
        )}
      </NativeRouter>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    marginTop: 22,
    paddingHorizontal: 10,
    backgroundColor: colors.white,
  },
});
