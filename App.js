// ?React
import React, { Component, Fragment } from 'react';
import {
  View,
  Text
} from 'react-native';

// ?Redux
import { Provider } from 'react-redux';
import rstore from './rstorage';

// ?Components
import Player from './components/Player';
import List from './components/List';

// Styles
import { styles } from './styles';

// ?App
class App extends Component {
  constructor(props) {
    super(props);

    this.state = {
      globalError: null
    }

    this.unsubscribe = null;
  }

  componentDidMount() {
    this.listenGlobalError();
  }

  componentWillUnmount() {
    let a = this.unsubscribe();
    if(a) a();
  }

  listenGlobalError = () => {
    this.unsubscribe = rstore.subscribe(() => {
      let { global: { error } } = rstore.getState();
      if(error && this.state.globalError !== error) {
        this.setState(() => ({
          globalError: error
        }));
      }
    });
  }

  render() {
    {
      let a = this.state.globalError;
      if(a) { // CUSTOM_GLOBAL_ERROR
        return(
          <View style={[ styles.globalError ]}>
            <Text style={[ styles.globalErrorText ]}>{ a }</Text>
          </View>
        );
      }
    }

    return(
      <Provider store={ rstore }>
        <Fragment>
          <List />
          <Player />
        </Fragment>
      </Provider>
    );
  }
}

export default App;