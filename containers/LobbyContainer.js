import {connect} from 'react-redux';

import Lobby from '../components/Lobby';

import {fetchPlayers, fetchTurns} from '../actions';

const mapStateToProps = ({isFetchingPlayers, gameId, players}) => {
  return {
    gameId,
    players,
    isFetchingPlayers,
  };
};

const mapDispatchToProps = (dispatch) => ({
  fetchPlayers: (gameId) => dispatch(fetchPlayers(gameId)),
  fetchTurns: (gameId, history) => dispatch(fetchTurns(gameId, history)),
});

export default connect(mapStateToProps, mapDispatchToProps)(Lobby);
