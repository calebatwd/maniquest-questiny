import React, {Component} from 'react';
import {Text, View, Image, StyleSheet} from 'react-native';

import marsIcon from '../../../resources/img/planets/mars.png';
import venusIcon from '../../../resources/img/planets/venus.png';
import saturnIcon from '../../../resources/img/planets/saturn.png';
import jupiterIcon from '../../../resources/img/planets/jupiter.png';
import mercuryIcon from '../../../resources/img/planets/mercury.png';

import colors from '../../../resources/colors.json';

const planetIcons = {
  mars: marsIcon,
  venus: venusIcon,
  saturn: saturnIcon,
  jupiter: jupiterIcon,
  mercury: mercuryIcon,
};

const PlanetScore = ({name, score}) => {
  const planetIconStyles = [styles.planetIcon];
  if (name === 'saturn') {
    planetIconStyles.push(styles.saturnIcon);
  }

  return (
    <View style={styles.planetContainer}>
      <Image style={planetIconStyles} source={planetIcons[name]} />
      <Text style={styles.planetText}>{score}</Text>
    </View>
  );
};

export default ({scores}) => (
  <View style={styles.planetsContainer}>
    <PlanetScore name="mars" score={scores.mars} />
    <PlanetScore name="venus" score={scores.venus} />
    <PlanetScore name="saturn" score={scores.saturn} />
    <PlanetScore name="jupiter" score={scores.jupiter} />
    <PlanetScore name="mercury" score={scores.mercury} />
  </View>
);

const styles = StyleSheet.create({
  planetsContainer: {
    flex: 1,
    marginRight: 12,
    flexDirection: 'row',
    borderColor: 'blue',
  },
  planetContainer: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  planetIcon: {
    width: 32,
    height: 32,
  },
  saturnIcon: {
    width: 44,
    height: 44,
  },
  planetText: {
    fontSize: 20,
    color: colors.slate,
    fontFamily: 'SpaceMono',
    position: 'absolute',
  },
});
