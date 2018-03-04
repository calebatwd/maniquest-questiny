import * as firebase from 'firebase';

export const SET_GAME_ID = 'SET_GAME_ID';
export const FETCH_GAME_STATE = 'FETCH_GAME_STATE';
export const UPDATE_GAME_STATE = 'UPDATE_GAME_STATE';
export const FETCH_PLAYERS = 'FETCH_PLAYERS';
export const UPDATE_PLAYERS = 'UPDATE_PLAYERS';
export const SET_PLAYER_ID = 'SET_PLAYER_ID';

export const GIVE_HINT = 'GIVE_HINT';
export const DISCARD_CARD = 'DISCARD_CARD';
export const PLAY_CARD = 'PLAY_CARD';

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

export function fetchPlayers(gameId) {
  return (dispatch) => {
    dispatch({
      type: FETCH_PLAYERS,
    });

    firebase
      .database()
      .ref(`/games/${gameId}/players`)
      .on(
        'value',
        (snapshot) => {
          dispatch(updatePlayers(snapshot.val()));
        },
        (error) => {
          console.log(`Error fetching players for "${gameId}" from Firebase:`, error);
        }
      );
  };
}

export function updatePlayers(players) {
  return {
    type: UPDATE_PLAYERS,
    players,
  };
}

export function fetchTurns(gameId) {
  return (dispatch) => {
    firebase
      .database()
      .ref(`/games/${gameId}/turns`)
      .on(
        'childAdded',
        (snapshot) => {
          dispatch(snapshot.val());
        },
        (error) => {
          console.log(`Error fetching turn for "${gameId}" from Firebase:`, error);
        }
      );
  };
}

export function setPlayerId(playerId) {
  return {
    type: SET_PLAYER_ID,
    playerId,
  };
}
