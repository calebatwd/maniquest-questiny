import {combineReducers} from 'redux';

import * as actions from './actions';
import {getCard} from './utils';

const initialDiscardedCards = {
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
      case actions.FETCH_PLAYERS:
        return state;
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
        return state - 1;
      case actions.DISCARD_CARD:
        return state + 1;
      case actions.PLAY_CARD:
        const card = getCard(action.card);
        return action.successful && card.rank === '5' ? state + 1 : state;
      default:
        return state;
    }
  },
  discardedCards: (state = initialDiscardedCards, action) => {
    switch (action.type) {
      case actions.DISCARD_CARD:
        const {planet} = getCard(action.card);
        return {...state, [planet]: [...state[planet], action.card]};
      case actions.PLAY_CARD:
        if (!action.successful) {
          const card = getCard(action.card);
          return {...state, [planet]: [...state[planet], action.card]};
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
          const {plannet} = getCard(action.card);
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
      case actions.GIVE_HINT:
        return state;
      case actions.DISCARD_CARD:
      case actions.PLAY_CARD:
        var reducedHand = state[action.playerId].remove(action.card);
        if (action.newCard) {
          reducedHand.push(newCard);
        }
        return {...state, [action.playerId]: reducedHand};
      default:
        return state;
    }
  },
  playerOrder: (state = null, action) => {
    switch (action.type) {
      case actions.SHUFFLE_DECK:
        return {current: 0, order: action.order};
      case actions.GIVE_HINT:
      case actions.DISCARD_CARD:
      case actions.PLAY_CARD:
        const newCurrent = state.current + 1 % state.order;
        return {...state, current: newCurrent};
      default:
        return state;
    }
  },
  deck: (state = [], action) => {
    switch (action.type) {
      case actions.SHUFFLE_DECK:
        return action.cards;
      case actions.DISCARD_CARD:
      case actions.PLAY_CARD:
        if (state.length > 0) {
          const newState = Object.assign({}, state);
          newState.remove(action.newCard);
          return newState;
        } else {
          return state;
        }
      default:
        return state;
    }
  },
};

export default combineReducers({...rootReducers});
