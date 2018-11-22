import React, { Component } from 'react';
import {
    View,
    Image,
    Text,
    Animated,
    Easing
} from 'react-native';
import {
    Audio
} from 'expo';
import { connect } from 'react-redux';
import { styles, variables, innerHeight, innerWidth, platform } from '../styles';

import icons from '../icons';

import image from '../image.png';
import vinyl from '../assets/images/vinyl.png';

import PlayerControls from './PlayerControls';
import PlayerProgress from './PlayerProgress';

class Player extends Component {
    constructor(props) {
        super(props);

        this.state = {
            yPos: new Animated.Value(innerHeight - variables.player.minHeight + ((platform === 'android') ? 45 : 0)),
            minYPos: new Animated.Value(0),
            minOpacity: new Animated.Value(1),
            background: new Animated.Value(100),
            minToggleRotate: new Animated.Value(0),
            minToggleBlackOpacity: new Animated.Value(0),
            minToggleBorderColor: new Animated.Value(255),
            thidparty_isPlaying: false
        }
        
        this.currentTimeInt = this.lastPlSongID = null;
    }

    componentDidMount() {
        let a = this.props.player.isOpened;
        if(a !== false) { // if initialState !== defaultInitialState
            this.toggleScreen(a, true);
        }
    }

    async componentDidUpdate(a) {
        { // toggled modal
            let b = this.props.player.isOpened;
            if(a.player.isOpened !== this.props.player.isOpened) {
                this.toggleScreen(b);
            }
        }
        { // new song
            let b = this.props.global.currentSong;
            if(a.global.currentSong !== b) {
                this.props.togglePlayerVisibility(true);
                this.playSong(b);
            }
        }
        { // play/pause sync // ?prevProps return currentProps and I don't know why
            let b = this.props.global.sessionInfo;
            if(b && b.isPlaying !== this.state.thidparty_isPlaying) {
                this.setState(() => ({
                    thidparty_isPlaying: b.isPlaying
                }));
                await this.props.player.module[((b.isPlaying) ? "playAsync" : "pauseAsync")]();
            }
        }
    }

    toggleScreen = (a, wm = false) => {
        // ?AV to set all props to 0 before animation :
        // !Rejected

        // ? b - isOpened
        
        const b = (!wm) ? 250 : 0,
              c = Easing.out(Easing.linear);

        Animated.parallel([
            Animated.timing(
                this.state.yPos,
                {
                    toValue: (a) ? 0 : innerHeight - variables.player.minHeight + ((platform === 'android') ? 45 : 0),
                    duration: b,
                    easing: c
                }
            ),
            Animated.timing(
                this.state.minYPos,
                {
                    toValue: (a) ? 25 : 0,
                    duration: b,
                    easing: c
                }
            ),
            Animated.timing(
                this.state.minOpacity,
                {
                    toValue: (a) ? 0 : 1,
                    duration: b,
                    easing: c
                }
            ),
            Animated.timing(
                this.state.background,
                {
                    toValue: (a) ? 0 : 100,
                    duration: b,
                    easing: c
                }
            ),
            Animated.timing(
                this.state.minToggleRotate,
                {
                    toValue: (a) ? 180 : 0,
                    duration: b,
                    easing: c
                }
            ),
            Animated.timing(
                this.state.minToggleBlackOpacity,
                {
                    toValue: (a) ? 1 : 0,
                    duration: b,
                    easing: c
                }
            ),
            Animated.timing(
                this.state.minToggleBorderColor,
                {
                    toValue: (a) ? 0 : 255,
                    duration: b,
                    easing: c
                }
            )
        ]).start();
    }

    playSong = async a => {
        if(this.lastPlSongID === a.id) {
            return this.props.togglePlayerVisibility(true);
        }
        /*
            Sometimes the player is not working (progressbar doesnt display info also),
            I think that is Expo Application's trouble, but I'm not sure.

            If it still happens after compilation I can create the new player on fire playSong function,
            instead of load a exists player
        */


        let player = this.props.player.module;
        {
            let b = this.currentTimeInt;
            if(b) clearInterval(b);
        }

        if(this.props.player.module) {
            await this.props.player.module.stopAsync(); // stop
            await this.props.player.module.unloadAsync(); // clear prev song
        } else {
            player = new Audio.Sound();
            this.props.setPlayerModule(player);
        }

        try {
            await player.loadAsync({ uri: a.uri, downloadFirst: false }); // load new
        } catch(err) {
            console.log(err);
            return alert("An error occured while we tried to open this song.");
        }

        await player.playAsync(); // play

        this.props.updateSessionInfo({
            isPlaying: true,
            currentTime: 0
        });

        this.lastPlSongID = a.id;

        let uct = async () => {
            let {
                sessionInfo,
                currentSong
            } = this.props.global;
            if(!sessionInfo || !currentSong || !sessionInfo.isPlaying) return;

            let { positionMillis: c, isPlaying } = await this.props.player.module.getStatusAsync(),
                d = sessionInfo.currentTime,
                e = d => Math.floor(d);
            // Prevent panic initial wirr player stop
            if(this.props.global.sessionInfo.isPlaying !== isPlaying) {
                this.props.updateSessionInfo({ isPlaying });
            }

            c /= 1000;
            
            this.props.updateSessionInfo({
                currentTime: c,
                currentProgress: 100 / (currentSong.duration / sessionInfo.currentTime)
            });
            if(e(d) && e(c) && e(d) === e(c)) clearInterval(this.currentTimeInt);
        }

        uct();
        this.currentTimeInt = setInterval(() => uct(), 1000);
    }

