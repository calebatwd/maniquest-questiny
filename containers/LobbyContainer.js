import {connect} from 'react-redux';
import _ from 'lodash';

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
  fetchTurns: (gameId) => dispatch(fetchTurns(gameId)),
});

export default connect(mapStateToProps, mapDispatchToProps)(Lobby);
