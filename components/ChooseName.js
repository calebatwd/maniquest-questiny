import queryString from 'query-string';
import React, {Component} from 'react';
import {Link} from 'react-router-native';
import {StyleSheet, Text, View, TextInput, ScrollView} from 'react-native';

import colors from '../resources/colors.json';

class ChooseName extends Component {
  state = {playerName: ''};

  render() {
    const {from, gameId} = queryString.parse(this.props.location.search);
    const backButtonLinkText = from === 'new' ? 'New Game' : 'Join Game';

    return (
      <View style={styles.container}>
        <Link to={`/${from}`} underlayColor={colors.slate}>
          <Text style={styles.backButtonText}>&lt; {backButtonLinkText}</Text>
        </Link>
        <ScrollView contentContainerStyle={styles.innerContainer}>
          <Text style={styles.title}>What is your name?</Text>
          <TextInput
            style={styles.input}
            returnKeyType="done"
            autoCapitalize="none"
            selectTextOnFocus={true}
            placeholder="e.g. Lunar Larry"
            placeholderTextColor={colors.lightGray}
            onChangeText={(playerName) => this.setState({playerName})}
          />
          <Link to={`/lobby/${gameId}`} style={styles.launchButton} underlayColor={colors.slate}>
            <Text style={styles.launchButtonText}>Launch!</Text>
          </Link>
        </ScrollView>
      </View>
    );
  }
}

export default ChooseName;

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  backButtonText: {
    marginTop: 10,
    fontSize: 24,
    color: colors.orange,
  },
  innerContainer: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  title: {
    fontSize: 24,
    width: 220,
    fontFamily: 'SpaceMono',
    textAlign: 'center',
    color: colors.purple,
    marginBottom: 32,
  },
  input: {
    height: 60,
    width: 300,
    fontSize: 24,
    padding: 10,
    borderColor: colors.slate,
    borderWidth: 1,
    marginBottom: 20,
  },
  launchButton: {
    alignItems: 'center',
    backgroundColor: colors.orange,
    padding: 10,
    margin: 16,
    width: 200,
    height: 60,
    justifyContent: 'center',
  },
  launchButtonText: {
    fontSize: 20,
    color: colors.white,
  },
});
