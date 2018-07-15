import _ from 'lodash';
import React, { Component } from 'react';
import { connect } from 'react-redux';
import firebase from 'firebase';
import { FlatList } from 'react-native';
import { Button } from 'react-native-elements';
import { employeesFetch } from '../actions';
import ListItem from './ListItem';
import NavigationService from '../navigators/NavigationService';

class EmployeeList extends Component {
  static navigationOptions = () => {
    return {
      headerTitle: 'Employees',
      headerLeft: (
        <Button title="Add" onPress={() => NavigationService.navigate('employeeCreate')} />
      ),
      headerRight: <Button title="Logout" onPress={() => firebase.auth().signOut()} />
    };
  };

  componentWillMount() {
    this.props.employeesFetch();
  }

  renderItem(employee) {
    return <ListItem employee={employee} />;
  }

  render() {
    return (
      <FlatList
        data={this.props.employees}
        renderItem={this.renderItem}
        keyExtractor={employee => employee.uid}
      />
    );
  }
}

const mapStateToProps = state => {
  const employees = _.map(state.employees, (val, uid) => {
    return { ...val, uid };
  });
  return { employees };
};

export default connect(
  mapStateToProps,
  { employeesFetch }
)(EmployeeList);
