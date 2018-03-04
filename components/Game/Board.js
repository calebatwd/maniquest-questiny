import React, {Component} from 'react';
import {Text, View, StyleSheet} from 'react-native';

export default class Board extends Component {
  render() {
    return (
      <View style={styles.container}>
        <Text>Board</Text>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    borderWidth: 1,
    borderColor: 'red',
  },
});
