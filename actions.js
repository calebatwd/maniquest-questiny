import * as firebase from 'firebase';

export const SET_GAME_ID = 'SET_GAME_ID';
export const FETCH_GAME_STATE = 'FETCH_GAME_STATE';
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
    dispatch({
      type: FETCH_GAME_STATE,
    });

    firebase
      .database()
      .ref(`/games/${gameId}`)
      .on(
        'value',
        (snapshot) => {
          dispatch(updateGameState(snapshot.val()));
        },
        (error) => {
          console.log(`Error fetching game state for "${gameId}" from Firebase:`, error);
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
