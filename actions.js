import * as firebase from 'firebase';

export const SET_GAME_ID = 'SET_GAME_ID';
export const FETCH_PLAYERS = 'FETCH_PLAYERS';
export const UPDATE_PLAYERS = 'UPDATE_PLAYERS';
export const SET_PLAYER_ID = 'SET_PLAYER_ID';

export const GIVE_HINT = 'GIVE_HINT';
export const DISCARD_CARD = 'DISCARD_CARD';
export const PLAY_CARD = 'PLAY_CARD';
export const SHUFFLE_DECK = 'SHUFFLE_DECK';
export const UPDATE_HANDS = 'UPDATE_HANDS';

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

          dispatch({
            type: UPDATE_PLAYERS,
            players,
          });
        },
        (error) => {
          console.log(`Error fetching players for "${gameId}" from Firebase:`, error);
        }
      );
  };
}

export function fetchTurns(gameId, history) {
  return (dispatch) => {
    const gameRef = firebase.database().ref(`/games/${gameId}`);

    gameRef.child('turns').on(
      'child_added',
      (snapshot) => {
        const turn = snapshot.val();

        dispatch(turn);

        if (turn.type === SHUFFLE_DECK) {
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
        console.log(`Error fetching turns for "${gameId}" from Firebase:`, error);
      }
    );

    gameRef.child('hands').on(
      'value',
      (snapshot) => {
        dispatch({
          type: UPDATE_HANDS,
          hands: snapshot.val(),
        });
      },
      (error) => {
        console.log(`Error fetching hands for "${gameId}" from Firebase:`, error);
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
