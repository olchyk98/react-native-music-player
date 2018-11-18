import React, { Component, Fragment } from 'react';
import {
  View,
  Text
} from 'react-native';
// import { MediaLibrary } from 'expo';

import styles from './styles';

class List extends Component {
  render() {
    return(
      <View style={ styles.list }>
        <View style={ styles.listHead }>
          <Text style={ styles.listHeadTitle }>Driving</Text>
        </View>
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
        <Text>1</Text>
      </Fragment>
    );
  }
}

export default App;