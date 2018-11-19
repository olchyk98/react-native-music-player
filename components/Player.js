import React, { Component, Fragment } from 'react';
import {
    View,
    Image,
    Text,
    Animated,
    Easing
} from 'react-native';
import {
    Audio,
    FileSystem
} from 'expo';
import { connect } from 'react-redux';
import { styles, variables, innerHeight } from '../styles';

import icons from '../icons';

import image from '../image.png';
import vinyl from '../assets/images/vinyl.png';

class PlayerControlsButton extends Component {
    render() {
      return(
        <View
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
        icon={ icons.playWhite }
        />
        <PlayerControlsButton
        special={ false }
        icon={ icons.nextWhite }
        />
    </View>
    );
}
}

class PlayerProgress extends Component {
render() {
    return(
    <View style={[ styles.PlayerProgress ]}>
        <View style={[ styles.PlayerProgressDisplay ]}>
        <View style={[ styles.PlayerProgressDisplayFill ]} />
        <View style={[ styles.PlayerProgressDisplayPointer ]} />
        </View>
    </View>
    );
}
}

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
            minToggleBlackOpacity: new Animated.Value(0) // XXX: Too many listeners
        }
    }

    componentDidMount() {
        let a = this.props.player.isOpened;
        if(a !== false) { // if initialState !== defaultInitialState
            this.toggleScreen(a, true);
        }
    }

    toggleScreen = (a, wm = false) => {
        // ?AV to set 0 to all props before animation :
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

    componentDidUpdate(a) {
        {
            let b = this.props.player.isOpened;
            if(a.player.isOpened !== this.props.player.isOpened) {
                this.toggleScreen(b);
            }
        }
        {
            let b = this.props.global.currentSong;
            if(a.global.currentSong !== b) {
                this.props.togglePlayerVisibility(true);
                this.playSong(b);
            }
        }
    }

    playSong = async a => {
        const player = new Audio.Sound();
        const b = await player.loadAsync({ uri: a.uri });
        await player.playAsync();
    }

    render() {
        const bgcol = this.state.background.interpolate({
            inputRange: [0, 100],
            outputRange: [ 'white', variables.global.focusCol ]
        });

        const minBtnRotation = this.state.minToggleRotate.interpolate({
            inputRange: [0, 180],
            outputRange: ["0deg", "180deg"]
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
                            source={ icons.playWhite }
                            style={[ styles.playerMinactionTitlePlayi ]}
                        />
                        <Text style={[ styles.playerMinactionTitleName ]}>Hucci</Text>
                        <Text style={[ styles.playerMinactionTitleLabel ]}>The Fall</Text>
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
                    <Text style={[ styles.playerInfoName ]}>The Fall</Text>
                    <Text style={[ styles.playerInfoLabel ]}>Huccii</Text>
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
    })
}

export default connect(
    mapStateToProps,
    mapActionsToProps
)(Player);