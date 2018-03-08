import {connect} from 'react-redux';

import Game from '../components/Game';
import {checkGameOutcome} from '../selectors';

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
  turnsBeyondDeck: state.turnsBeyondDeck,
  gameOutcome: checkGameOutcome(
    state.turnsBeyondDeck,
    state.scores,
    state.crashesRemaining,
    state.players
  ),
});

export default connect(mapStateToProps)(Game);
