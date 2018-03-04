import {combineReducers} from 'redux';

import * as actions from './actions';

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
  game: (state = null, action) => {
    switch (action.type) {
      case actions.FETCH_GAME_STATE:
        return null;
      case actions.UPDATE_GAME_STATE:
        return action.game;
      default:
        return state;
    }
  },
  isFetchingGameState: (state = false, action) => {
    switch (action.type) {
      case actions.FETCH_GAME_STATE:
        return true;
      case actions.UPDATE_GAME_STATE:
        return action.game === null;
      default:
        return state;
    }
  },
};

export default combineReducers({...rootReducers});
