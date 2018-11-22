/* DOCS

    TESTME 1.: main scrollView's onScrollEndDrag is not tested on IOS platform.
    COMMITME: 2.: onScroll is not working when I don't request nativeEvent (when i req global object).

*/

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
    constructor(props) {
        super(props);

        this.state = {
            moreIsLoading: false
        }

        this.config = {
            first: 20,
            mediaType: MediaLibrary.MediaType.audio,
            sortBy: MediaLibrary.SortBy.modificationTime
        }
    }

    async componentDidMount() {
        /* Ask READ_EXTERNAL_STORAGE, WRITE_EXTERNAL_STORAGE permissions */
        const { status } = await Permissions.askAsync(
            Permissions.CAMERA_ROLL
        );

        if(status === 'granted') { // IF ok THEN read music
            const media = await MediaLibrary.getAssetsAsync(this.config);

            this.props.uploadSongsList(media);
        } else { // Cast error
            this.props.castError("We haven't got permissions to read your music files.");
        }
    }

    requestUpdate = async () => {
        if(this.state.moreIsLoading) return;
        
        let a = this.props.list;
        if(
            !a.songs ||
            !a.songs.length ||
            !a.songsInfo.hasNextPage ||
            a.songsInfo.cursorIN === "_NO_CURSOR_PROVIDED"
        ) return;

        let b = pl => this.setState(() => ({ moreIsLoading: pl }));
        b(true);

        const media = await MediaLibrary.getAssetsAsync({
            ...this.config,
            ...{
                after: a.songsInfo.cursorIN
            }
        });
        
        b(false);
        if(media.assets.length) this.props.uploadSongsList(media);

        // TODO: try/catch, cast global error

        // moreIsLoading: false

    }
    

    render() {
        return(
            <View
                style={[ styles.list, styles.display ]}>
                <View style={[ styles.listHead ]}>
                    <Text style={[ styles.listHeadTitle ]}>Music</Text>
                </View>
                <ScrollView
                    style={[ styles.listSongs ]}
                    scrollEventThrottle={ 400 }
                    onScroll={
                        ({ nativeEvent: { contentSize: { height: a }, contentOffset: { y: b }, layoutMeasurement: { height: c } } }) => {
                            if(a - b <= c + 20) this.requestUpdate(); // !NOT TESTED ON IOS
                        }
                    }>
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
                    {
                        (!this.state.moreIsLoading) ? null : (
                            <Image
                                source={ strikeLoader }
                                style={[ styles.listMoreloader ]}
                                resizeMode="cover"
                            />
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