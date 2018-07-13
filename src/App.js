import React, { Component } from 'react';
import { Provider } from 'react-redux';
import { createStore, applyMiddleware } from 'redux';
import firebase from 'firebase';
import ReduxThunk from 'redux-thunk';
import reducers from './reducers';
import LoginForm from './components/LoginForm';

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
    const store = createStore(reducers, {}, applyMiddleware(ReduxThunk));
    return (
      <Provider store={store}>
        <LoginForm />
      </Provider>
    );
  }
}

export default App;
