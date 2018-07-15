import _ from 'lodash';
import React, { Component } from 'react';
import { connect } from 'react-redux';
import Communications from 'react-native-communications';
import EmployeeForm from './EmployeeForm';
import { Card, CardSection, Button, ConfirmModal } from './common';
import { employeeUpdate, employeeSave, employeeDelete } from '../actions';

class EmployeeCreate extends Component {
  state = { showModal: false };
  componentWillMount() {
    _.each(this.props.navigation.getParam('employee', 'no-employee').item, (value, prop) => {
      this.props.employeeUpdate({ prop, value });
    });
  }

  componentWillUnmount() {
    _.each(this.props.navigation.getParam('employee', 'no-employee').item, (value, prop) => {
      this.props.employeeUpdate({ prop, value: '' });
    });
  }

  onButtonPress() {
    const { name, phone, shift } = this.props;
    this.props.employeeSave({
      name,
      phone,
      shift,
      uid: this.props.navigation.getParam('employee', 'no-employee').item.uid
    });
  }

  onTextPress() {
    const { name, phone, shift } = this.props;
    Communications.text(phone, `${name}, your upcoming shift is on ${shift}`);
  }

  onFirePress() {
    this.setState({ showModal: !this.state.showModal });
  }

  onAccept() {
    console.log('onAccept');
    const { uid } = this.props.navigation.getParam('employee', 'no-employee').item;
    this.props.employeeDelete({ uid });
  }

  onDecline() {
    console.log('onDecline');
    this.setState({ showModal: false });
  }

  render() {
    return (
      <Card>
        <EmployeeForm {...this.props} />

        <CardSection>
          <Button onPress={this.onButtonPress.bind(this)}>Save Changes</Button>
        </CardSection>
        <CardSection>
          <Button onPress={this.onTextPress.bind(this)}>Text Schedule</Button>
        </CardSection>
        <CardSection>
          <Button onPress={this.onFirePress.bind(this)}>Fire Employee</Button>
        </CardSection>

        <ConfirmModal
          visible={this.state.showModal}
          onAccept={this.onAccept.bind(this)}
          onDecline={this.onDecline.bind(this)}
        >
          Are you sure you want to fire this employee?
        </ConfirmModal>
      </Card>
    );
  }
}

const mapStateToProps = state => {
  const { name, phone, shift } = state.employeeForm;

  return { name, phone, shift };
};

export default connect(
  mapStateToProps,
  {
    employeeUpdate,
    employeeSave,
    employeeDelete
  }
)(EmployeeCreate);
