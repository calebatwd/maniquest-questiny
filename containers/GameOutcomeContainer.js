import {connect} from 'react-redux';

import GameOutcome from '../components/GameOutcome';
import {checkGameOutcome} from '../selectors';

const mapStateToProps = (state) => {
  return {
    players: state.players,
    scores: state.scores,
    deck: state.deck,
    discardedCards: state.discardedCards,
    hintsRemaining: state.hintsRemaining,
    crashesRemaining: state.crashesRemaining,
    gameOutcome: checkGameOutcome(
      state.turnsBeyondDeck,
      state.scores,
      state.crashesRemaining,
      state.players
    ),
  };
};

const mapDispatchToProps = (dispatch) => ({});

export default connect(mapStateToProps, mapDispatchToProps)(GameOutcome);
