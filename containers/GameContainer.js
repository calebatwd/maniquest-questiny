import {connect} from 'react-redux';

import Game from '../components/Game';

const mapStateToProps = (state) => ({
  deck: state.deck,
  hands: state.hands,
  gameId: state.gameId,
  scores: state.scores,
  playerId: state.playerId,
  players: state.players,
  turnIndex: state.turnIndex,
  discardedCards: state.discardedCards,
  hintsRemaining: state.hintsRemaining,
  crashesRemaining: state.crashesRemaining,
});

const mapDispatchToProps = (dispatch) => ({});

export default connect(mapStateToProps, mapDispatchToProps)(Game);
