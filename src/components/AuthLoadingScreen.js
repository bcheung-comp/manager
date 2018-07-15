import React, { Component } from 'react';
import { View } from 'react-native';
import firebase from 'firebase';
import { Spinner } from './common/Spinner';

class AuthLoadingScreen extends Component {
  constructor(props) {
    super(props);
    this.initializeFirebase();
  }
  initializeFirebase = async () => {
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
    // This will switch to the App screen or Auth screen and this loading
    // screen will be unmounted and thrown away.
    firebase.auth().onAuthStateChanged(user => { 
      this.props.navigation.navigate(user ? 'App' : 'Auth');
     });
  };
  // Render any loading content that you like here
  render() {
    return (
      <View>
        <Spinner size="large" />
      </View>
    );
  }
}

export default AuthLoadingScreen;
