import * as firebase from 'firebase';

export const SET_GAME_ID = 'SET_GAME_ID';
export const FETCH_PLAYERS = 'FETCH_PLAYERS';
export const UPDATE_PLAYERS = 'UPDATE_PLAYERS';
export const SET_PLAYER_ID = 'SET_PLAYER_ID';

export const GIVE_HINT = 'GIVE_HINT';
export const DISCARD_CARD = 'DISCARD_CARD';
export const PLAY_CARD = 'PLAY_CARD';
export const SHUFFLE_DECK = 'SHUFFLE_DECK';

export function setGameId(gameId) {
  return {
    type: SET_GAME_ID,
    gameId,
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
          const players = [];
          snapshot.forEach((playerSnapshot) => {
            players.push(Object.assign(playerSnapshot.val(), {id: playerSnapshot.key}));
          });

          dispatch(updatePlayers(players));
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

export function fetchTurns(gameId, history) {
  return (dispatch) => {
    firebase
      .database()
      .ref(`/games/${gameId}/turns`)
      .on(
        'child_added',
        (snapshot) => {
          const turn = snapshot.val();

          dispatch(turn);

          if (turn.type == SHUFFLE_DECK) {
            firebase
              .database()
              .ref(`/games/${gameId}/players`)
              .off();

            history.push({
              pathname: '/game',
              search: `?from=lobby`,
            });
          }
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
