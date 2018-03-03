import React, {Component} from 'react';
import {StyleSheet, Text, View, TextInput, ScrollView} from 'react-native';
import {Link} from 'react-router-native';

import colors from '../resources/colors.json';

class NewGame extends Component {
  state = {text: ''};

  render() {
    return (
      <View style={styles.container}>
        <Link to="/" underlayColor={colors.slate}>
          <Text style={styles.backButtonText}>&lt; Home</Text>
        </Link>
        <ScrollView contentContainerStyle={styles.innerContainer}>
          <Text style={styles.title}>What would you like to name your game?</Text>
          <TextInput
            style={styles.input}
            returnKeyType="done"
            autoCapitalize="none"
            selectTextOnFocus={true}
            placeholder="e.g. mars-rover"
            placeholderTextColor="#DCDCDC"
            onChangeText={(text) => this.setState({text})}
          />
          <Link to="/name" style={styles.newButton} underlayColor={colors.slate}>
            <Text style={styles.newButtonText}>Create</Text>
          </Link>
        </ScrollView>
      </View>
    );
  }
}

export default NewGame;

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
  newButton: {
    alignItems: 'center',
    backgroundColor: colors.orange,
    padding: 10,
    margin: 16,
    width: 200,
    height: 60,
    justifyContent: 'center',
  },
  newButtonText: {
    fontSize: 20,
    color: colors.white,
  },
});
