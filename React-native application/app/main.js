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
            newitem: '', 
            data: [],
            loaded: false,
            action: ''        
        };
        this.getData();
    }
    getData(){
        if(this.state.loaded) { 
            this.setState({
                loaded: false,
            })
        }
        fetch('https://reactnat.azurewebsites.net/items',
            {
                method: 'POST',
                headers: {
                    'Accept': 'application/json',
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    'name': 'a'
                })
            })
            .then((response) => response.json())
            .then((responseJson) => {
                console.log(responseJson);
                this.setState({
                    loaded: true,
                    data: responseJson.data,
                    newitem: '',
                    action: ''
                })
                console.log(this.state);
            })
            .catch((error) => {
                console.log(error);
            });
        
        }
    invert(){
        this.setState({
            logged: !this.state.logged
        });
    }
    addItem(){
        console.log(this.state);
        const { newitem , action } = this.state;
        fetch('https://reactnat.azurewebsites.net/add',
            {
                method: 'POST',
                headers: {
                    'Accept': 'application/json',
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    'item': newitem,
                    'action': action,
                    'name': 'a',
                })
            })
            .then((response) => response.json())
            .then((responseJson) => {
                console.log(responseJson);
                if(responseJson.status){
                    Alert(response.message + 'added');
                    this.getData();
                    
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
        console.log(data);
        return(
            <View
                key={rowId}>
                <Text style = { styles.textp }>{data.name}</Text>
                <Button onPress={this.doSomething}><Text style={styles.text}> {data.button} </Text></Button>
                <Text>{"\n"}</Text>
            </View>
        );
    }
    render(){
        if(this.state.logged) { 
            return (
            <View style={styles.container}>
            <NavigationBar
                centerComponent={ <Title>Smart House</Title> }
                />
                <ListView
                    data = {this.state.data} 
                    loading = {!this.state.loaded}
                    renderRow = {this.renderRow}
                    onRefresh = {this.getData.bind(this)}
                />
                <Card>
                    <Text>Add New Item</Text>
                    <TextInput placeholder="Item" editable={true} maxLength={16} style={styles.textinput} onChangeText={(newitem) => {this.setState({newitem})}} />
                    <TextInput placeholder="Action" editable={true} maxLength={16} style={styles.textinput} onChangeText={(action) => {this.setState({action})}} />
                    <Button onPress={this.addItem.bind(this)}><Icon name="right-arrow" /></Button>
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
    paddingTop: 70,
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
    paddingTop: 5,
    paddingBottom:Platform.OS === "ios"? 0: 5,
    borderRadius: Platform.OS === "ios"? 0: 8,
    borderWidth:Platform.OS === "ios"? 0: 0.4,
    backgroundColor: 'gray',
    borderColor: 'gray',
    justifyContent: 'center',
    alignItems: 'center',
  },
  textp: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#453C9F',
    paddingTop: 10,
  },
  textinput: {
    width: 120,
  },
  highlighted: {
      color: 'blue',
  },
});

AppRegistry.registerComponent('Main', () => Main); 