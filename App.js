import React, { Component } from 'react';
import { Provider } from 'react-redux';
import firebase from 'firebase';
import { Root, configureStore } from './src/navigators/AppNavigator';

class App extends Component {
  componentWillMount() {
    // Initialize Firebase
    const config = {
      apiKey: 'AIzaSyAP0dDmyzWRUrg53QwhIgLLpLBHa7_YGas',
      authDomain: 'manager-comp.firebaseapp.com',
      databaseURL: 'https://manager-comp.firebaseio.com',
      projectId: 'manager-comp',
      storageBucket: '',
      messagingSenderId: '863357632054'
    };
    firebase.initializeApp(config);
  }
  render() {
    const store = configureStore({});
    return (
      <Provider store={store}>
        <Root />
      </Provider>
    );
  }
}

export default App;
