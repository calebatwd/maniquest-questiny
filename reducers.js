import * as actions from './actions';

const rootReducers = {
  game: (state = null, action) => {
    switch (action.type) {
      case actions.SET_GAME:
        return action.game;
      default:
        return state;
    }
  },
};

export default rootReducers;
