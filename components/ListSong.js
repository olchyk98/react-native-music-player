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
        
    //     return `${ e(b) }:${ e(c) }`
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
        let { id, uri, filename } = this.props;
        this.props.updatePlayingSong({
            id, uri,
            name: this.convertName("name"),
            label: this.convertName("label")
        });
    }

    render() {
        return(
        <View style={[ styles.listSongsSong ]} onTouchEnd={ this.playSong }>
            <View style={[ styles.listSongsSongProgress ]} />
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
                <Image style={[ styles.listSongsSongControlsPlay ]} source={ icons.play } />
            </View>
            </View>
        </View>
        );
    }
}

export default connect(
    () => ({}),
    {
        updatePlayingSong: payload => ({ type: "UPDATE_PLAYING_SONG", payload })
    }
)(ListSong);