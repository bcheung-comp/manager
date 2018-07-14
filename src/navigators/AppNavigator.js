import React, { Component } from 'react';
import { compose, createStore, applyMiddleware } from 'redux';
import {
  reduxifyNavigator,
  createReactNavigationReduxMiddleware,
  createNavigationReducer,
} from 'react-navigation-redux-helpers';
import thunkMiddleware from 'redux-thunk';
import { connect } from 'react-redux';
import AppRouteConfigs from './AppRouteConfigs';
import reducers from '../reducers';

const middleware = createReactNavigationReduxMiddleware(
  'root',
  state => state.nav,
);

const App = reduxifyNavigator(AppRouteConfigs, 'root');
const mapStateToProps = state => ({
  state: state.nav,
});

const AppWithNavigationState = connect(mapStateToProps)(App);

// const loggerMiddleware = createLogger({ predicate: (getState, action) => __DEV__ });

const configureStore = (initialState) => {
  const enhancer = compose(
    applyMiddleware(
      middleware,
      thunkMiddleware
    ),
  );
  return createStore(reducers, initialState, enhancer);
};

class Root extends Component {
  render() {
    return <AppWithNavigationState />;
  }
}

export {
  configureStore,
  Root,
};
