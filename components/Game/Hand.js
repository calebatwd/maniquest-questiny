import _ from 'lodash';
import color from 'color';
import * as firebase from 'firebase';
import React, {Component} from 'react';
import {Text, View, Image, StyleSheet} from 'react-native';
import SortableGrid from 'react-native-sortable-grid';
import * as Animatable from 'react-native-animatable';

import shipIcon from '../../resources/img/ship.png';
import spacemanIcon from '../../resources/img/spaceman.png';

import marsIcon from '../../resources/img/planets/mars.png';
import venusIcon from '../../resources/img/planets/venus.png';
import saturnIcon from '../../resources/img/planets/saturn.png';
import jupiterIcon from '../../resources/img/planets/jupiter.png';
import mercuryIcon from '../../resources/img/planets/mercury.png';

import colors from '../../resources/colors.json';

import {getCard} from '../../utils';

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
  state = {
    selectedCardIds: [],
  };

  toggleCardSelected(cardId) {
    let {selectedCardIds} = this.state;
    if (_.includes(selectedCardIds, cardId)) {
      selectedCardIds = selectedCardIds.filter((id) => id !== cardId);
    } else {
      selectedCardIds.push(cardId);
    }

    this.setState({
      selectedCardIds,
    });
  }

  updateHandOrder({itemOrder}) {
    const {gameId, player, hand} = this.props;

    const updatedHand = _.map(itemOrder, (obj) => obj.key);

    const newHand = [];
    updatedHand.forEach((orderedCardId) => {
      newHand.push(_.find(hand, ['cardId', orderedCardId]));
    });

    firebase
      .database()
      .ref(`games/${gameId}/hands/${player.id}`)
      .set(newHand)
      .catch((error) => {
        console.log(
          `Error re-ordering hand order for logged-in player for game "${gameId}" in Firebase:`,
          error
        );
      });
  }

  render() {
    const {selectedCardIds} = this.state;
    const {hand, player, turnPlayerId, selectedCardToPlay, selectCardToPlay} = this.props;
    const {name, avatar} = player;

    const myTurn = player.id === turnPlayerId;

    const cardsContent = _.map(hand, ({cardId, hint}, i) => {
      const {rank, planet} = getCard(cardId);
      let hintContent;
      if (hint === 'planet') {
        hintContent = (
          <Image style={[styles.hintIcon, styles.shadow]} source={planetIcons[planet]} />
        );
      } else if (hint === 'rank') {
        hintContent = (
          <View style={styles.hintTextContainer}>
            <Text style={styles.hintText}>{rank}</Text>
          </View>
        );
      } else if (hint === 'both') {
        hintContent = (
          <View style={styles.hintContainerBoth}>
            <Image style={[styles.hintIconBoth, styles.shadow]} source={planetIcons[planet]} />
            <Text style={styles.hintTextBoth}>{rank}</Text>
          </View>
        );
      }

      const isCardSelected = selectedCardToPlay === cardId; // _.includes(selectedCardIds, cardId);
      const shipBounceAnimation = {
        0: {
          translateY: 0,
        },
        0.5: {
          translateY: -20,
        },
        1: {
          translateY: 0,
        },
      };

      return (
        <Animatable.View
          animation={isCardSelected ? shipBounceAnimation : undefined}
          delay={0}
          duration={2000}
          direction="alternate"
          easing="ease-in-out"
          iterationCount="infinite"
          onTap={() => selectCardToPlay(cardId)}
          key={cardId}
        >
          {hintContent}
          <Image style={styles.shipIcon} source={shipIcon} />
        </Animatable.View>
      );
    });

    return (
      <View style={styles.playerContainer}>
        <View style={styles.nameAvatarContainer}>
          <Image style={styles.avatar} source={avatars[avatar]} />
          <Text style={[styles.name, myTurn && styles.nameHighlight]}>{name}</Text>
        </View>
        <SortableGrid
          itemsPerRow={5}
          dragActivationTreshold={200}
          onDragRelease={this.updateHandOrder.bind(this)}
        >
          {cardsContent}
        </SortableGrid>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  playerContainer: {
    marginBottom: 10,
    height: 144,
  },
  nameAvatarContainer: {
    marginTop: 6,
    marginLeft: 12,
    marginBottom: 12,
    flexDirection: 'row',
  },
  name: {
    fontSize: 28,
    fontFamily: 'SpaceMonoBold',
  },
  nameHighlight: {
    color: colors.purple,
  },
  avatar: {
    width: 48,
    height: 40,
    marginRight: 12,
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
  commandContainer: {
    position: 'absolute',
    bottom: 150,
    alignSelf: 'center',
  },
  shadow: {
    shadowOpacity: 1,
    shadowRadius: 3,
    shadowColor: colors.orange,
    shadowOffset: {height: 0, width: 0},
  },
});
