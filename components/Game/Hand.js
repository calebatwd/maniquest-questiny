import _ from 'lodash';
import color from 'color';
import React, {Component} from 'react';
import {
  Text,
  View,
  Image,
  StyleSheet,
  TouchableWithoutFeedback,
  TouchableHighlight,
} from 'react-native';
import * as Animatable from 'react-native-animatable';

import shipIcon from '../../resources/img/ship.png';
import spacemanIcon from '../../resources/img/spaceman.png';

import marsIcon from '../../resources/img/planets/mars.png';
import venusIcon from '../../resources/img/planets/venus.png';
import saturnIcon from '../../resources/img/planets/saturn.png';
import jupiterIcon from '../../resources/img/planets/jupiter.png';
import mercuryIcon from '../../resources/img/planets/mercury.png';

import colors from '../../resources/colors.json';

const avatars = {
  spaceman: spacemanIcon,
};

const planetIcons = {
  mars: marsIcon,
  venus: venusIcon,
  saturn: saturnIcon,
  jupiter: jupiterIcon,
  mercury: mercuryIcon,
};

export default class Hand extends Component {
  state = {};

  toggleSelect(card) {
    if (this.state.selectedCard === card) {
      this.setState({selectedCard: null});
    } else {
      this.setState({selectedCard: card});
    }
  }

  render() {
    const {hand, player, currentPlayerId, discardCard, playCard} = this.props;
    const {name, avatar} = player;

    const myTurn = player.id === currentPlayerId;

    const cardsContent = _.map(hand, (card, i) => {
      const {rank, planet, hint} = card;
      let hintContent;
      if (hint === 'planet') {
        hintContent = <Image style={styles.hintIcon} source={planetIcons[planet]} />;
      } else if (hint === 'rank') {
        hintContent = (
          <View style={styles.hintTextContainer}>
            <Text style={styles.hintText}>{rank}</Text>
          </View>
        );
      } else if (hint === 'both') {
        hintContent = (
          <View style={styles.hintContainerBoth}>
            <Image style={styles.hintIconBoth} source={planetIcons[planet]} />
            <Text style={styles.hintTextBoth}>{rank}</Text>
          </View>
        );
      }

      return (
        <Animatable.View
          animation={this.state.selectedCard === card ? 'slideInDown' : undefined}
          easing="linear"
          iterationCount="infinite"
          direction="alternate"
          duration={2000}
          style={styles.shipContainer}
          key={i}
        >
          {hintContent}
          <TouchableWithoutFeedback onPress={() => this.toggleSelect(card)}>
            <Image style={styles.shipIcon} source={shipIcon} />
          </TouchableWithoutFeedback>
        </Animatable.View>
      );
    });

    const commandView = (
      <View>
        <TouchableHighlight
          style={styles.button}
          onPress={() => discardCard(this.state.selectedCard, currentPlayerId)}
        >
          <Text style={styles.buttonText}>Scuttle</Text>
        </TouchableHighlight>
        <TouchableHighlight
          style={styles.button}
          onPress={() => playCard(this.state.selectedCard, currentPlayerId)}
        >
          <Text style={styles.buttonText}>Launch</Text>
        </TouchableHighlight>
      </View>
    );

    return (
      <View style={styles.playerContainer}>
        {this.state.selectedCard && myTurn && commandView}
        <View style={styles.nameAvatarContainer}>
          <Image style={styles.avatar} source={avatars[avatar]} />
          <Text style={[styles.name, myTurn && styles.nameHighlight]}>{name}</Text>
        </View>
        <View style={styles.cardsContainer}>{cardsContent}</View>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  playerContainer: {
    backgroundColor: color(colors.slate).fade(0.5),
    marginBottom: 10,
  },
  nameAvatarContainer: {
    marginTop: 6,
    marginLeft: 12,
    flexDirection: 'row',
  },
  name: {
    fontSize: 28,
    fontFamily: 'SpaceMonoBold',
  },
  nameHighlight: {
    color: 'red',
  },
  avatar: {
    width: 48,
    height: 40,
    marginRight: 12,
  },
  cardsContainer: {
    height: 100,
    flexDirection: 'row',
    alignItems: 'center',
  },
  shipContainer: {
    flex: 1,
    alignItems: 'center',
  },
  shipIcon: {
    width: 60,
    height: 80,
  },
  hintIcon: {
    position: 'absolute',
    top: -12,
    right: 4,
    width: 40,
    height: 40,
  },
  hintTextContainer: {
    position: 'absolute',
    top: -9,
    right: 10,
    width: 34,
    height: 34,
    borderColor: color(colors.purple).darken(0.2),
    borderWidth: 3,
    borderRadius: 20,
    backgroundColor: colors.purple,
    alignItems: 'center',
    justifyContent: 'center',
  },
  hintText: {
    fontSize: 24,
    color: colors.white,
    fontFamily: 'SpaceMonoBold',
  },
  hintContainerBoth: {
    position: 'absolute',
    right: 4,
    top: -12,
  },
  hintIconBoth: {
    width: 40,
    height: 40,
  },
  hintTextBoth: {
    position: 'absolute',
    top: 1,
    right: 12,
    fontSize: 24,
    color: colors.white,
    fontFamily: 'SpaceMonoBold',
  },
  button: {
    alignItems: 'center',
    backgroundColor: colors.orange,
    padding: 10,
    margin: 16,
    width: 200,
    height: 60,
    justifyContent: 'center',
  },
  buttonText: {
    fontSize: 20,
    color: colors.white,
  },
});
