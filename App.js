import React, { Component, Fragment } from 'react';
import {
  View,
  Text,
  Image,
  ScrollView
} from 'react-native';
// import { MediaLibrary } from 'expo';

import { styles } from './styles';

import image from './image.png';
import vinyl from './assets/images/vinyl.png';

const iconsPath = '/assets/icons/';
const icons = {
  play: require('.' + iconsPath + 'play.png'),
  down: require('.' + iconsPath + 'down.png'),
  shuffle: require('.' + iconsPath + 'shuffle.png'),
  replay: require('.' + iconsPath + 'replay.png'),
  playWhite: require('.' + iconsPath + 'playWhite.png'),
  pauseWhite: require('.' + iconsPath + 'pauseWhite.png'),
  prevWhite: require('.' + iconsPath + 'prevWhite.png'),
  nextWhite: require('.' + iconsPath + 'nextWhite.png')
}

class ListSong extends Component {
  render() {
    return(
      <View style={[ styles.listSongsSong ]}>
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
              <Text style={[ styles.listSongsSongInfoTitleName ]}>
                There is Hope
              </Text>
              <Text style={[ styles.listSongsSongInfoTitleLabel ]}>
                Zoo Brazil
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

class List extends Component {
  render() {
    return(
      <View style={[ styles.list, styles.display ]}>
        <View style={[ styles.listHead ]}>
          <Text style={[ styles.listHeadTitle ]}>Driving</Text>
        </View>
        <ScrollView style={[ styles.listSongs ]}>
          <ListSong />
          <ListSong />
          <ListSong />
          <ListSong />
          <ListSong />
          <ListSong />
          <ListSong />
          <ListSong />
          <ListSong />
        </ScrollView>
      </View>
    );
  }
}

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
  render() {
    return(
      <View style={[ styles.player, styles.display ]}>
        <View style={[ styles.playerMinaction ]}>
          <View style={[ styles.playerMinactionClose ]}>
            <Image style={[ styles.playerMinactionCloseImage ]} source={ icons.down } />
          </View>
        </View>
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
          <Text style={[ styles.playerInfoLabel ]}>Hucci</Text>
        </View>
        <PlayerControls />
        <PlayerProgress />
      </View>
    );
  }
}

class App extends Component {
  // async componentDidMount() {
    // const media = await MediaLibrary.getAssetsAsync({
    //   mediaType: MediaLibrary.MediaType.audio,
    // });
  // }

  render() {
    return(
      <Fragment>
        <List />
        <Player />
      </Fragment>
    );
  }
}

export default App;