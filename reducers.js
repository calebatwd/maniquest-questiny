import {combineReducers} from 'redux';

import * as actions from './actions';

function gameId(state = null, action) {
  switch (action.type) {
    case actions.SET_GAME_ID:
      return action.gameId;
    default:
      return state;
  }
}

const rootReducers = combineReducers({
  gameId,
});

export default rootReducers;
