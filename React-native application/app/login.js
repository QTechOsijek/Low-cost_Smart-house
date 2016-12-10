/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 * @flow
 */
import React, { Component } from 'react';
import {
  AppRegistry,
  StyleSheet,
  Text,
  View,
  Image,
  Alert,
  TextInput,
  TouchableOpacity,
  Platform, 
} from 'react-native';
import { Title, NavigationBar, Icon, Button } from '@shoutem/ui';
import { Register } from './register';
import { Main } from './main';

export class Login extends Component {
  constructor(props){
        super(props);
        this.state = {
            notRegistered: false,
            logged: false,
            pl: Platform.OS === "ios" ? "\n": "",
            user: '',
            pass: ''
        }
        this.send = this.send.bind(this);
    }
  invert(){
      this.setState({
        notRegistered: true
      })
      
    }

  send(){
    fetch('https://reactnat.azurewebsites.net/auth', {
       method: 'POST',
       headers: {
          'Accept': 'application/json',
          'Content-Type': 'application/json',
       },
       body: JSON.stringify({
          user: this.state.user,
          pass: this.state.pass ,
        }),
      })
      .then((response) => 
        response.json()
       )
      .then((responseJson) => {
        console.log(responseJson);
        if(responseJson.status){
         this.setState({
            logged: true,
          })
        }
      })
      .catch((error) => {
        console.log(error);
      });
      
   
  }
  render() {
    
    if(!this.state.logged){
      if(!this.state.notRegistered){
        return (
          <View style={styles.container}>
            <NavigationBar
              centerComponent={ <Title>Smart House</Title> }
            />
            <View style={styles.textInputContainer}>
              <TextInput editable={true} maxLength={16} placeholder="username" style={styles.textinput} onChangeText = {(user) => this.setState({user})} />
              <Text>{this.state.pl}</Text>
              <TextInput editable={true} maxLength={16} placeholder="password" style={styles.textinput} secureTextEntry={true} onChangeText = {(pass) => {this.setState({pass})}} />
              <Text>{"\n"}</Text>
            </View>
            <Button onPress={this.send} styleName="tight">
              <Text style={styles.text}>Login</Text>
            </Button>
            <Text>{"\n"}</Text>
            <Text>Not registered yet?{"\n"}</Text>
            <TouchableOpacity onPress={this.invert.bind(this)}>
              <Text style={styles.highlighted}>Register</Text>
            </TouchableOpacity>
          </View>
        );
      } else {
        return (<Register />);
      }
    } else {
      return (<Main />);
    }
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#F5FCFF',
  },
  text: {
    color: 'azure',
    paddingLeft: Platform.OS === "ios"? 0: 10,
    paddingRight: Platform.OS === "ios"? 0: 10,
    paddingTop: Platform.OS === "ios"? 0: 5,
    paddingBottom: Platform.OS === "ios"? 0: 5,
    borderRadius: Platform.OS === "ios"? 0: 8,
    borderWidth: Platform.OS === "ios"? 0: 0.4,
    backgroundColor: 'gray',
    borderColor: 'gray',
    justifyContent: 'center',
    alignItems: 'center',
  },
  textInputContainer:{
    alignItems: 'center',
    justifyContent: 'center',
  },
  textinput: {
    width: 120,
    height: 40,
  },
  highlighted: {
      color: 'blue',
  }
});

AppRegistry.registerComponent('Login', () => Login);
