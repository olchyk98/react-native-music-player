import React, { Component } from 'react';
import {
    View,
    Image,
    Text,
    ScrollView
} from 'react-native';
import {
    MediaLibrary,
    Permissions
} from 'expo';
import { connect } from 'react-redux';

import ListSong from './ListSong';

import strikeLoader from '../assets/images/loader.gif'

import { styles } from '../styles';

class List extends Component {
    async componentDidMount() {
        /* Ask READ_EXTERNAL_STORAGE, WRITE_EXTERNAL_STORAGE permissions */
        const { status } = await Permissions.askAsync(
            Permissions.CAMERA_ROLL
        );

        if(status === 'granted') { // IF ok THEN read music
            const media = await MediaLibrary.getAssetsAsync({
                mediaType: MediaLibrary.MediaType.audio,
                sortBy: MediaLibrary.SortBy.modificationTime
            });
            this.props.uploadSongsList(media);
        } else { // Cast error
            this.props.castError("We haven't got permissions to read your music files.");
        }
    }

    render() {
        return(
            <View style={[ styles.list, styles.display ]}>
                <View style={[ styles.listHead ]}>
                <Text style={[ styles.listHeadTitle ]}>Music</Text>
                </View>
                <ScrollView style={[ styles.listSongs ]}>
                    {
                        (this.props.list.songs) ? (
                            (this.props.list.songs.length) ? (
                                this.props.list.songs.map(({ id, uri, duration, filename }) => (
                                    <ListSong
                                        key={ id }
                                        id={ id }
                                        uri={ uri }
                                        duration={ duration }
                                        filename={ filename.split('.').slice(0, -1).join('.') }
                                        isListening={ (this.props.global.currentSong && this.props.global.currentSong.id === id) || false }
                                        isPlaying={ (this.props.global.sessionInfo && this.props.global.sessionInfo.isPlaying) || false }
                                    />
                                ))
                            ) : (
                                <View style={[ styles.listSongsLoader ]}>
                                    <Text style={[ styles.listSongsInfo ]}>
                                        We didn't find any kind of music on your device.
                                    </Text>
                                </View>
                            )
                        ) : (
                            <View style={[ styles.listSongsLoader ]}>
                                <Image
                                    style={[ styles.listSongsLoaderIcon ]}
                                    source={ strikeLoader }
                                    resizeMode="cover"
                                />
                            </View>
                        )
                    }
                </ScrollView>
            </View>
        );
    }
}

const mapStateToProps = ({ list, global }) => ({
    list,
    global
});

const mapActionsToProps = {
    castError: text => ({ type: "CAST_GLOBAL_ERROR", payload: text }),
    uploadSongsList: payload => ({ type: "UPLOAD_LIST_MUSIC", payload })
}

export default connect(
    mapStateToProps,
    mapActionsToProps
)(List);