import React, { Component } from 'react';
import {
    View,
    Text
} from 'react-native';

import { connect } from 'react-redux';
import { styles } from '../styles';

class PlayerProgress extends Component {
    constructor(props) {
        super(props);

        this.state = {
            currentTime: 0
        }
    }

    async componentDidUpdate() {
        if(this.props.module) {
            let { positionMillis: b } = await this.props.module.getStatusAsync();
            if(b) {
                this.setState(() => ({ currentTime: b / 1000 }));
            }
        }
    }

    getTime = stamp => {
        if(!this.props.global.currentSong || !this.props.global.sessionInfo) return "";

        let a = "",
            c = c => c.toString(),
            d = d => (c(d).length === 1) ? 0 + c(d) : c(d),
            e = (stamp === "current") ? (
                this.state.currentTime
            ) : (
                this.props.global.currentSong.duration
            ),
            f = Math.floor(e / 60),
            g = Math.floor(e % 60);

        return `${ d(f) }:${ d(g) }`;
    }
    
    render() {
        return(
        <View style={[ styles.PlayerProgress ]}>
            <View style={[ styles.PlayerProgressDisplay ]}>
                <View style={[
                    styles.PlayerProgressDisplayFill
                ]} />
                <View style={[ styles.PlayerProgressDisplayPointer ]} />
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