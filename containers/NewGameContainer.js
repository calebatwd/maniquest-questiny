import {connect} from 'react-redux';

import NewGame from '../components/NewGame';

import {setGameId} from '../actions';

const mapStateToProps = null;

const mapDispatchToProps = (dispatch) => ({
  setGameId: (gameId) => {
    dispatch(setGameId(gameId));
  },
});

export default connect(mapStateToProps, mapDispatchToProps)(NewGame);
