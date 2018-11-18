import React, { Component, Fragment } from 'react';
import {
  View,
  Text,
  Image,
  ScrollView
} from 'react-native';
// import { MediaLibrary } from 'expo';

import styles from './styles';

import image from './image.png';

const iconsPath = '/assets/icons/';
const icons = {
  play: require('.' + iconsPath + 'play.png')
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
      </Fragment>
    );
  }
}

export default App;