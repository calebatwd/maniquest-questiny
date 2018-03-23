import {connect} from 'react-redux';

import Title from '../components/Title';

import {resetGame, setLoggedInPlayerId} from '../actions';

const mapStateToProps = ({loggedInPlayerId}) => ({loggedInPlayerId});

const mapDispatchToProps = (dispatch) => ({
  resetGame: () => dispatch(resetGame()),
  setLoggedInPlayerId: (loggedInPlayerId) => dispatch(setLoggedInPlayerId(loggedInPlayerId)),
});

export default connect(mapStateToProps, mapDispatchToProps)(Title);
