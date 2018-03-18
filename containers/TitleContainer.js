import {connect} from 'react-redux';

import Title from '../components/Title';

import {resetGame} from '../actions';

const mapStateToProps = null;

const mapDispatchToProps = (dispatch) => ({
  resetGame: () => dispatch(resetGame()),
});

export default connect(mapStateToProps, mapDispatchToProps)(Title);
