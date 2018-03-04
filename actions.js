import * as firebase from 'firebase';

export const SET_GAME_ID = 'SET_GAME_ID';
export const FETCH_GAME = 'FETCH_GAME';
export const UPDATE_GAME = 'UPDATE_GAME';

export function setGameId(gameId) {
  return {
    type: SET_GAME_ID,
    gameId,
  };
}

export function fetchGame(game) {
  return {
    type: FETCH_GAME,
    game,
  };
}

export function updateGame(game) {
  return {
    type: UPDATE_GAME,
    game,
  };
}
