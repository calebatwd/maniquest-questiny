import React from 'react';
import {Text, View, Image, StyleSheet, TouchableWithoutFeedback} from 'react-native';
import Discards from './Discards';

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

const PlanetScore = ({name, score, discards, showDiscards}) => {
  const planetIconStyles = [styles.planetIcon];
  if (name === 'saturn') {
    planetIconStyles.push(styles.saturnIcon);
  }

  return (
    <View style={styles.planetInformation}>
      <View style={styles.planetContainer}>
        <Image style={planetIconStyles} source={planetIcons[name]} />
        <Text style={styles.planetText}>{score}</Text>
      </View>
      {showDiscards &&
      <Discards discards={discards}/>
      }
    </View>
  );
};

export default class Score extends React.Component {
  constructor(props) {
    super(props);
    this.state = {showDiscards: false}
  }

  toggleDiscards = () => this.setState({ showDiscards: !this.state.showDiscards })

  render(){
    const {scores, discardedCards} = this.props;
    return (
      <TouchableWithoutFeedback style={styles.scoreHightlight} onPress={this.toggleDiscards} >
        <View style={styles.planetsContainer}>
          <PlanetScore name="mars" score={scores.mars} discards={discardedCards.mars} showDiscards={this.state.showDiscards}/>
          <PlanetScore name="venus" score={scores.venus} discards={discardedCards.venus} showDiscards={this.state.showDiscards}/>
          <PlanetScore name="saturn" score={scores.saturn} discards={discardedCards.saturn} showDiscards={this.state.showDiscards}/>
          <PlanetScore name="jupiter" score={scores.jupiter} discards={discardedCards.jupiter} showDiscards={this.state.showDiscards}/>
          <PlanetScore name="mercury" score={scores.mercury} discards={discardedCards.mercury} showDiscards={this.state.showDiscards}/>
        </View>
      </TouchableWithoutFeedback>
    );
  }
}

const styles = StyleSheet.create({
  scoreHightlight:{
    flex: 1,
    marginRight: 12,
  },
  planetsContainer: {
    flex: 1,
    flexDirection: 'row',
    borderColor: 'blue',
  },
  planetInformation:{
    flex: 1
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
