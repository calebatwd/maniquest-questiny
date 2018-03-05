import {connect} from 'react-redux';

import Command from '../components/Game/Command';

const mapStateToProps = ({selectedCardToPlay, selectedHint}) => {
  return {
    selectedCardToPlay,
    selectedHint,
  };
};

const mapDispatchToProps = (dispatch) => ({});

export default connect(mapStateToProps, mapDispatchToProps)(Command);
