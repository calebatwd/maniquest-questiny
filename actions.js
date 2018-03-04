import * as firebase from 'firebase';

export const SET_GAME_ID = 'SET_GAME_ID';
export const FETCH_GAME_STATE = 'FETCH_GAME_STATE';
export const FETCHING_GAME_STATE = 'FETCHING_GAME_STATE';
export const UPDATE_GAME_STATE = 'UPDATE_GAME_STATE';
export const SET_PLAYER_ID = 'SET_PLAYER_ID';

export function setGameId(gameId) {
  return {
    type: SET_GAME_ID,
    gameId,
  };
}

export function fetchGameState(gameId) {
  return (dispatch) => {
    firebase
      .database()
      .ref(`/games/${gameId}`)
      .on(
        'value',
        function(snapshot) {
          dispatch(setFetchingGameState(false));
          dispatch(updateGameState(snapshot.val()));
        },
        (error) => {
          console.log('Error receiving game state ', error);
        }
      );
  };
}

export function updateGameState(game) {
  return {
    type: UPDATE_GAME_STATE,
    game,
  };
}

export function setPlayerId(playerId) {
  return {
    type: SET_PLAYER_ID,
    playerId,
  };
}

export function setFetchingGameState(isFetchingGameState) {
  return {
    type: FETCHING_GAME_STATE,
    isFetchingGameState,
  };
}
