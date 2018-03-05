import * as firebase from 'firebase';

export const getCard = (card) => {
  const [planet, rank, iter] = action.card.split('_');
  return {planet, rank, iter};
};

export const submitTurn = (gameId, turn) => {
  return firebase
    .database()
    .ref(`/games/${gameId}/turns`)
    .push(turn, (error) => {
      if (error) console.log('Error pushing turn', error);
      else console.log('Turn submitted');
    });
};
