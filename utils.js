import * as firebase from 'firebase';

import * as actions from './actions';

export const getCard = (card) => {
  const [planet, rank, iter] = card.split('_');
  return {planet, rank, iter};
};

export const submitTurn = (gameId, turn, extraState) => {
  const gameRef = firebase.database().ref(`/games/${gameId}`);

  const addTurnPromise = gameRef
    .child('turns')
    .push(turn)
    .catch((error) => {
      console.log(`Error pushing turn for game "${gameId}" to Firebase:`, error);
    });

  let updatedHands;
  switch (turn.type) {
    case actions.PLAY_CARD:
    case actions.DISCARD_CARD:
      updatedHands = extraState.hands;
      updatedHands[turn.actor].remove(turn.cardId);
      updatedHands[turn.actor].append(extraState.deck.shift());
      break;
    case actions.SHUFFLE_DECK:
      updatedHands = turn.hands;
      break;
    default:
      break;
  }

  let updateHandsPromise = Promise.resolve();
  if (typeof updatedHands !== 'undefined') {
    updateHandsPromise = gameRef
      .child('hands')
      .set(updatedHands)
      .catch((error) => {
        console.log(`Error setting hands for game "${gameId}" to Firebase:`, error);
      });
  }

  if (turn.type === actions.SHUFFLE_DECK) {
  } else if (turn.type === '') return Promise.all([addTurnPromise, updateHandsPromise]);
};
