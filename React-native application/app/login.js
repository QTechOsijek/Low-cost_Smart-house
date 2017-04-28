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
import { Title, NavigationBar, Icon, Button, Spinner } from '@shoutem/ui';
import { Register } from './register';
import { Main } from './main';

export class SorT extends Component {
    static propTypes = {
        loaded: React.PropTypes.bool,
    };
    render(){
        if(this.props.loaded) return <Text style={styles.text}>Login</Text>
        else return <Spinner style={{backgroundColor: "#F5FCFF", size: 'small'}} />
    }
}

export class Login extends Component {
  constructor(props){
        super(props);
        this.state = {
            notRegistered: false,
            logged: false,
            pl: Platform.OS === "ios" ? "\n": "",
            user: '',
            pass: '',
            loaded: true,
            
        }
    }
  invert(){
      this.setState({
        notRegistered: true
      })
      
    }

  send(){
    this.setState({
      loaded: false
    })
    const { user , pass } = this.state;
    fetch('http://192.168.1.12:8000/auth', {
       method: 'POST',
       headers: {
          'Accept': 'application/json',
          'Content-Type': 'application/json',
       },
       body: JSON.stringify({
          'user': user,
          'pass': pass,
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
        this.setState({
          loaded: true,
        })
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
              <TextInput editable={true} maxLength={16} autoCapitalize="none" placeholder="username" style={styles.textinput} onChangeText = {(user) => this.setState({user})} />
              <Text>{this.state.pl}</Text>
              <TextInput editable={true} maxLength={16} autoCapitalize="none" placeholder="password" style={styles.textinput} secureTextEntry={true} onChangeText = {(pass) => {this.setState({pass})}} />
              <Text>{"\n"}</Text>
            </View>
            <Button onPress={this.send.bind(this)} styleName="tight">
              <SorT loaded={this.state.loaded} />
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
      return (<Main user={this.state.user} />);
    }
  }
}

const styles = StyleSheet.create({
    container: {
      flex: 1,
      justifyContent: 'center',
      alignItems: 'center',
      backgroundColor: '#FFFFFF',
    },
    text: {
      color: 'azure',
      paddingLeft: 10,
      paddingRight: 10,
      paddingTop: 5,
      paddingBottom: 5,
      borderRadius: 8,
      borderWidth: 0.4,
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
