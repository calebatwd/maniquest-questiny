import {connect} from 'react-redux';
import _ from 'lodash';

import Lobby from '../components/Lobby';

import {fetchGameState} from '../actions';

const mapStateToProps = ({isFetchingGameState, gameId, game}) => {
  const playersDict = _.get(game, 'players', {});

  return {
    gameId,
    players: _.values(playersDict),
    isFetchingGameState,
  };
};

const mapDispatchToProps = (dispatch) => ({
  fetchGameState: (gameId) => dispatch(fetchGameState(gameId)),
});

export default connect(mapStateToProps, mapDispatchToProps)(Lobby);
