import React from 'react';
import {Font} from 'expo';
import {Provider} from 'react-redux';
import {StyleSheet, View} from 'react-native';
import {NativeRouter, Route} from 'react-router-native';
import * as firebase from 'firebase';

import colors from './resources/colors.json';

import GameContainer from './containers/GameContainer';
import LobbyContainer from './containers/LobbyContainer';
import NewGameContainer from './containers/NewGameContainer';
import JoinGameContainer from './containers/JoinGameContainer';
import ChooseNameContainer from './containers/ChooseNameContainer';
import TitleContainer from './containers/TitleContainer';

import configureStore from './configureStore';
import GameOutcomeContainer from './containers/GameOutcomeContainer';

// Initialize Firebase
try {
  const firebaseConfig = {
    databaseURL: 'https://maniquest-questiny.firebaseio.com/',
    authDomain: 'maniquest-questiny.firebaseapp.com',
    apiKey: 'AIzaSyBFHOr5LKNirHqMyWTvpml0MZxVH3-lYD8',
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
          <Route exact path="/" component={TitleContainer} />
          <Route path="/new" component={NewGameContainer} />
          <Route path="/join" component={JoinGameContainer} />
          <Route path="/name" component={ChooseNameContainer} />
          <Route path="/lobby" component={LobbyContainer} />
          <Route path="/game" component={GameContainer} />
          <Route path="/end" component={GameOutcomeContainer} />
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
