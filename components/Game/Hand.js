import React, {Component} from 'react';
import {Text, View, StyleSheet} from 'react-native';

export default class Hand extends Component {
  render() {
    return (
      <View style={styles.container}>
        <Text>Hand</Text>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    height: 140,
    borderWidth: 1,
    borderColor: 'blue',
  },
});
