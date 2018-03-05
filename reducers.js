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
  playerId: (state = null, action) => {
    switch (action.type) {
      case actions.SET_PLAYER_ID:
        return action.playerId;
      default:
        return state;
    }
  },
  players: (state = null, action) => {
    switch (action.type) {
      case actions.UPDATE_PLAYERS:
      case actions.SHUFFLE_DECK:
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
        return {...state, [planet]: [...state[planet], action.cardId]};
      case actions.PLAY_CARD:
        if (!action.successful) {
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
};

export default combineReducers({...rootReducers});
