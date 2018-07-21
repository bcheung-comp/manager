import React, { Component } from 'react';
import { View } from 'react-native';
import firebase from 'firebase';
import { Spinner } from './common/Spinner';
import { FIREBASE_CONFIG } from '../FirebaseConfig';

class AuthLoadingScreen extends Component {
  constructor(props) {
    super(props);
    this.initializeFirebase();
  }
  initializeFirebase = async () => {
    // Initialize Firebase
    firebase.initializeApp(FIREBASE_CONFIG);
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
