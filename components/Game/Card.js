import React from 'react';
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

export default ({rank, planet, selected, hint}) => {
  const planetIconStyles = [styles.planetIcon];
  if (planet === 'saturn') {
    planetIconStyles.push(styles.saturnIcon);
  }

  const planetHinted = hint === 'planet' || hint === 'both';
  const rankHinted = hint === 'rank' || rank === 'both';

  return (
    <View style={[styles.cardContainer, selected && styles.selectedCard]}>
      <Image
        style={[planetIconStyles, planetHinted && styles.planetHinted]}
        source={planetIcons[planet]}
      />
      <Image style={styles.shipIcon} source={shipIcon} />
      <Text style={[styles.cardRank, rankHinted && styles.rankHinted]}>{rank}</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  cardContainer: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  selectedCard: {
    borderRadius: 4,
    borderWidth: 1,
    borderColor: '#d6d7da',
  },
  planetIcon: {
    width: 68,
    height: 68,
  },
  planetHinted: {
    shadowOpacity: 1,
    shadowRadius: 3,
    shadowColor: colors.orange,
    shadowOffset: {height: 0, width: 0},
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
  rankHinted: {
    fontFamily: 'SpaceMonoBold',
    color: colors.orange,
  },
});
