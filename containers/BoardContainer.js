import {connect} from 'react-redux';

import Board from '../components/Game/Board';

import {selectHint} from '../actions';

const mapStateToProps = ({selectedHint}) => {
  return {
    selectedHint,
  };
};

const mapDispatchToProps = (dispatch) => ({
  selectHint: (selectedHint) => dispatch(selectHint(selectedHint)),
});

export default connect(mapStateToProps, mapDispatchToProps)(Board);
