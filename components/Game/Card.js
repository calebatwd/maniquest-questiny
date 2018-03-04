import React, {Component} from 'react';
import {Text, View, Image, StyleSheet} from 'react-native';

import shipIcon from '../../resources/img/ship.png';
import marsIcon from '../../resources/img/planets/mars.png';
import venusIcon from '../../resources/img/planets/venus.png';
import saturnIcon from '../../resources/img/planets/saturn.png';
import jupiterIcon from '../../resources/img/planets/jupiter.png';
import mercuryIcon from '../../resources/img/planets/mercury.png';

import colors from '../../resources/colors.json';

const planetIcons = {
  mars: marsIcon,
  venus: venusIcon,
  saturn: saturnIcon,
  jupiter: jupiterIcon,
  mercury: mercuryIcon,
};

export default ({rank, planet}) => {
  const planetIconStyles = [styles.planetIcon];
  if (planet === 'saturn') {
    planetIconStyles.push(styles.saturnIcon);
  }

  return (
    <View style={styles.cardContainer}>
      <Image style={planetIconStyles} source={planetIcons[planet]} />
      <Image style={styles.shipIcon} source={shipIcon} />
      <Text style={styles.cardRank}>{rank}</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  cardContainer: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  planetIcon: {
    width: 80,
    height: 80,
  },
  saturnIcon: {
    width: 110,
    height: 110,
  },
  shipIcon: {
    width: 50,
    height: 56,
    position: 'absolute',
  },
  cardRank: {
    fontSize: 24,
    top: 34,
    fontFamily: 'SpaceMono',
    position: 'absolute',
  },
});
