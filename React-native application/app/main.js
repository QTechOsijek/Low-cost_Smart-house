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
import { Title, NavigationBar, Icon, Button, ListView, Card, Screen } from '@shoutem/ui';
import { Login } from './login';

export class Main extends Component {
    static propTypes = {
        user: React.PropTypes.string
    };
    constructor(props){
        super(props);
        this.state = {
            logged: true,
            newitem: '', 
            data: [],
            loaded: false,
            action: '', 
            item: '',
            button: '',
            adding: false,       
        };
        this.getData();
    }
    getData(){
        const { user } = this.props;
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
                    'name': user,
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
    
    doSomething(){
        console.log("radim")
        return fetch('http://192.168.7.2/act' , {
            method: "POST",
            body: JSON.stringify({
                "action": "",
            })
            .then((response) => response.json())
            .then((responseJson) => {
                Alert.alert("Done");
                return true;
            })
            .catch((error) => 
                console.log(error)            
            )
        })
    }
    add(){
        this.setState({
            adding: true,
        })
    }
    renderRow(data, rowId){
        console.log(data);
        return(
            <View
                key={rowId} style={styles.card} >
                <Text style = { styles.textp }>{data.name}</Text>
                <Button onPress={this.doSomething}><Text style={styles.text}>{data.button}</Text></Button>
                <Text>{"\n"}</Text>
            </View>
        );
    }
    render(){
        if(this.state.logged) {
            if(!this.state.adding){ 
                if(this.state.data.length > 0 || !this.state.loaded){
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
                            <Button onPress={this.add.bind(this)}><Text style={styles.text}>Add New Item</Text></Button>
                            <TouchableOpacity onPress={this.invert.bind(this)}>
                                <Text style={ styles.highlighted }>Log out</Text>
                            </TouchableOpacity>
                        </View>
                    );
                } else {
                    return (
                        <View style={styles.container}>
                            <NavigationBar
                                centerComponent={ <Title>Smart House</Title> }
                            />
                            <Text>Your list is empty, add some items</Text>
                            <Button onPress={this.add.bind(this)}><Text style={styles.text}>Add New Item </Text></Button>
                            <TouchableOpacity onPress={this.invert.bind(this)}>
                                <Text style={ styles.highlighted }>Log out</Text>
                            </TouchableOpacity>
                        </View>
                    )
                }
            } else {
                return (<Add user={this.props.user} />);
            }

        } else {
            return <Login />
        }
    }


}

export class Add extends Component {
    static propTypes = {
        user: React.PropTypes.string
    };
    constructor(props){
        super(props);
        this.state = {
            added: false,
            item: '',
            action: '',
            id: '',      
        };
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
                    'name': this.props.user,
                })
            })
            .then((response) => response.json())
            .then((responseJson) => {
                console.log(responseJson);
                if(responseJson.status){
                    Alert.alert(responseJson.message + ' added');
                    this.setState({
                        added: true,
                    })
                } 
            })
            .catch((error) => {
                console.log(error);
            });
        }
        render(){
            if(!this.state.added){
                return(
                    <View style={styles.container}>
                        <Text>Add New Item</Text>
                        <TextInput placeholder="Item" value={this.state.newitem} editable={true} maxLength={16} style={styles.textinput} onChangeText={(newitem) => {this.setState({newitem})}} />
                        <TextInput placeholder="Action" value={this.state.action} editable={true} maxLength={16} style={styles.textinput} onChangeText={(action) => {this.setState({action})}} />
                        <Button onPress={this.addItem.bind(this)}><Icon name="right-arrow" /></Button>
                    </View>
                )
            } else {
                return <Main user={this.props.user} />
            }
        }
}


const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#FFFFFF',
    paddingTop: 70,
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
    borderColor: 'gray',
    justifyContent: 'center',
    alignItems: 'center',
  },
  textp: {
    flex: 0.9,
    borderRadius: 5,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#A58CFF',
    paddingTop: 10,
  },
  textinput: {
    width: 120,
  },
  highlighted: {
      color: 'blue',
  },
  card: {
      borderRadius: 15,
      backgroundColor: '#F5FCFF', 
      flex: 1.01,
      width: 130,
  }
});

AppRegistry.registerComponent('Main', () => Main); 