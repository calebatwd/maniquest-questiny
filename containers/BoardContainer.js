import {connect} from 'react-redux';

import Board from '../components/Game/Board';

import {selectCardToHint} from '../actions';

const mapStateToProps = ({selectedHint}) => {
  return {
    selectedHint,
  };
};

const mapDispatchToProps = (dispatch) => ({
  selectCardToHint: (selectedHint) => dispatch(selectCardToHint(selectedHint)),
});

export default connect(mapStateToProps, mapDispatchToProps)(Board);
