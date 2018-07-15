import React, { Component } from 'react';
import { Text, View, TouchableWithoutFeedback } from 'react-native';
import { connect } from 'react-redux';
import { CardSection } from './common';
import * as actions from '../actions';
import NavigationService from '../navigators/NavigationService';

class ListItem extends Component {
  onItemPress() {
    console.log('Item Pressed');

    NavigationService.navigate('employeeEdit', { employee: this.props.employee });
  }

  render() {
    const { name } = this.props.employee.item;

    return (
      <TouchableWithoutFeedback onPress={this.onItemPress.bind(this)}>
        <View>
          <CardSection>
            <Text style={styles.titleStyle}>{name}</Text>
          </CardSection>
        </View>
      </TouchableWithoutFeedback>
    );
  }
}

const styles = {
  titleStyle: {
    fontSize: 18,
    paddingLeft: 15
  }
};

const mapStateToProps = state => {
  return { selectedLibraryId: state.selectedLibraryId };
};

export default connect(
  mapStateToProps,
  actions
)(ListItem);
