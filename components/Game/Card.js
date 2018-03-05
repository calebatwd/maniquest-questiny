import React from 'react';
import {Text, View, Image, StyleSheet} from 'react-native';

import shipIcon from '../../resources/img/ship.png';
import marsIcon from '../../resources/img/planets/mars.png';
import venusIcon from '../../resources/img/planets/venus.png';
import saturnIcon from '../../resources/img/planets/saturn.png';
import jupiterIcon from '../../resources/img/planets/jupiter.png';
import mercuryIcon from '../../resources/img/planets/mercury.png';

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
    width: 68,
    height: 68,
  },
  saturnIcon: {
    width: 98,
    height: 98,
  },
  shipIcon: {
    width: 44,
    height: 50,
    position: 'absolute',
  },
  cardRank: {
    fontSize: 20,
    fontFamily: 'SpaceMono',
    position: 'absolute',
  },
});
