import {connect} from 'react-redux';

import JoinGame from '../components/JoinGame';

import {setGameId} from '../actions';

const mapStateToProps = null;

const mapDispatchToProps = (dispatch) => ({
  setGameId: (gameId) => dispatch(setGameId(gameId)),
});

export default connect(mapStateToProps, mapDispatchToProps)(JoinGame);
