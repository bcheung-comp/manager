import React, { Component } from 'react';
import { View, Text } from 'react-native';
import { Provider } from 'react-redux';
import { createStore } from 'redux';
import firebase from 'firebase';
import reducers from './reducers';

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
    return (
      <Provider store={createStore(reducers)}>
        <View>
          <Text>Hello!</Text>
        </View>
      </Provider>
    );
  }
}

export default App;
