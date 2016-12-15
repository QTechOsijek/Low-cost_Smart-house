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
import { Title, NavigationBar, Button, Spinner } from '@shoutem/ui';
import { Login } from './login';

export class SorT extends Component {
    static propTypes = {
        loaded: React.PropTypes.bool,
    };
    render(){
        if(this.props.loaded) return <Text style={styles.text}>Register</Text>
        else return <Spinner />
    }
}

export class Register extends Component {
    constructor(props){
        super(props);
        this.state = {
            registered: false,
            user: '',
            pass: '',
            email: '',
            pl: Platform.OS === "ios" ? "\n": "",
            message: "",
            loaded: true,
        }
    }
    validateEmail(email) {
        var re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))/;
        return re.test(email);
    };
    validatePass(pass){
        var re = /^(?=.*[a-z])(?=.*[A-Z])(?=.*[!@#\$%\^&\*])(?=.*[0-9])(?=.{8,})/;
        return re.test(pass);
    };
    check(){
        if(!this.validateEmail(this.state.email)){
            this.setState({
                message: 'Invalid email',
            }) 
            return false;
        } 
        if(!this.validatePass(this.state.pass)){
            this.setState({
                message: 'Password not valid',
            })
            return false;
        } 
        if(!this.state.user.length >= 6) {
            this.setState({
                message: 'Username has to be at least 6 characters long',
            })
            return false;
        }
        return true;
    }
    invert(){
      this.setState({
        registered: true,
      })
      
    }
    send(){
        if(this.check()){
            this.setState({
                loaded: false
            })
            const { user, pass, email } = this.state;
            fetch('https://reactnat.azurewebsites.net/register',
            {
                method: 'POST',
                headers: {
                    'Accept': 'application/json',
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    'email': email,
                    'user': user,
                    'pass': pass,
                })
            })
            .then((response) => response.json())
            .then((responseJson) => {
                console.log(responseJson);
                if(responseJson.status){
                    this.setState({
                        registered: true
                    })
                } else {
                    this.setState({
                        loaded: true,
                        message: responseJson.message,
                    })
                } 
        })
            .catch((error) => {
            console.log(error);
            });
        }
      }
    render() {
        if(!this.state.registered){
            return (
                <View style={styles.container}>
                    <NavigationBar
                        centerComponent={ <Title>Smart House</Title> }
                    />
                    <View style={styles.textInputContainer}>
                        <TextInput editable={true} maxLength={16} placeholder="username" style={styles.textinput} keyboardType = "default" onChangeText={(user) => this.setState({user})} autoCapitalize="none" />
                        <Text>{this.state.pl}</Text>
                        <TextInput editable={true} maxLength={32} placeholder="email" style={styles.textinput} keyboardType = "email-address" onChangeText = {(email) => {this.setState({email})}} autoCapitalize="none"/>
                        <Text>{this.state.pl}</Text>
                        <TextInput editable={true} maxLength={16} placeholder="password" style={styles.textinput} secureTextEntry={true} onChangeText = {(pass) => {this.setState({pass})}} autoCapitalize="none"/>
                        <Text>{this.state.message}</Text>
                    </View>
                    <Button onPress={this.send.bind(this)} styleName="tight">
                        <SorT loaded={this.state.loaded} />
                    </Button>
                    <Text>{"\n"}Registered already?{"\n"}</Text>
                    <TouchableOpacity onPress={this.invert.bind(this)}>
                        <Text style={styles.highlighted}>Login</Text>
                    </TouchableOpacity>
                </View>
            );
        } else {
            return (<Login />);
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
  welcome: {
    fontSize: 20,
    textAlign: 'center',
    margin: 10,
  },
  instructions: {
    textAlign: 'center',
    color: '#333333',
    marginBottom: 5,
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
    borderColor: 'gray'
  },
  textInputContainer:{
      alignItems: 'center',
      justifyContent: 'center',
    },
  textinput: {
    width: 120,
    height: Platform.OS === "ios"? 40 : 50,
  },
  highlighted: {
      color: 'blue',
  },
});

AppRegistry.registerComponent('Register', () => Register);
