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
import { styles, variables, innerHeight } from '../styles';

import icons from '../icons';

import image from '../image.png';
import vinyl from '../assets/images/vinyl.png';

import PlayerControls from './PlayerControls';
import PlayerProgress from './PlayerProgress';

class Player extends Component {
    constructor(props) {
        super(props);

        this.state = {
            yPos: new Animated.Value(innerHeight - variables.player.minHeight),
            minYPos: new Animated.Value(0),
            minOpacity: new Animated.Value(1),
            background: new Animated.Value(100),
            minToggleRotate: new Animated.Value(0),
            minToggleWhiteOpacity: new Animated.Value(1),
            minToggleBlackOpacity: new Animated.Value(0), // XXX: Too many listeners
            thidparty_isPlaying: false
        }
    }

    componentDidMount() {
        let a = this.props.player.isOpened;
        if(a !== false) { // if initialState !== defaultInitialState
            this.toggleScreen(a, true);
        }
    }

    toggleScreen = (a, wm = false) => {
        // ?AV to set all props to 0 before animation :
        // !Rejected
        
        const b = (!wm) ? 250 : 0,
              c = Easing.out(Easing.linear);

        Animated.parallel([
            Animated.timing(
                this.state.yPos,
                {
                    toValue: (a) ? 0 : innerHeight - variables.player.minHeight,
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
                this.state.minToggleWhiteOpacity,
                {
                    toValue: (a) ? 0 : 1,
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
            )
        ]).start();
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

    playSong = async a => {
        let player = this.props.player.module;
        if(this.props.player.module) {
            await this.props.player.module.stopAsync(); // stop
            await this.props.player.module.unloadAsync(); // clear prev song
        } else {
            player = new Audio.Sound();
            this.props.setPlayerModule(player);
        }

        await player.loadAsync({ uri: a.uri, downloadFirst: false }); // load new
        await player.playAsync(); // play

        this.props.updateSessionInfo({
            isPlaying: true
        });
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

        return(
            <Animated.View style={[
                styles.player, styles.display,
                {
                    transform: [{ translateY: this.state.yPos }],
                    backgroundColor: bgcol
                }
            ]}>
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
                                transform: [{ rotate: minBtnRotation }]
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
                                opacity: this.state.minToggleWhiteOpacity
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
    })
}

export default connect(
    mapStateToProps,
    mapActionsToProps
)(Player);