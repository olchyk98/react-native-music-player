import React, { Component } from 'react';

import {
    View,
    Image,
    Text
} from 'react-native';
import { connect } from 'react-redux';

import { styles } from '../styles';
import image from '../image.jpg';
import icons from '../icons';

class ListSong extends Component {
    // convertTime = time => {
    //     let a = Math.floor(parseInt(time)),
    //         b = a / 60,
    //         c = a % 60,
    //         d = d => d.toString(),
    //         e = e => (d(e).length === 1) ? 0 + e : e;
        
    //     return `${ d(e(b)) }:${ d(e(c)) }`
    // }

    convertName = type => {
        let a = "",
            b = this.props.filename,
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

    playSong = () => {
        let { id, uri, duration } = this.props;
        this.props.updatePlayingSong({
            id, uri, duration,
            name: this.convertName("name"),
            label: this.convertName("label")
        });
    }

    render() {
        return(
        <View style={[ styles.listSongsSong ]} onTouchEnd={ this.playSong }>
            <View style={[
                styles.listSongsSongProgress,
                {
                    width: (
                        this.props.global.sessionInfo &&
                        this.props.global.currentSong &&
                        this.props.global.currentSong.id === this.props.id &&
                        this.props.global.sessionInfo.currentProgress &&
                        this.props.global.sessionInfo.currentProgress + '%' // XXX
                    ) || "0%"
                }
            ]} />
            <View style={[ styles.listSongsSongMain ]}>
            <View style={[ styles.listSongsSongInfo ]}>
                <View style={[ styles.listSongsSongInfoImagecointainer ]}>
                    <Image
                        style={[ styles.listSongsSongInfoImagecointainerImage ]}
                        source={ image }
                        resizeMode="cover"
                    />
                </View>
                <View style={[ styles.listSongsSongInfoTitle ]}>
                <Text
                    style={[ styles.listSongsSongInfoTitleName ]}
                    numberOfLines={ 1 }
                    ellipsizeMode="tail">
                    { this.convertName("name") }
                </Text>
                <Text style={[ styles.listSongsSongInfoTitleLabel ]}
                    numberOfLines={ 1 }
                    ellipsizeMode="tail">
                    { this.convertName("label") }
                </Text>
                </View>
            </View>
            <View style={[ styles.listSongsSongControls ]}>
                {
                    (!this.props.isListening) ? null : (
                        <Image
                            style={[ styles.listSongsSongControlsPlay ]}
                            source={
                                (!this.props.isPlaying) ? icons.pause : icons.play
                            }
                        />
                    )
                }
            </View>
            </View>
        </View>
        );
    }
}

const mapStateToProps = ({ global }) => ({
    global
});

const mapActionsToProps = {
    updatePlayingSong: payload => ({
        type: "UPDATE_PLAYING_SONG", payload
    })
}

export default connect(
    mapStateToProps,
    mapActionsToProps
)(ListSong);