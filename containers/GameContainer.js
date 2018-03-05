import {connect} from 'react-redux';

import Game from '../components/Game';

const mapStateToProps = (state) => ({
  deck: state.deck,
  hands: state.hands,
  gameId: state.gameId,
  scores: state.scores,
  loggedInPlayerId: state.loggedInPlayerId,
  players: state.players,
  turnIndex: state.turnIndex,
  discardedCards: state.discardedCards,
  hintsRemaining: state.hintsRemaining,
  crashesRemaining: state.crashesRemaining,
});

export default connect(mapStateToProps)(Game);
