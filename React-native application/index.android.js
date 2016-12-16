/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 * @flow
 */

import React, { Component } from 'react';
import { AppRegistry } from 'react-native';
import { Login } from './app/login';
import { Register } from './app/register';
import { state } from './app/main';
import * as firebase from 'firebase';

export default class LCSH extends Component {
  render() {
    return (<Login />);
      
  }
}


AppRegistry.registerComponent('iHouse', () => LCSH);
