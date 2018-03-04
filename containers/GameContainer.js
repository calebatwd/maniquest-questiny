import {connect} from 'react-redux';

import Game from '../components/Game';

const mapStateToProps = ({gameId, gameState}) => ({
  gameId,
  gameState,
});

const mapDispatchToProps = (dispatch) => ({});

export default connect(mapStateToProps, mapDispatchToProps)(Game);
