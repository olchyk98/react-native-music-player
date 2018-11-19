import React, { Component } from 'react';
import {
    View,
    Image
} from 'react-native';

import icons from '../icons';

import { connect } from 'react-redux';
import { styles } from '../styles';

class PlayerControlsButton extends Component {
    render() {
      return(
        <View
            onTouchEnd={ this.props._onPress }
            style={[ styles.playerControlsBtn, [(this.props.special) ? styles.playerControlsBtnBordered : ""] ]}>
            <Image style={[ styles.playerControlsBtnImage ]} source={ this.props.icon } />
        </View>
      );
    }
  }
  
class PlayerControls extends Component {
    render() {
        return(
        <View style={[ styles.playerControls ]}>
            <PlayerControlsButton
            special={ false }
            icon={ icons.prevWhite }
            />
            <PlayerControlsButton
            special={ true }
            _onPress={ this.props.togglePlay }
            icon={
                (( this.props.global.sessionInfo && this.props.global.sessionInfo.isPlaying ) || false) ? (
                    icons.pauseWhite
                ) : icons.playWhite
            }
            />
            <PlayerControlsButton
            special={ false }
            icon={ icons.nextWhite }
            />
        </View>
        );
    }
}

const mapStateToProps = ({ global }) => ({
    global
});

const mapActionsToProps = {
    togglePlay: () => ({ type: "TOGGLE_PLAY_PLAYER" })
}

export default connect(
    mapStateToProps,
    mapActionsToProps
)(PlayerControls);