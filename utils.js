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

  switch (turn.type) {
    case actions.PLAY_CARD:
    case actions.DISCARD_CARD:
      // Remove the card being discarded
      extraState.hands[turn.actor] = _.remove(
        extraState.hands[turn.actor],
        (card) => card.cardId !== turn.cardId
      );

      if (extraState.deck.length === 0) {
        turn.deckEmpty = true;
      } else {
        // Get a new card. Don't actually modify the deck here. Let the turn processor do that
        extraState.hands[turn.actor].push({cardId: extraState.deck[0]});
      }

      updatedState['hands'] = extraState.hands;
      break;

    case actions.GIVE_HINT:
      // Enumerate the target hand and add a hint to the hintedCards
      const {targetPlayerId, hintCardIds, hint} = turn;
      extraState.hands[targetPlayerId].forEach((cardInHand) => {
        if (hintCardIds.includes(cardInHand.cardId)) {
          cardInHand.hint = hint;
        }
      });

      updatedState['hands'] = extraState.hands;
      break;

    case actions.SHUFFLE_DECK:
      // Create the initial deck state
      var cardIds = [];
      const planets = ['jupiter', 'mars', 'mercury', 'saturn', 'venus'];
      const ranks = ['1_1', '1_2', '1_3', '2_1', '2_2', '3_1', '3_2', '4_1', '4_2', '5_1'];
      planets.forEach((planet) => {
        ranks.forEach((rank) => {
          cardIds.push(`${planet}_${rank}`);
        });
      });

      // Shuffle the cards and players
      turn.cardIds = _.shuffle(cardIds);
      const shuffledPlayers = _.shuffle(extraState.players);

      // Set the initial hand states and give the players their order
      const hands = {};
      const numCards = Object.keys(extraState.players).length > 2 ? 4 : 5;
      shuffledPlayers.forEach((player, i) => {
        updatedState[`players/${player.id}/order`] = i;
        const cardsForHand = turn.cardIds.splice(0, numCards);
        const thisHand = [];
        cardsForHand.forEach((cardId) => {
          thisHand.push({cardId});
        });

        hands[player.id] = thisHand;
      });

      updatedState['hands'] = hands;
      break;
    default:
      break;
  }

  // Add the turn to the turn stack
  updatedState[`turns/${turnKey}`] = turn;

  return gameRef.update(updatedState).catch((error) => {
    console.log(`Error updating state for game "${gameId}" to Firebase:`, error);
  });
};
