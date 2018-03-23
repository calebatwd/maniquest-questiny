import {connect} from 'react-redux';

import ChooseName from '../components/ChooseName';

import {setLoggedInPlayerId} from '../actions';

const mapStateToProps = ({gameId, loggedInPlayerId}) => ({gameId, loggedInPlayerId});

const mapDispatchToProps = (dispatch) => ({
  setLoggedInPlayerId: (loggedInPlayerId) => dispatch(setLoggedInPlayerId(loggedInPlayerId)),
});

export default connect(mapStateToProps, mapDispatchToProps)(ChooseName);
