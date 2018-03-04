import React from 'react';
import thunk from 'redux-thunk';
import {Font} from 'expo';
import {Provider} from 'react-redux';
import {NativeRouter, Route, Link} from 'react-router-native';
import {StyleSheet, Text, View, TouchableHighlight} from 'react-native';
import {combineReducers, compose, createStore, applyMiddleware} from 'redux';
import * as firebase from 'firebase';

import colors from './resources/colors.json';

import Title from './components/Title';
import JoinGame from './components/JoinGame';
import Game from './components/Game';

import LobbyContainer from './containers/LobbyContainer';
import ChooseNameContainer from './containers/ChooseNameContainer';
import NewGameContainer from './containers/NewGameContainer';

// Initialize Firebase
const firebaseConfig = {
  apiKey: 'AIzaSyBFHOr5LKNirHqMyWTvpml0MZxVH3-lYD8',
  authDomain: 'maniquest-questiny.firebaseapp.com',
  databaseURL: 'https://maniquest-questiny.firebaseio.com/',
  storageBucket: '<your-storage-bucket>',
};
firebase.initializeApp(firebaseConfig);

// Reducers
import rootReducers from './reducers.js';

// Middleware
const middleware = [thunk];
if (process.env.NODE_ENV !== 'production') {
  const {logger} = require('redux-logger');
  middleware.push(logger);
}

// Create the Redux store
const store = createStore(combineReducers({...rootReducers}), applyMiddleware(...middleware));

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
      <Provider store={store}>
        <NativeRouter>
          {this.state.fontLoaded && (
            <View style={styles.container}>
              <Route exact path="/" component={Title} />
              <Route path="/new" component={NewGameContainer} />
              <Route path="/join" component={JoinGame} />
              <Route path="/name" component={ChooseNameContainer} />
              <Route path="/lobby/:gameId" component={LobbyContainer} />
              <Route path="/game" component={Game} />
            </View>
          )}
        </NativeRouter>
      </Provider>
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
