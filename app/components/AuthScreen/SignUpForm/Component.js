'use strict';

import React, { Component } from 'react';
import PropTypes from 'prop-types';

import BasicForm from '../BasicForm';

class SignUpFormComponent extends Component {

  static navigationOptions = {
    tabBarLabel: 'Sign Up',
  };

  render() {
    return <BasicForm
        buttonTitle='Sign Up'
        onButtonPress={this.props.signup} />;
  }
}

SignUpFormComponent.propTypes = {
  signup: PropTypes.func.isRequired,
};

export default SignUpFormComponent;
