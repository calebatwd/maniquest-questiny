import React from 'react';
import {Font} from 'expo';
import {Provider} from 'react-redux';
import {NativeRouter, Route, Link} from 'react-router-native';
import {StyleSheet, Text, View, TouchableHighlight} from 'react-native';
import * as firebase from 'firebase';

import colors from './resources/colors.json';

import Title from './components/Title';
import JoinGame from './components/JoinGame';

import GameContainer from './containers/GameContainer';
import LobbyContainer from './containers/LobbyContainer';
import NewGameContainer from './containers/NewGameContainer';
import ChooseNameContainer from './containers/ChooseNameContainer';

import configureStore from './configureStore';

// Initialize Firebase
try {
  const firebaseConfig = {
    databaseURL: 'https://maniquest-questiny.firebaseio.com/',
  };
  firebase.initializeApp(firebaseConfig);
} catch (error) {
  if (error.code !== 'app/duplicate-app') {
    console.log('Error initializing Firebase:', error);
  }
}

class App extends React.Component {
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
    if (!this.state.fontLoaded) {
      return null;
    }

    return (
      <NativeRouter>
        <View style={styles.container}>
          <Route exact path="/" component={Title} />
          <Route path="/new" component={NewGameContainer} />
          <Route path="/join" component={JoinGame} />
          <Route path="/name" component={ChooseNameContainer} />
          <Route path="/lobby/:gameId" component={LobbyContainer} />
          <Route path="/game" component={GameContainer} />
        </View>
      </NativeRouter>
    );
  }
}

// Create the Redux store
const store = configureStore();

export default () => {
  return (
    <Provider store={store}>
      <App />
    </Provider>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    marginTop: 22,
    paddingHorizontal: 10,
    backgroundColor: colors.white,
  },
});
