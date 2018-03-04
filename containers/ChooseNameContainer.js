import {connect} from 'react-redux';

import ChooseName from '../components/ChooseName';

import {setPlayerId} from '../actions';

const mapStateToProps = null;

const mapDispatchToProps = (dispatch) => ({
  setPlayerId: (playerId) => dispatch(setPlayerId(playerId)),
});

export default connect(mapStateToProps, mapDispatchToProps)(ChooseName);
