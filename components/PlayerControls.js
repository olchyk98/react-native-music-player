import React, { Component } from 'react';
import {
    View,
    Image,
    TouchableOpacity
} from 'react-native';

import icons from '../icons';

import { connect } from 'react-redux';
import { styles } from '../styles';

class PlayerControlsButton extends Component {
    render() {
      return(
        <TouchableOpacity
            activeOpacity={ 0.9 }
            onPress={ this.props._onPress }
            style={[ styles.playerControlsBtn, [(this.props.bordered) ? styles.playerControlsBtnBordered : ""] ]}>
            <Image style={[ styles.playerControlsBtnImage ]} source={ this.props.icon } />
        </TouchableOpacity>
      );
    }
  }
  
class PlayerControls extends Component {
    handleMove = a => {
        let { sessionInfo: { currSongIndex: b }, songs } = this.props.list;
        if(!b || !songs || b === "_SONG_NOT_FOUND") return;
        
        let c = (a === "NEXT_SONG") ? 1 : -1,
            { id, uri, duration, filename } = songs[b + c];

        let convertName = type => { // copied
            let a = "",
                b = filename.split('.').slice(0, -1).join('.'),
                c = new RegExp(/(.*) - (.*)/),
                d = new RegExp(/(.*)-(.*)/),
                e = b.match(c) || b.match(d);
    
            switch(type) {
                case 'name':
                    if(!e) { a = b; break; }
                    a = e[2];
                break;
                case 'label':
                    if(!e) break;
                    a = e[1];
                break;
                default:break;
            }
    
            return a;
        }

        this.props.updatePlayingSong({
            id, uri, duration,
            name: convertName("name"),
            label: convertName("label")
        });
    }

    render() {
        return(
        <View style={[ styles.playerControls ]}>
            <PlayerControlsButton
            bordered={ false }
            icon={ icons.prevWhite }
            _onPress={ () => this.handleMove("PREVIOUS_SONG") }
            />
            <PlayerControlsButton
            bordered={ true }
            _onPress={ this.props.togglePlay }
            icon={
                (( this.props.global.sessionInfo && this.props.global.sessionInfo.isPlaying ) || false) ? (
                    icons.pauseWhite
                ) : icons.playWhite
            }
            />
            <PlayerControlsButton
                bordered={ false }
                icon={ icons.nextWhite }
                _onPress={ () => this.handleMove("NEXT_SONG") }
            />
        </View>
        );
    }
}

const mapStateToProps = ({ global, list }) => ({
    global,
    list
});

const mapActionsToProps = {
    togglePlay: () => ({ type: "TOGGLE_PLAY_PLAYER" }),
    updatePlayingSong: payload => ({
        type: "UPDATE_PLAYING_SONG", payload
    })
}

export default connect(
    mapStateToProps,
    mapActionsToProps
)(PlayerControls);