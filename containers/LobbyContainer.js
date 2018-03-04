import {connect} from 'react-redux';
import _ from 'lodash';

import Lobby from '../components/Lobby';

import {fetchGameState} from '../actions';

const mapStateToProps = ({isFetchingGame, gameId, game}) => ({
  isFetchingGame,
  gameId,
  players: _.get(game, 'players', []),
});

const mapDispatchToProps = (dispatch) => ({
  fetchGameState: (gameId) => dispatch(fetchGameState(gameId)),
});

export default connect(mapStateToProps, mapDispatchToProps)(Lobby);
