import _ from 'lodash';

// Here is where selectors go for the game. These use the minimal data in
// the redux store to compute derived state. TODO: https://redux.js.org/recipes/computing-derived-data
export const checkGameOutcome = (turnsBeyondDeck, scores, crashesRemaining, players) => {
  const uniqueScores = _.uniq(_.values(scores));
  if (uniqueScores.length === 1 && uniqueScores[0] === 5) {
    return 'Perfect game!';
  } else if (crashesRemaining === 0) {
    return 'Too many crashes';
  } else if (turnsBeyondDeck === players.length) {
    return 'Out of Cards';
  }
  return null;
};
