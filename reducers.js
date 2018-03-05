import {combineReducers} from 'redux';

import * as actions from './actions';
import {getCard} from './utils';

const initialDiscardedCardIds = {
  saturn: [],
  mars: [],
  venus: [],
  jupiter: [],
  mercury: [],
};

const initialScores = {
  saturn: 0,
  mars: 0,
  venus: 0,
  jupiter: 0,
  mercury: 0,
};

const rootReducers = {
  gameId: (state = null, action) => {
    switch (action.type) {
      case actions.SET_GAME_ID:
        return action.gameId;
      default:
        return state;
    }
  },
  loggedInPlayerId: (state = null, action) => {
    switch (action.type) {
      case actions.SET_LOGGED_IN_PLAYER_ID:
        return action.loggedInPlayerId;
      default:
        return state;
    }
  },
  players: (state = null, action) => {
    switch (action.type) {
      case actions.UPDATE_PLAYERS:
        return action.players;
      default:
        return state;
    }
  },
  isFetchingPlayers: (state = false, action) => {
    switch (action.type) {
      case actions.FETCH_PLAYERS:
        return true;
      case actions.UPDATE_PLAYERS:
        return action.game === null;
      default:
        return state;
    }
  },
  crashesRemaining: (state = 3, action) => {
    switch (action.type) {
      case actions.PLAY_CARD:
        return action.successful ? state : state - 1;
      default:
        return state;
    }
  },
  hintsRemaining: (state = 8, action) => {
    switch (action.type) {
      case actions.GIVE_HINT:
        return Math.max(0, state - 1);
      case actions.DISCARD_CARD:
        return Math.min(8, state + 1);
      case actions.PLAY_CARD:
        const card = getCard(action.cardId);
        return action.successful && card.rank === '5' ? Math.min(8, state + 1) : state;
      default:
        return state;
    }
  },
  discardedCards: (state = initialDiscardedCardIds, action) => {
    switch (action.type) {
      case actions.DISCARD_CARD:
        const {planet} = getCard(action.cardId);
        return {...state, [planet]: [...state[planet], action.cardId]};
      case actions.PLAY_CARD:
        if (!action.successful) {
          const {planet} = getCard(action.cardId);
          return {...state, [planet]: [...state[planet], action.cardId]};
        } else {
          return state;
        }
      default:
        return state;
    }
  },
  scores: (state = initialScores, action) => {
    switch (action.type) {
      case actions.PLAY_CARD:
        if (action.successful) {
          const {planet} = getCard(action.cardId);
          return {...state, [planet]: state[planet] + 1};
        } else {
          return state;
        }
      default:
        return state;
    }
  },
  hands: (state = {}, action) => {
    switch (action.type) {
      case actions.UPDATE_HANDS:
        return action.hands;
      default:
        return state;
    }
  },
  turnIndex: (state = 0, action) => {
    switch (action.type) {
      case actions.GIVE_HINT:
      case actions.DISCARD_CARD:
      case actions.PLAY_CARD:
        return state + 1;
      default:
        return state;
    }
  },
  deck: (state = [], action) => {
    switch (action.type) {
      case actions.SHUFFLE_DECK:
        return action.cardIds;
      case actions.PLAY_CARD:
      case actions.DISCARD_CARD:
        // Remove the first card
        return state.filter((cardId, i) => i !== 0);
      default:
        return state;
    }
  },
  selectedCardToPlay: (state = null, action) => {
    switch (action.type) {
      case actions.SELECT_CARD_TO_PLAY:
        return action.cardToPlay !== state ? action.cardToPlay : null;
      case actions.SELECT_HINT:
      case actions.GIVE_HINT:
      case actions.PLAY_CARD:
      case actions.DISCARD_CARD:
        return null;
      default:
        return state;
    }
  },
  selectedHint: (state = {cardIds: []}, action) => {
    switch (action.type) {
      case actions.SELECT_HINT:
        const {selectedHint} = action;
        if (selectedHint.playerId !== state.player) {
          // This new hint isn't intended for the previously targeted player
          return {playerId: selectedHint.playerId, cardIds: [selectedHint.cardId]};
        } else if (state.cardIds.includes(selectedHint.cardId)) {
          // This new hint is for the targeted player, but it's the same card so toggle it
          return {
            playerId: selectedHint.playerId,
            cardIds: state.cardIds.filter((c) => c !== selectedHint.cardId),
          };
        } else {
          // This new hint is for the targeted player and is a new card to show
          return {
            playerId: selectedHint.playerId,
            cardIds: [...state.cards, selectedHint.cardId],
          };
        }
      case actions.SELECT_CARD_TO_PLAY:
      case actions.GIVE_HINT:
      case actions.PLAY_CARD:
      case actions.DISCARD_CARD:
        return {cardIds: []};
      default:
        return state;
    }
  },
};

export default combineReducers({...rootReducers});
