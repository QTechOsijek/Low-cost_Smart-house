import React, { Component } from 'react';
import { AppRegistry, StyleSheet, View, Text } from 'react-native';
import { Button } from '@shoutem/ui';
export default class Kartica extends Component {
    static propTypes = {
        name: React.PropTypes.string,
        doS: React.PropTypes.func,
        id: React.PropTypes.number,
        button: React.PropTypes.string,
    };

    render(){
        return(
            <View>
                <Text style = { styles.textp }>{this.props.name}</Text>
                <Button onPress={() => this.prosp.doS(this.props.id)}><Text style={styles.text}>{this.props.button}</Text></Button>
                <Text>{"\n"}</Text>
            </View>
        );
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

AppRegistry.registerComponent('Kartica', () => Kartica); 