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

export class LD extends Component {
    static props = {
        currentState: React.propTypes.number,
        id: React.propTypes.number
    }
    constructor(props){
        super(props);
        this.state = {
            cS: this.props.currentState,
            tempS: this.state.cS,
        }
    }
    communicate(){
        let { cS, tempS } = this.state;
        temps -= 5;
        fetch(url, {
            method: 'POST',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                'ledState': tempS,
            }),
        })
        .then((response) => 
            response.json()
        )
        .then((responseJson) => {
            console.log(responseJson);
            this.setState({
                cS: responseJson.state
            })
        })
        .catch((error) => {
            console.log(error);
        });
    }
    addition(){
        let { tempS } = this.state;
        if(tempS + 5 > 255){
            this.setState({
                tempS: 255,
            })
        }
        else {
            this.setState({
                tempS: this.state.tempS + 5
            })
        }
    }
    subtraction(){
        let { tempS } = this.state;
        if(tempS - 5 < 0){
            this.setState({
                tempS: 0,
            })
        }
        else {
            this.setState({
                tempS: this.state.tempS - 5
            })
        }
    }
    countdownA(){
        setInterval(() => this.addition(), 100);
    }
    countdownS(){
        setInterval(() => this.subtraction(), 100);
    }
    render(){
        return(
            <View>
                <Heading>Light dimer no. {this.props.id}</Heading>
                <Button    
                    onPressIn={this.addition}
                    onPressOut={this.communicate} 
                    onLongPress={this.countdownA}
                    delayLongPress={500} 
                    >
                    <Text>+</Text>
                </Button>
                <Button    
                    onPressIn={this.subtraction}
                    onPressOut={this.communicate} 
                    onLongPress={this.countdownS}
                    delayLongPress={500}  
                    >
                    <Text>-</Text>
                </Button>
            </View>
        )
    }
} 

export class LC extends Component{
    static props = {
        id: React.propTypes.number
    }
    constructor(props){
        super(props);
        this.state = {
            ledState: false,
            message: "OFF"
        }
    }
    changeState(){
        let { ledState } = this.state;
        fetch(url, {
            method: 'POST',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                'ledState': !ledState,
            }),
        })
        .then((response) => 
            response.json()
        )
        .then((responseJson) => {
            console.log(responseJson);
            if(responseJson.status){
                this.setState({
                    ledState: !this.state.ledState,
                    message: this.state.ledState ? "ON": "OFF",
                })
            }
        })
        .catch((error) => {
            console.log(error);
        });
    }
    render(){
        return(
            <View>
                <Heading>Led control no. {this.props.id}</Heading>
                <Button onPress={this.changeState}>
                    <Text>{this.state.message}</Text>
                </Button>
            </View>
        );
    }
}

export class VC extends Component{
    static props = {
        id: React.propTypes.number
    }
    constructor(props){
        super(props);
        this.state = {
            ventState: false,
            message: "OFF"
        }
    }
    changeState(){
        let { ventState } = this.state;
        fetch(url, {
            method: 'POST',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                'ventState': !ventState,
            }),
        })
        .then((response) => 
            response.json()
        )
        .then((responseJson) => {
            console.log(responseJson);
            if(responseJson.status){
                this.setState({
                    ventState: !this.state.ventState,
                    message: this.state.ventState ? "ON": "OFF",
                })
            }
        })
        .catch((error) => {
            console.log(error);
        });
    }
    render(){
        return(
            <View>
                <Heading>Vent control no. {this.props.id}</Heading>
                <Button onPress={this.changeState}>
                    <Text>{this.state.message}</Text>
                </Button>
            </View>
        );
    }
}

export class SC extends Component{
    static props = {
        id: React.propTypes.number,
        maxHeight: React.propTypes.number,
        minHeight: React.propTypes.number,
    }
    constructor(props){
        super(props);
        this.getHeight()
        this.state = {
            height: 0,
            id: this.props.id,
        }
    }
    getHeight(){
        const { id } = this.state;
        fetch(url, {
            method: 'POST',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                'id': id,
            }),
        })
        .then((response) => 
            response.json()
        )
        .then((responseJson) => {
            console.log(responseJson);
                this.setState({
                    height: responseJson.height,
                })
        })
        .catch((error) => {
            console.log(error);
        });  
    }
    goToHeight(){
        let { height } = this.state;
        fetch(url, {
            method: 'POST',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                'newHeight': h,
            }),
        })
        .then((response) => 
            response.json()
        )
        .then((responseJson) => {
            console.log(responseJson);
            if(responseJson.status){
                Alert.alert("Successfully done");
            }
            else {
                Alert.alert("Not done");
            }
        })
        .catch((error) => {
            console.log(error);
        });
    }
}