    render() {
        const bgcol = this.state.background.interpolate({
            inputRange: [0, 100],
            outputRange: [ 'white', variables.global.focusCol ]
        });

        const minBtnRotation = this.state.minToggleRotate.interpolate({
            inputRange: [0, 180],
            outputRange: ["180deg", "0deg"]
        });

        const minBtnBorder = this.state.minToggleBorderColor.interpolate({
            inputRange: [0, 255],
            outputRange: ["rgba(0, 0, 0, .2)", "rgba(255, 255, 255, .1)"]
        });

        return(
            <Animated.View style={[
                styles.player, styles.display,
                {
                    transform: [{ translateY: this.state.yPos }],
                    backgroundColor: bgcol
                }
            ]}>
                <Animated.View style={[
                    styles.playerMinProgress,
                    {
                        width: (
                            this.props.global.sessionInfo &&
                            innerWidth / 100 * this.props.global.sessionInfo.currentProgress
                        ) || 0,
                        opacity: this.state.minOpacity
                    }
                ]}>
                </Animated.View>
                <Animated.View style={[
                    styles.playerMinaction,
                    {
                        top: this.state.minYPos
                    }
                ]}>
                    <Animated.View style={[
                        styles.playerMinactionTitle,
                        {
                            opacity: this.state.minOpacity
                        }
                    ]}>
                        <Image
                            source={
                                (( this.props.global.sessionInfo && this.props.global.sessionInfo.isPlaying ) || false) ? (
                                    icons.playWhite
                                ) : (
                                    icons.pauseWhite
                                )
                            }
                            onTouchEnd={ this.props.togglePlayPlayer }
                            style={[ styles.playerMinactionTitlePlayi ]}
                        />
                        <View
                            style={[ styles.playerMinactionTitle ]}
                            onTouchStart={ this.props.togglePlayerVisibility }
                            onTouchMove={ this.props.togglePlayerVisibility }>
                            <Text style={[ styles.playerMinactionTitleName ]}>
                                { (this.props.global.currentSong && this.props.global.currentSong.name) || "" }
                            </Text>
                            <Text style={[ styles.playerMinactionTitleLabel ]}>
                                { (this.props.global.currentSong && this.props.global.currentSong.label) || "" }
                            </Text>
                        </View>
                    </Animated.View>
                    <Animated.View
                        style={[
                            styles.playerMinactionToggle,
                            {
                                transform: [{ rotate: minBtnRotation }],
                                borderColor: minBtnBorder
                            }
                        ]}
                        onTouchEnd={ () => this.props.togglePlayerVisibility() }>
                        <Animated.View style={[
                            styles.playerMinactionToggleImagecontroller,
                            {
                                opacity: this.state.minToggleBlackOpacity
                            }
                        ]}>
                            <Image
                                style={[ styles.playerMinactionToggleImage ]}
                                source={ icons.down }
                            />
                        </Animated.View>
                        <Animated.View style={[
                            styles.playerMinactionToggleImagecontroller,
                            {
                                opacity: this.state.minOpacity
                            }
                        ]}>
                            <Image
                                style={[ styles.playerMinactionToggleImage ]}
                                source={ icons.downWhite }
                            />
                        </Animated.View>
                    </Animated.View>
                </Animated.View>
                <View style={[ styles.playerAddons ]}>
                    <Image style={[ styles.playerAddonsButton ]} source={ icons.shuffle } />
                    <Image style={[ styles.playerAddonsButton ]} source={ icons.replay } />
                </View>
                <View style={[ styles.playerImagecontainer ]}>
                    <Image style={[ styles.playerImagecontainerVinyl ]} source={ vinyl } />
                    <Image style={[ styles.playerImagecontainerImage ]} source={ image } />
                </View>
                <View style={[ styles.playerInfo ]}>
                    <Text style={[ styles.playerInfoName ]}>
                        { (this.props.global.currentSong && this.props.global.currentSong.name) || "" }
                    </Text>
                    <Text style={[ styles.playerInfoLabel ]}>
                        { (this.props.global.currentSong && this.props.global.currentSong.label) || "" }
                    </Text>
                </View>
                <PlayerControls />
                <PlayerProgress />
            </Animated.View>
        );
    }
}

const mapStateToProps = ({ player, global }) => ({
    player,
    global
});

const mapActionsToProps = {
    togglePlayerVisibility: payload => ({
        type: "TOGGLE_PLAYER_VISIBILITY",
        payload
    }),
    setPlayerModule: payload => ({
        type: "SET_PLAYER_MODULE",
        payload
    }),
    updateSessionInfo: payload => ({
        type: "UPDATE_SESSION_INFO",
        payload
    }),
    togglePlayPlayer: () => ({
        type: "TOGGLE_PLAY_PLAYER"
    }),
    updateSessionSongTime: payload => ({
        type: "UPDATE_SONG_CURRENT_TIME", payload
    })
}

export default connect(
    mapStateToProps,
    mapActionsToProps
)(Player);