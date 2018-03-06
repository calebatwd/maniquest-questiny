import * as firebase from 'firebase';
import _ from 'lodash';

import * as actions from './actions';

export const getCard = (card) => {
  const [planet, rank, iter] = card.split('_');
  return {planet, rank, iter};
};

export const getRandomString = (length) => {
  let chars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ';
  let result = '';
  for (let i = 0; i < length; i++) {
    const randomIndex = Math.floor(Math.random() * chars.length);
    result += chars[randomIndex];
  }
  return result;
};

export const submitTurn = (gameId, turn, extraState) => {
  const gameRef = firebase.database().ref(`/games/${gameId}`);
  const turnKey = gameRef.push().key;

  let updatedState = {};

  if (turn.type === actions.SHUFFLE_DECK) {
    var cardIds = [];
    const planets = ['jupiter', 'mars', 'mercury', 'saturn', 'venus'];
    const ranks = ['1_1', '1_2', '1_3', '2_1', '2_2', '3_1', '3_2', '4_1', '4_2', '5_1'];
    planets.forEach((planet) => {
      ranks.forEach((rank) => {
        cardIds.push(`${planet}_${rank}`);
      });
    });

    turn.cardIds = _.shuffle(cardIds);
    const shuffledPlayers = _.shuffle(extraState.players);

    extraState.hands = {};
    const numCards = Object.keys(extraState.players).length > 2 ? 4 : 5;
    shuffledPlayers.forEach((player, i) => {
      updatedState[`players/${player.id}/order`] = i;
      const cardsForHand = turn.cardIds.splice(0, numCards);

      const thisHand = [];
      cardsForHand.forEach((cardId) => {
        thisHand.push({cardId});
      });

      extraState.hands[player.id] = thisHand;
    });
  }

  updatedState[`turns/${turnKey}`] = turn;

  switch (turn.type) {
    case actions.PLAY_CARD:
    case actions.DISCARD_CARD:
      let newHands = extraState.hands;
      newHands[turn.actor] = _.remove(newHands[turn.actor], (card) => card.cardId !== turn.cardId);
      newHands[turn.actor].push({cardId: extraState.deck.shift()});
      updatedState['hands'] = newHands;
      break;
    case actions.GIVE_HINT:
      const {targetPlayerId, cardIds, hint} = turn;
      extraState.hands[targetPlayerId].forEach((cardInHand) => {
        if (cardIds.includes(cardInHand.cardId)) {
          cardInHand.hint = hint;
        }
      });

      updatedState['hands'] = extraState.hands;
      break;
    case actions.SHUFFLE_DECK:
      updatedState['hands'] = extraState.hands;
      break;
    default:
      break;
  }

  return gameRef.update(updatedState).catch((error) => {
    console.log(`Error updating state for game "${gameId}" to Firebase:`, error);
  });
};
