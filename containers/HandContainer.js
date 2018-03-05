import {connect} from 'react-redux';

import Hand from '../components/Game/Hand';

import {selectCardToPlay} from '../actions';

const mapStateToProps = ({selectedCardToPlay}) => {
  return {
    selectedCardToPlay,
  };
};

const mapDispatchToProps = (dispatch) => ({
  selectCardToPlay: (card) => dispatch(selectCardToPlay(card)),
});

export default connect(mapStateToProps, mapDispatchToProps)(Hand);
