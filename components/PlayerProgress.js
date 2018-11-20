import React, { Component } from 'react';
import {
    View,
    Text
} from 'react-native';

import { connect } from 'react-redux';
import { styles, variables, innerWidth } from '../styles';

class PlayerProgress extends Component {
    getTime = stamp => {
        let {
            currentSong,
            sessionInfo
        } = this.props.global;
        if(!currentSong || !sessionInfo || !sessionInfo.currentTime) return "";

        let c = c => c.toString(),
            d = d => (c(d).length === 1) ? 0 + c(d) : c(d),
            e = (stamp === "current") ? (
                sessionInfo.currentTime
            ) : (
                currentSong.duration
            ),
            f = Math.floor(e / 60),
            g = Math.floor(e % 60);

        return `${ d(f) }:${ d(g) }`;
    }

    getCursor = () => {
        let {
            sessionInfo
        } = this.props.global;
        if(!sessionInfo || !sessionInfo.currentTime) return 0;

        let a = innerWidth - variables.player.padding * 2, // track width (innerWidth - padding)
            b = this.props.global.sessionInfo.currentProgress, // progress in %
            c = a / 100 * b, // progress in px
            d = c - variables.playerProgress.pointerSize / 2 // progress - visual half of cursor

        // return (innerWidth - variables.player.padding * 2) / 100 * sessionInfo.currentTime - variables.playerProgress.pointerSize / 2
        return d;
    }
    
    render() {
        return(
        <View style={[ styles.PlayerProgress ]}>
            <View style={[ styles.PlayerProgressDisplay ]}>
                <View style={[
                    styles.PlayerProgressDisplayFill,
                    {
                        width: (
                            this.props.global.sessionInfo &&
                            this.props.global.sessionInfo.currentProgress &&
                            this.props.global.sessionInfo.currentProgress + '%' // XXX
                        ) || "0%"
                    }
                ]} />
                <View style={[
                    styles.PlayerProgressDisplayPointer,
                    {
                        left: this.getCursor()
                    }
                ]} />
            </View>
            <View style={[ styles.PlayerProgressTime ]}>
                <Text>{ this.getTime("current") }</Text>
                <Text>{ this.getTime("total") }</Text>
            </View>
        </View>
        );
    }
}

const mapStateToProps = ({ global, player: { module } }) => ({
    global,
    module
});

mapActionsToProps = {
    
}

export default connect(
    mapStateToProps,
    mapActionsToProps
)(PlayerProgress);