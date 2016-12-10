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
import { Title, NavigationBar, Icon, Button, ListView, Card } from '@shoutem/ui';
import { Login } from './login';

export class Main extends Component {
    constructor(props){
        super(props);
        this.state = {
            logged: true,
            newItem: '',
            data: this.getData(),
            user: this.props.user,           
        }
    }
    getData(){
      const { user } = this.state;
      fetch('https://reactnat.azurewebsites.net/items',
            {
                method: 'GET',
                headers: {
                    'Accept': 'application/json',
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    'user': user,
                })
            })
            .then((response) => response.json())
            .then((responseJson) => {
                console.log(responseJson);
                return responseJson.data; 
        })
            .catch((error) => {
            console.log(error);
            });
        }
    invert(){
        this.setState({
            logged: !this.state.logged
        })
    }
    addItem(){
      const { newItem } = this.state;
      fetch('https://reactnat.azurewebsites.net/add',
            {
                method: 'POST',
                headers: {
                    'Accept': 'application/json',
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    'item': newItem,
                })
            })
            .then((response) => response.json())
            .then((responseJson) => {
                console.log(responseJson);
                if(responseJson.status){
                    Alert(response.message + 'added');
            } 
        })
            .catch((error) => {
            console.log(error);
            });
        }
    doSomething(command){
        fetch('https://reactnat.azurewebsitses.net/doSomething' , {
          method: "POST",
          body: JSON.stringify({
            "command": command,
          })
        })
    }
    renderRow(data, rowId){
      return(
        <Card
          key={rowId}>
          <Text style = { styles.container }>{data.name}</Text>
          <Button onPress={this.doSomething}><Text style={styles.text}> {data.button} </Text></Button>
          <Text>{"\n"}</Text>
        </Card>
      );
    }
    render(){
        if(this.state.logged) { return (
          <View style={styles.container}>
          <NavigationBar
              centerComponent={ <Title>Smart House</Title> }
            />
            <ListView
              data = {this.state.data} 
              renderRow = {this.renderRow}
             />
            <Card>
                <TextInput editable={true} maxLength={16} style={styles.textinput} onChangeText={(newItem) => {this.setState({newItem})}} />
                <Button onPress={this.addItem}><Text>Add New Item</Text></Button>
            </Card>
            <TouchableOpacity onPress={this.invert.bind(this)}>
              <Text style={ styles.highlighted }>Log out</Text>
            </TouchableOpacity>
          </View>
          );
        } else {
            return <Login />
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
  instructions: {
    textAlign: 'center',
    color: '#333333',
    marginBottom: 5,
  },
  text: {
    color: 'azure',
    paddingLeft: Platform.OS === "ios"? 0: 10,
    paddingRight: Platform.OS === "ios"? 0: 10,
    paddingTop:Platform.OS === "ios"? 0: 5,
    paddingBottom:Platform.OS === "ios"? 0: 5,
    borderRadius: Platform.OS === "ios"? 0: 8,
    borderWidth:Platform.OS === "ios"? 0: 0.4,
    backgroundColor: 'gray',
    borderColor: 'gray',
    justifyContent: 'center',
    alignItems: 'center',
  },
  textinput: {
    width: 120,
  },
  highlighted: {
      color: 'blue',
  },
});

AppRegistry.registerComponent('Main', () => Main); 